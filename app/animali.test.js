const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');

describe('/api/v1/animali/', () => {

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

    /*INFO ANIMALE*/
    test('GET /api/v1/animali/infoAnimale with email not specified', () => {
        return request(app)
          .get('/api/v1/animali/infoAnimale')
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Authentication failed. User not found.' } );
    });

    let email = "prova1";    
    test('GET /api/v1/animali/infoAnimale with email specified', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/animali/infoAnimale?email='+ email);
        expect(response.statusCode).toBe(200);
    });


    /*INFO RAZZA*/
    test('GET /api/v1/animali/infoRazza with razza not specified', () => {
        return request(app)
          .get('/api/v1/animali/infoRazza')
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Razza not found' } );
    });


    let razza = "maltese";    
    test('GET /api/v1/animali/animali/infoRazza with razza specified', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/animali/infoRazza?razza=' + razza);
        expect(response.statusCode).toBe(200);
    });
   
    test('GET /api/v1/animali/infoRazza with razza specified', async () => {
        expect.assertions(3);
        const response = await request(app).get('/api/v1/animali/infoRazza?razza=' + razza);
        const user = response.body;
        expect(user).toBeDefined();
        expect(user.success).toBe(true);
        expect(user.imgRazza).toBe("/images/maltese.jpeg");
    });


    /*AGGIUNGI ANIMALE*/
    test('POST /api/v1/animali/aggiungiAnimale with empty input', () => {
        return request(app)
          .post('/api/v1/animali/aggiungiAnimale')
          .send( { email: 'prova1', nomeNew: '', razzaNew: 'gatto', etaNew: 3, pesoNew: 3.5, codiceChipNew: "123" } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Empty inputs' } );
    });

    test('POST /api/v1/animali/aggiungiAnimale with wrong email', () => {
        return request(app)
          .post('/api/v1/animali/aggiungiAnimale')
          .send( { email: 'wrong', nomeNew: 'Fufi', razzaNew: 'gatto', etaNew: 3, pesoNew: 3.5, codiceChipNew: "123" } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found' } );
    });

    /*test('POST /api/v1/animali/aggiungiAnimale with correct info', () => {
        return request(app)
          .post('/api/v1/animali/aggiungiAnimale')
          .send( { email: 'testing', nomeNew: 'Fufi', razzaNew: 'gatto', etaNew: 3, pesoNew: 3.5, codiceChipNew: "123" } )
          .expect('Content-Type', /json/)
          .expect(201, { success: true, message: 'Data inserted' } );
    });*/


    /*MODIFICA INFO ANIMALE*/
    test('PUT /api/v1/animali/modificaInfoAnimale with empty input', () => {
        return request(app)
          .put('/api/v1/animali/modificaInfoAnimale')
          .send( { email: 'testing', id: '628f236dfda330ee960ba8de', nomeNew: '', razzaNew: '', etaNew: '', pesoNew: '', codiceChipNew: '' } )
          .expect('Content-Type', /json/)
          .expect(400, { success: false, message: 'Empty inputs' } );
    });

    test('PUT /api/v1/animali/modificaInfoAnimale with wrong email', () => {
        return request(app)
          .put('/api/v1/animali/modificaInfoAnimale')
          .send( { email: 'wrong', id: '628f236dfda330ee960ba8de', nomeNew: 'prova', razzaNew: 'bulldog', etaNew: '1', pesoNew: '2.1', codiceChipNew: 'abc' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found' } );
    });

    test('PUT /api/v1/animali/modificaInfoAnimale with correct input', () => {
        return request(app)
          .put('/api/v1/animali/modificaInfoAnimale')
          .send( { email: 'testing', id: '628f276ddc5e7e5d18554121', nomeNew: 'prova', razzaNew: 'bulldog', etaNew: '1', pesoNew: '2.1', codiceChipNew: 'abc' } )
          .expect('Content-Type', /json/)
          .expect(200, { success: true, message: 'Changes applyed' } );
    });


    /*DELTE ANIMALE*/
    test('DELETE /api/v1/animali/deleteAnimale with wrong email', () => {
        return request(app)
          .delete('/api/v1/animali/deleteAnimale')
          .send( { email: 'wrong', idAnimale: '628f276ddc5e7e5d18554121' } )
          .expect('Content-Type', /json/)
          .expect(200, { success: false, message: 'Delete failed. User not found.' } );
    });

    /*test('DELETE /api/v1/animali/deleteAnimale with correct input', () => {
        return request(app)
          .delete('/api/v1/animali/deleteAnimale')
          .send( { email: 'testing', idAnimale: '6291ee7f9f4ddce4d0bca11b' } )
          .expect('Content-Type', /json/)
          .expect(200, { success: true, message: 'Animale deleted' } );
    });*/
})