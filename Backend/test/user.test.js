const supertest = require('supertest');
const app = require('../app');
const { CookieAccessInfo } = require('cookiejar');
const agent = supertest.agent(app);

var access_info, cookie, madeUser;

beforeAll((done) => {
    var path = '';
    agent.post('/login')
        .send({
            email: 'tester@gmail.com',
            password: 'test'
        })
        .end((err, res) => {
            access_info = CookieAccessInfo();
            cookie = agent.jar.getCookie('token', access_info);
            done();
        })
})


describe('GET /users', () => {
    test('Should return all users', async() => {

        await agent.get('/users')
            .expect(200)
            .set('token', cookie)
            .then((res) => {
                let body = JSON.parse(res.text).message;
                expect(Array.isArray(body)).toBeTruthy();
            })

    })
})

describe('POST /users', () => {
    test('Should create a user and return it', async() => {

        let user = {
            name: 'test',
            password: 'password',
            email: 'test@tester.com',
            address: 'adr',
            city: 'city',
            state: 'state',
            zip: 12345
        }

        await agent.post('/users')
            .expect(201)
            .send(user)
            .then((res) => {
                let ret = res.body.message[0];

                expect(ret.name).toEqual(user.name);
                expect(ret.email).toEqual(user.email);
                expect(ret.address).toEqual(user.address);
                expect(ret.city).toEqual(user.city);
                expect(ret.state).toEqual(user.state);
                expect(ret.zip).toEqual(user.zip);

                madeUser = ret;

            })
    })
})

describe('GET /users/:id', () => {
    test('Should return the given user if ID exists', async() => {
        await agent.get('/users/' + madeUser.id)
            .expect(200)
            .set('token', cookie)
            .then((res) => {
                let ret = res.body.message[0];
                expect(ret).toEqual(madeUser);
            })
    })
    test('Should return 500 error if user does not exist', async() => {
        await agent.get('/users/0')
            .expect(500)
            .set('token', cookie)
    })
})

describe('PUT /users', () => {
    test('Should update the made user', async() => {
        let newUser = {
            name: 'different test',
            email: 'testingthis@tester.com',
            password: 'password',
            address: 'not address',
            city: 'not city',
            state: 'not state',
            zip: 54321,
            id: madeUser.id
        }
        await agent.put('/users')
            .expect(200)
            .set('token', cookie)
            .send(newUser)
            .then((res) => {

                let ret = res.body[0];

                expect(ret.name).toEqual(newUser.name);
                expect(ret.email).toEqual(newUser.email);
                expect(ret.address).toEqual(newUser.address);
                expect(ret.city).toEqual(newUser.city);
                expect(ret.state).toEqual(newUser.state);
                expect(ret.zip).toEqual(newUser.zip);

                madeUser = ret;

            })
    })
})

describe('DELETE /users/:id', () => {
    test('Should delete the user w/ given id', async() => {

        await agent.delete('/users/' + madeUser.id)
            .expect(200)
            .set('token', cookie)
            .then((res) => {

            })

    })
})