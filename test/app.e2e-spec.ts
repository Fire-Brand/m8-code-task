import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import Redis from 'ioredis';

describe('App (e2e)', () => {
  let app: INestApplication;
  let redisClient: Redis;

  beforeAll(async () => {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    });

    await redisClient.ping().catch(error => {
      throw new Error(`Redis connection failed: ${error.message}`);
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await redisClient.quit();
  });

  beforeEach(async () => {
    await redisClient.flushdb();
  });

  it('/character (POST)', () => {
    return request(app.getHttpServer())
      .post('/character')
      .send({ char: 'A', userId: 'testUser' })
      .expect(200)
      .then(async () => {
        const char = await redisClient.get('testUser:char');
        expect(char).toBe('A');
      });
  });

  it('/number (POST)', () => {
    return request(app.getHttpServer())
      .post('/number')
      .send({ num: 123, userId: 'testUser' })
      .expect(200)
      .then(async () => {
        const num = await redisClient.get('testUser:num');
        expect(num).toBe('123');
      });
  });

  it('/result/:userId (GET)', async () => {
    await redisClient.set('testUser:char', 'A');
    await redisClient.set('testUser:num', '123');

    return request(app.getHttpServer())
      .get('/result/testUser')
      .expect(200)
      .expect({ result: 'A_123' });
  });

  it('/result/:userId (GET) should return 400 when data is missing', async () => {
    return request(app.getHttpServer())
      .get('/result/testUser')
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Data is missing',
      });
  });
});
