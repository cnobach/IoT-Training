const supertest = require('supertest');
const app = require('../app');
const { CookieAccessInfo } = require('cookiejar');
const agent = supertest.agent(app);

var access_info, cookie;

beforeAll((done) => {
    var path = '';
    agent.post('/login')
        .send({
            email: 'test@gmail.com',
            password: 'test'
        })
        .end((err, res) => {
            access_info = CookieAccessInfo();
            cookie = agent.jar.getCookie('token', access_info);
            done();
        })
})

describe('Creating a new transaction', () => {

    test('PUT /trans/new', async() => {

        let trans = {
            items: [5, 6, 7, 8],
            id: 1
        }

        await agent.put('/trans/new')
            .expect(200)
            .set('token', cookie)
            .send(trans)
            .then((res) => {
                let test = JSON.parse(res.text);
                console.log('RES:', test[0]);
                let date = new Date();

                expect(test[0].items).toEqual(trans.items);
                expect(test[0].customer).toEqual(trans.id);

            })

    })

})