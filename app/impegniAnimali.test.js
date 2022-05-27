const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('/api/v1/impegniAnimali/', () => {

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

    /*IMPEGNI*/
    test('GET /api/v1/impegniAnimali/impegni with email not specified', () => {
        return request(app)
          .get('/api/v1/impegniAnimali/impegni')
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found.' } );
    });

    test('GET /api/v1/impegniAnimali/impegni with email specified', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/impegniAnimali/impegni?email='+ 'prova1');
        expect(response.statusCode).toBe(200);
    });


    /*AGGIUNGI IMPEGNO*/
    test('POST /api/v1/impegniAnimali/aggiungiImpegno with empty input', () => {
        return request(app)
          .post('/api/v1/impegniAnimali/aggiungiImpegno')
          .send( {  email: 'testing', impegnoNew: '', animaleNew: '', luogoNew: '', dataNew: '' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Empty inputs' } );
    });

    test('POST /api/v1/impegniAnimali/aggiungiImpegno with right input', () => {
        return request(app)
          .post('/api/v1/impegniAnimali/aggiungiImpegno')
          .send( {  email: 'testing', impegnoNew: 'test', animaleNew: 'test', luogoNew: 'test', dataNew: '1' } )
          .expect('Content-Type', /json/)
          .expect(201, { success: true, message: 'Data inserted' } );
    });


    /*MODIFICA IMPEGNO*/


    /*DELETE IMPEGNO*/
})