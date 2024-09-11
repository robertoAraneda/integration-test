import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const baseUrl = 'https://localhost:3000';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('/roles (POST)', () => {
    test('should create a role successfully', async () => {
      // prepare
      const role = {
        name: 'Admin',
      };

      // act
      const response = await request(app.getHttpServer())
        .post('/roles')
        .send(role);

      // assert
      expect(response.status).toBe(201); // created
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', role.name);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    test("should return 400 if role's name is not provided", async () => {
      // prepare
      const role = {};

      // act
      const response = await request(app.getHttpServer())
        .post('/roles')
        .send(role);

      // assert
      expect(response.status).toBe(400); // bad request
      expect(response.body).toHaveProperty('statusCode', 400);
      expect(response.body).toHaveProperty('message', [
        'name should not be empty',
      ]);
      expect(response.body).toHaveProperty('error', 'Bad Request');
    });
  });
});
