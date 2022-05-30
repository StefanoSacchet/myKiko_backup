const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
 
describe('/api/v1/userAccount/', () => {

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

    /*AUTHENTICATION*/
    test('POST /api/v1/userAccount/authentication with empty input', () => {
        return request(app)
          .post('/api/v1/userAccount/authentication')
          .send( { email: '', password: ''} )
          .expect('Content-Type', /json/)
          .expect(400, { success: false, message: 'Empty inputs' } );
    });

    test('POST /api/v1/userAccount/authentication with wrong email', () => {
        return request(app)
          .post('/api/v1/userAccount/authentication')
          .send( { email: 'wrong', password: '123'} )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Authentication failed. User not found.' } );
    });

    test('POST /api/v1/userAccount/authentication with wrong password', () => {
        return request(app)
          .post('/api/v1/userAccount/authentication')
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
    test('POST /api/v1/userAccount/authentication with correct input', () => {
        return request(app)
          .post('/api/v1/userAccount/authentication')
          .send( { email: email, password: '123'} )
          .expect('Content-Type', /json/)
          //.expect(200, { success: true, message: 'Enjoy your token!', token: token, email: email, id: id, self: 'api/v1/' + id } );
          .expect(200);
    });


    /*REGISTRATION*/
    test('POST /api/v1/userAccount/registration with an empty input', () => {
        return request(app)
          .post('/api/v1/userAccount/registration')
          .send({ email: '', password: '' }) // sends a JSON post body
          .expect('Content-Type', /json/)
          .expect(400, { success: false, message: 'Registration failed. input empty' } );
    });

    test('POST /api/v1/userAccount/registration with existing user', () => {
        return request(app)
          .post('/api/v1/userAccount/registration')
          .send({ email: 'prova2', password: '2' }) // sends a JSON post body
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Registration failed. User already subscribed.' } );
    });

    /*test('POST /api/v1/userAccount/registration with new user', () => { //Aggiunge al db user tmp
        return request(app)
          .post('/api/v1/userAccount/registration')
          .send({ email: 'tmp', password: '1' }) // sends a JSON post body
          .expect('Content-Type', /json/)
          .expect(201);
    });*/


    /*MODIFICA CREDENZIALI*/
    test('PUT /api/v1/userAccount/modificaCredenziali with empty input', () => {
        return request(app)
          .put('/api/v1/userAccount/modificaCredenziali')
          .send( { emailOld: 'testing', emailNew: '', passwordNew: '' } )
          .expect('Content-Type', /json/)
          .expect(400, { success: false, message: 'Empty inputs' } );
    });

    test('PUT /api/v1/userAccount/modificaCredenziali with wrong emailOld', () => {
        return request(app)
          .put('/api/v1/userAccount/modificaCredenziali')
          .send( { emailOld: 'wrong', emailNew: 'test', passwordNew: '123' } )
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'User not found' } );
    });

    /*test('PUT /api/v1/userAccount/modificaCredenziali with correct input', () => {
        return request(app)
          .put('/api/v1/userAccount/modificaCredenziali')
          .send( { emailOld: 'testing', emailNew: 'testing2', passwordNew: '123' } )
          .expect('Content-Type', /json/)
          .expect(200, { success: true, message: 'Changes applyed' } );
    });*/


    /*DELETE ACCOUNT*/
    test('DELETE /api/v1/userAccount/deleteAccount with email not specified', () => {
        return request(app)
          .delete('/api/v1/userAccount/deleteAccount')
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Delete failed. User not found.' } );
    });

    test('DELETE /api/v1/userAccount/deleteAccount with wrong email', () => {
        return request(app)
          .delete('/api/v1/userAccount/deleteAccount')
          .send({ email: 'wrong' })
          .expect('Content-Type', /json/)
          .expect( { success: false, message: 'Delete failed. User not found.' } );
    });

    /*test('DELETE /api/v1/userAccount/deleteAccount with email specified', async () => {
        return request(app)
          .delete('/api/v1/userAccount/deleteAccount')
          .send({ email: 'cancella' })
          .expect('Content-Type', /json/)
          .expect( { success: true, message: 'Account deleted' } );
    });*/
})