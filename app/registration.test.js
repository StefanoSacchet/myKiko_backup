const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');

describe('POST /api/v1/registration', () => {

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

    test('POST /api/v1/registration with an empty input', () => {
        return request(app)
          .post('/api/v1/registration')
          .send({ email: '', password: '' }) // sends a JSON post body
          .expect('Content-Type', /json/)
          .expect(400, { success: false, message: 'Registration failed. input empty' } );
    });

    test('POST /api/v1/registration with existing user', () => {
        return request(app)
          .post('/api/v1/registration')
          .send({ email: 'prova2', password: '2' }) // sends a JSON post body
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Registration failed. User already subscribed.' } );
    });

    /*test('POST /api/v1/registration with new user', () => { //Aggiunge al db user tmp
        return request(app)
          .post('/api/v1/registration')
          .send({ email: 'tmp', password: '1' }) // sends a JSON post body
          .expect('Content-Type', /json/)
          .expect(201);
    });*/
});