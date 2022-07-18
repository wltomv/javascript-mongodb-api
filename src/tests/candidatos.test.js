
const { default: mongoose } = require('mongoose');
const supertest = require('supertest');
const { app, server } = require("../index");
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.IX7fEiKssezv_5TWxaQiHgTESrhwoCBcZnEIsRFBsaI'

const api = supertest(app)
// UNIT TESTS nuevo

describe('GET /candidate/{id_eleccion}', () => {
    test('Shoud responds with 403 status code when the user is not authorized', function (done) {
        api
            .get('/candidate/7a085')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer abc')
            .send()
            .expect('Content-Type', /json/)
            .expect(403, done);
    });

    test('Candidates are returned as json', function (done) {
        api
            .get('/candidate/7a085')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
})

test('a valid candidate can be added', async () => {
    const newCandidate = {
        eleccion: {
            id_eleccion: "adfasdfasd3232",
            titulo: "titulo de la eleccion"
        },
        titulo: "Candidato 6",
        imagen: "http://image.com",
        metadata: [{ "partido": "union" }, { "puesto": "presidente" }]
    }

    await api
        .post('/candidate')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(newCandidate)
        .expect('Content-Type', /json/)
        .expect(200);
})


afterAll(() => {
    mongoose.connection.close()
    server.close()
})