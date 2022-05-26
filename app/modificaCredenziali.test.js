const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('PUT /api/v1/modificaCredenziali', () => {

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

    test('PUT /api/v1/modificaCredenziali with empty input', () => {
        return request(app)
          .put('/api/v1/modificaCredenziali')
          .send( { emailOld: 'testing', emailNew: '', passwordNew: '' } )
          .expect('Content-Type', /json/)
          .expect(400, { success: false, message: 'Empty inputs' } );
    });

    test('PUT /api/v1/modificaCredenziali with wrong emailOld', () => {
        return request(app)
          .put('/api/v1/modificaCredenziali')
          .send( { emailOld: 'wrong', emailNew: 'test', passwordNew: '123' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found' } );
    });

    /*test('PUT /api/v1/modificaCredenziali with correct input', () => {
        return request(app)
          .put('/api/v1/modificaCredenziali')
          .send( { emailOld: 'testing', emailNew: 'testing2', passwordNew: '123' } )
          .expect('Content-Type', /json/)
          .expect(200, { success: true, message: 'Changes applyed' } );
    });*/
})