const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('/api/v1/cibo/infoAlimentazione', () => {

    let connection;

    beforeAll( async () => {
        jest.setTimeout(10000); //Da cambiare in 8000
        jest.unmock('mongoose');
        connection = await  mongoose.connect(process.env.DB_URL_TESTING);
        console.log('Database connected!');
        //return connection; // Need to return the Promise db connection?
    });
    
    afterAll( () => {
        mongoose.connection.close(true);
        console.log("Database connection closed");
    });

    test('GET /api/v1/cibo/infoAlimentazione with no razza', () => {
        return request(app)
          .get('/api/v1/cibo/infoAlimentazione')
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Razza not found' } );
    });

    test('GET /api/v1/cibo/infoAlimentazione with wrong razza', () => {
        return request(app)
          .get('/api/v1/cibo/infoAlimentazione?razza=' + 'wrong')
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Razza not found' } );
    });

    test('GET /api/v1/cibo/infoAlimentazione with existing razza', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/cibo/infoAlimentazione?razza=' + 'maltese');
        expect(response.statusCode).toBe(200);
    });
});