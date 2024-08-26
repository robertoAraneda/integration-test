import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);

    const user = response.body[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('family');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('isActive');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
  });

  it('/users (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'Test',
      family: 'User',
      email: 'test@test.com',
      password: 'password',
      isActive: true,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'Test');
    expect(response.body).toHaveProperty('family', 'User');
    expect(response.body).toHaveProperty('email', 'test@test.com');
    expect(response.body).toHaveProperty('password', 'password');
    expect(response.body).toHaveProperty('isActive', true);
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('/users/:id (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('family');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('password');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('/users/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer()).patch('/users/1').send({
      email: 'edited@gmail.com',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('family');
    expect(response.body).toHaveProperty('email', 'edited@gmail.com');
    expect(response.body).toHaveProperty('password');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('/users/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
