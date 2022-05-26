const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('GET /api/v1/infoAnimale', () => {

    let connection;

    beforeAll( async () => {
        jest.setTimeout(10000); //Da cambiare in 8000
        jest.unmock('mongoose');
        connection = await  mongoose.connect(process.env.DB_URL);
        console.log('Database connected!');
        //return connection; // Need to return the Promise db connection?
    });
    
    afterAll( () => {
        mongoose.connection.close(true);
        console.log("Database connection closed");
    });

    test('GET /api/v1/infoAnimale with email not specified', () => {
        return request(app)
          .get('/api/v1/infoAnimale')
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Authentication failed. User not found.' } );
    });

    let email = "prova1";    
    test('GET /api/v1/infoAnimale with email specified', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/infoAnimale?email='+ email);
        expect(response.statusCode).toBe(200);
    });
});