const supertest = require('supertest');
const app = require('../app');
const { CookieAccessInfo } = require('cookiejar');
const agent = supertest.agent(app);

var access_info, cookie;

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

// Getting by ID
describe("GET /inventory/:id", () => {

    describe("If the item exists", () => {
        test("Should get the inventory of the given item", async () => {

            // Pretty hard corded rn, have to make this dynamic
            let ret = [{
                "quantity": 6
            }]

            await agent.get('/inventory/5')
                .expect(200)
                .set('token', cookie)
                .then((res) => {
                    expect(Array.isArray(res.body)).toBeTruthy();
                    expect(res.body.length).toEqual(1);

                    expect(res.body).toEqual(ret);
                })

        })
    })

    describe("If the item doesn't exist", () => {
        test("Should return a 500 code", async () => {

            await agent.get('/inventory/8')
                .expect(500)
                .set('token', cookie)
                .then((res) => {
                    expect(res.body).toEqual({});
                })
        })
    })
})

// Setting the inventory amount
describe("PUT /inventory/:id", () => {

    describe("If the item exists", () => {
        test("Should set the inventory of the given item", async () => {

            // Pretty hard corded rn, have to make this dynamic
            let ret = [{
                "amount": 6
            }]

            await agent.put('/inventory/2')
                .expect(200)
                .set('token', cookie)
                .send({
                    amount: 10
                })
                .then((res) => {
                    expect(res.body).toEqual(true);
                })

        })
    })
})
