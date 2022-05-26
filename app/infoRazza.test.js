const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('GET /api/v1/infoRazza', () => {

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

    test('GET /api/v1/infoRazza with razza not specified', () => {
        return request(app)
          .get('/api/v1/infoRazza')
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Razza not found' } );
    });


    let razza = "maltese";    
    test('GET /api/v1/infoRazza with razza specified', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/infoRazza?razza=' + razza);
        expect(response.statusCode).toBe(200);
    });
   
    test('GET /api/v1/infoRazza with razza specified', async () => {
        expect.assertions(3);
        const response = await request(app).get('/api/v1/infoRazza?razza=' + razza);
        const user = response.body;
        expect(user).toBeDefined();
        expect(user.success).toBe(true);
        expect(user.imgRazza).toBe("/images/maltese.jpeg");
    });
});