const request = require('supertest');
const app = require('../app'); // Ensure this path is correct to your app.js file

describe('Users API', () => {
    let createdUserId;

    describe('GET /users', () => {
        test('should return a paginated list of users', async () => {
            const response = await request(app).get('/users').query({ page: 1, limit: 5 });
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('users');
            expect(response.body).toHaveProperty('currentPage', 1);
            expect(response.body).toHaveProperty('totalPages');
            expect(Array.isArray(response.body.users)).toBe(true);
        });
    });

    describe('POST /users', () => {
        test('should create a new user', async () => {
            const uniqueEmail = `testuser${Date.now()}@example.com`;
            const userData = {
                name: 'Test User',
                email: uniqueEmail,
                password: '123456'
            };

            const response = await request(app).post('/users').send(userData);
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('error', false);
            expect(response.body).toHaveProperty('message', 'User created');
            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toHaveProperty('_id');
            expect(response.body.user).toHaveProperty('name', userData.name);
            expect(response.body.user).toHaveProperty('email', userData.email);

            createdUserId = response.body.user._id;
        });

        test('should return an error for duplicate email', async () => {
            // Try creating a user with the same email as before
            const duplicateEmail = `testuser-duplicate@example.com`;
            const firstUserResponse = await request(app).post('/users').send({
                name: 'Original User',
                email: duplicateEmail,
                password: 'secret'
            });
            expect(firstUserResponse.statusCode).toBe(201);

            // Attempt to create another user with the same email
            const secondUserResponse = await request(app).post('/users').send({
                name: 'Duplicate User',
                email: duplicateEmail,
                password: 'secret2'
            });
            expect(secondUserResponse.statusCode).toBe(400);
            expect(secondUserResponse.body).toHaveProperty('error', true);
        });

        test('should fail with invalid data', async () => {
            // Missing email
            const response = await request(app).post('/users').send({
                name: 'No Email User',
                password: 'password123'
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', true);
            expect(response.body.message).toMatch(/Email is required/i);
        });
    });
});
