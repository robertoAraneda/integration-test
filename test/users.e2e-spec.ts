import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdUserId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);

    const user = response.body[0];
    console.log(user);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('family');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('isActive');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
  });

  describe('/users (POST)', () => {
    it('should create an user successfully', async () => {
      //prepare
      const body = {
        name: 'Test',
        family: 'User',
        email: 'test@test.com',
        password: 'password',
        isActive: true,
      };

      //act
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(body);

      //assert
      expect(response.status).toBe(201); //created

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', body.name);
      expect(response.body).toHaveProperty('family', body.family);
      expect(response.body).toHaveProperty('email', body.email);
      expect(response.body).toHaveProperty('password', body.password);
      expect(response.body).toHaveProperty('isActive', body.isActive);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');

      // save the id for future tests
      createdUserId = response.body.id;
    });

    test('should return 400 if name is not provided', async () => {
      // prepare
      const body = {
        name: '',
        family: 'User',
        email: 'test@test.com',
        password: 'password',
        isActive: true,
      };

      // act

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(body);

      //assert
      expect(response.status).toBe(400); //bad request
      expect(response.body).toHaveProperty('error', 'Bad Request');
      expect(response.body).toHaveProperty('message', ['Name is required']);
    });

    it('should return 400 if family is not provided', async () => {
      // prepare
      const body = {
        name: 'name',
        family: '',
        email: 'test@test.com',
        password: 'password',
        isActive: true,
      };

      // act

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(body);

      //assert
      expect(response.status).toBe(400); //bad request
      expect(response.body).toHaveProperty('error', 'Bad Request');
      expect(response.body).toHaveProperty('message', [
        'Atributo Family es requerido.',
      ]);
    });

    // generate new tests
  });

  it('/users/:id (GET)', async () => {
    //prepare
    const id = createdUserId;

    //act
    const response = await request(app.getHttpServer()).get(`/users/${id}`);

    //assert
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('id', id);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('family');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('password');
    //expect(response.body).toHaveProperty('password');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('/users/:id (PATCH)', async () => {
    //prepare

    const id = createdUserId;
    const body = {
      email: 'edited@gmail.com',
    };
    //act

    const response = await request(app.getHttpServer())
      .patch(`/users/${id}`)
      .send(body);

    expect(response.status).toBe(200); //success

    expect(response.body).toHaveProperty('id', createdUserId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('family');
    expect(response.body).toHaveProperty('email', 'edited@gmail.com');
    expect(response.body).toHaveProperty('password');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('/users/:id (DELETE)', async () => {
    const id = createdUserId;
    const response = await request(app.getHttpServer()).delete(`/users/${id}`);
    expect(response.status).toBe(200); //204 no-content
    expect(response.body).toEqual({});
  });
});
