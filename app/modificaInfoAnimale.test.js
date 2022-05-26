const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('PUT /api/v1/modificaInfoAnimale', () => {

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

    test('PUT /api/v1/modificaInfoAnimale with empty input', () => {
        return request(app)
          .put('/api/v1/modificaInfoAnimale')
          .send( { email: 'testing', id: '628f236dfda330ee960ba8de', nomeNew: '', razzaNew: '', etaNew: '', pesoNew: '', codiceChipNew: '' } )
          .expect('Content-Type', /json/)
          .expect(400, { success: false, message: 'Empty inputs' } );
    });

    test('PUT /api/v1/modificaInfoAnimale with wrong email', () => {
        return request(app)
          .put('/api/v1/modificaInfoAnimale')
          .send( { email: 'wrong', id: '628f236dfda330ee960ba8de', nomeNew: 'prova', razzaNew: 'bulldog', etaNew: '1', pesoNew: '2.1', codiceChipNew: 'abc' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found' } );
    });

    test('PUT /api/v1/modificaInfoAnimale with correct input', () => {
        return request(app)
          .put('/api/v1/modificaInfoAnimale')
          .send( { email: 'testing', id: '628f276ddc5e7e5d18554121', nomeNew: 'prova', razzaNew: 'bulldog', etaNew: '1', pesoNew: '2.1', codiceChipNew: 'abc' } )
          .expect('Content-Type', /json/)
          .expect(200, { success: true, message: 'Changes applyed' } );
    });
})