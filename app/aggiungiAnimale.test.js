const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('POST /api/v1/aggiungiAnimale', () => {
    
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

    test('DELETE /api/v1/aggiungiAnimale with empty input', () => {
        return request(app)
          .post('/api/v1/aggiungiAnimale')
          .send( { email: 'prova1', nomeNew: '', razzaNew: 'gatto', etaNew: 3, pesoNew: 3.5, codiceChipNew: "123" } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Empty inputs' } );
    });

    test('DELETE /api/v1/aggiungiAnimale with wrong email', () => {
        return request(app)
          .post('/api/v1/aggiungiAnimale')
          .send( { email: 'wrong', nomeNew: 'Fufi', razzaNew: 'gatto', etaNew: 3, pesoNew: 3.5, codiceChipNew: "123" } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found' } );
    });

    test('DELETE /api/v1/aggiungiAnimale with correct info', () => {
        return request(app)
          .post('/api/v1/aggiungiAnimale')
          .send( { email: 'testing', nomeNew: 'Fufi', razzaNew: 'gatto', etaNew: 3, pesoNew: 3.5, codiceChipNew: "123" } )
          .expect('Content-Type', /json/)
          .expect(201, { success: true, message: 'Data inserted' } );
    });
});