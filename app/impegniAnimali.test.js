const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('/api/v1/impegniAnimali/', () => {

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

    /*test('POST /api/v1/impegniAnimali/aggiungiImpegno with right input', () => {
        return request(app)
          .post('/api/v1/impegniAnimali/aggiungiImpegno')
          .send( {  email: 'testing', impegnoNew: 'test', animaleNew: 'test', luogoNew: 'test', dataNew: '1' } )
          .expect('Content-Type', /json/)
          .expect(201, { success: true, message: 'Data inserted' } );
    });*/


    /*MODIFICA IMPEGNO*/
    test('PUT /api/v1/impegniAnimali/modificaImpegno with empty input', () => {
        return request(app)
          .put('/api/v1/impegniAnimali/modificaImpegno')
          .send( {  email: 'testing', id: '', impegnoNew: '', animaleNew: '', luogoNew: '', dataNew: '' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Empty inputs' } );
    });

    test('PUT /api/v1/impegniAnimali/modificaImpegno with wrong input', () => {
        return request(app)
          .put('/api/v1/impegniAnimali/modificaImpegno')
          .send( {  email: 'wrong', id: '629147de49f79b7228392781', impegnoNew: 'tmp', animaleNew: 'tmp', luogoNew: 'tmp', dataNew: '2' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found' } );
    });

    test('PUT /api/v1/impegniAnimali/modificaImpegno with correct input', () => {
        return request(app)
          .put('/api/v1/impegniAnimali/modificaImpegno')
          .send( {  email: 'testing', id: '6294fae39b5454b0ea0024c7', impegnoNew: '1', animaleNew: 'tmp', luogoNew: 'tmp', dataNew: '2' } )
          .expect('Content-Type', /json/)
          .expect(200, { success: true, message: 'Changes applyed' } );
    });


    /*DELETE IMPEGNO*/
    test('DELETE /api/v1/impegniAnimali/deleteImpengo with wrong input', () => {
        return request(app)
          .delete('/api/v1/impegniAnimali/deleteImpegno')
          .send( {  email: 'wrong', id: '628fe8cb6e88a8ccf67b0388' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Delete failed. User not found.' } );
    });

    /*test('DELETE /api/v1/impegniAnimali/deleteImpengo with correct input', () => {
        return request(app)
          .delete('/api/v1/impegniAnimali/deleteImpegno')
          .send( {  email: 'testing', id: '6294fae39b5454b0ea0024c6' } )
          .expect('Content-Type', /json/)
          .expect(200, { success: true, message: 'Impegno deleted' } );
    });*/
})