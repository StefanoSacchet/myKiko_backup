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

    /*INFO ALIMENTAZIONE RAZZA*/
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


    /*TIPOLOGIE DI CIBO*/
    test('GET /api/v1/cibo/tipiCibo with no email', () => {
        return request(app)
          .get('/api/v1/cibo/tipiCibo')
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found.' } );
    });

    test('GET /api/v1/cibo/tipiCibo with existing email', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/cibo/tipiCibo?email=' + 'testing');
        expect(response.statusCode).toBe(200);
    });

    /*AGGIUNGI CIBO*/
    test('POST /api/v1/cibo/aggiungiCibo with empty input', () => {
        return request(app)
          .post('/api/v1/cibo/aggiungiCibo')
          .send( { email: 'prova1', prodottoNew: '', quantitaNew: '' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Empty inputs' } );
    });

    test('POST /api/v1/cibo/aggiungiCibo with wrong email', () => {
        return request(app)
          .post('/api/v1/cibo/aggiungiCibo')
          .send( { email: 'wrong', prodottoNew: 'monge', quantitaNew: '15' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found' } );
    });

    test('POST /api/v1/cibo/aggiungiCibo with wrong email', () => {
        return request(app)
          .post('/api/v1/cibo/aggiungiCibo')
          .send( { email: 'testing', prodottoNew: 'monge', quantitaNew: '15' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Food already exists' } );
    });

    /*test('POST /api/v1/cibo/aggiungiCibo with correct info', () => {
        return request(app)
          .post('/api/v1/cibo/aggiungiCibo')
          .send( { email: 'testing', prodottoNew: 'biskit', quantitaNew: '69' } )
          .expect('Content-Type', /json/)
          .expect(201, { success: true, message: 'Data inserted' } );
    });*/


    /*MODIFICA VALORE CIBO*/
    test('PUT /api/v1/cibo/modificaValoreCibo with wrong email', () => {
        return request(app)
          .put('/api/v1/cibo/modificaValoreCibo')
          .send( { email: 'wrong', nomeProdotto: 'Monge', valoreNew: '' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found' } );
    });

    test('PUT /api/v1/cibo/modificaValoreCibo with correct input', () => {
        return request(app)
          .put('/api/v1/cibo/modificaValoreCibo')
          .send( { email: 'testing', nomeProdotto: 'biskit', valoreNew: '20'} )
          .expect('Content-Type', /json/)
          .expect(200, { success: true, message: 'Changes applyed' } );
    });

    /*DELETE CIBO*/
    test('DELETE /api/v1/cibo/deleteCibo with wrong email', () => {
        return request(app)
          .delete('/api/v1/cibo/deleteCibo')
          .send( { email: 'wrong', idCibo: '6294fae39b5454b0ea0024c8' } )
          .expect('Content-Type', /json/)
          .expect(200, { success: false, message: 'Delete failed. User not found.' } );
    });

    /*test('DELETE /api/v1/cibo/deleteCibo with correct input', () => {
        return request(app)
          .delete('/api/v1/cibo/deleteCibo')
          .send( { email: 'testing', idCibo: '6294fae39b5454b0ea0024c8' } )
          .expect('Content-Type', /json/)
          .expect(200, { success: true, message: 'Cibo deleted' } );
    });*/


});