const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('DELETE /api/v1/deleteAccount', () => {

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

    test('DELETE /api/v1/deleteAccount with email not specified', () => {
        return request(app)
          .delete('/api/v1/deleteAccount')
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Delete failed. User not found.' } );
    });

    test('DELETE /api/v1/deleteAccount with wrong email', () => {
        return request(app)
          .delete('/api/v1/deleteAccount')
          .send({ email: 'test' })
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Delete failed. User not found.' } );
    });

    /*let email = "prova3"; //Cancella realmente dal database prova3
    test('DELETE /api/v1/deleteAccount with email specified', async () => {
        return request(app)
          .delete('/api/v1/deleteAccount')
          .send({ email: email })
          .expect('Content-Type', /json/)
          .expect( { success: true, message: 'Account deleted' } );
    });*/
});