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

    test('POST /api/v1/authentication with wrong email', () => {
        return request(app)
          .post('/api/v1/authentication')
          .send( { email: 'wrong', password: '123'} )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Authentication failed. User not found.' } );
    });

    test('POST /api/v1/authentication with wrong password', () => {
        return request(app)
          .post('/api/v1/authentication')
          .send( { email: 'testing', password: 'wrong'} )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Authentication failed. Wrong password.' } );
    });

    let email = "testing";
    let id = "628f234a4922c8c875dec3e2";
    //Create a token
    const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
    var token = jwt.sign(
        {email: email, id: id},
        process.env.SUPER_SECRET,
        {expiresIn: 86400}
    );
    test('POST /api/v1/authentication with correct input', () => {
        return request(app)
          .post('/api/v1/authentication')
          .send( { email: email, password: '123'} )
          .expect('Content-Type', /json/)
          //.expect(200, { success: true, message: 'Enjoy your token!', token: token, email: email, id: id, self: 'api/v1/' + id } );
          .expect(200);
        });
})