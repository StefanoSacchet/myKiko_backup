const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('POST /api/v1/authentication', () => {

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

    test('POST /api/v1/authentication with empty input', () => {
        return request(app)
          .post('/api/v1/authentication')
          .send( { email: '', password: ''} )
          .expect('Content-Type', /json/)
          .expect(400, { success: false, message: 'Empty inputs' } );
    });
})