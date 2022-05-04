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


// Getting cart by ID
describe("GET /cart/:id", () => {

    describe("Given that the ID exists", () => {

        test("Should return the cart w/code 200", async() => {

            const cart = {
                cartid: 3,
                userid: 3,
                items: {}
            }

            await agent.get("/cart/" + cart.userid)
                .expect(200)
                .set('token', cookie)
                .then((res) => {
                    //  Check type and length
                    expect(Array.isArray(res.body)).toBeTruthy();
                    expect(res.body.length).toEqual(1);

                    // Check data
                    expect(res.body[0].cartid).toBe(cart.cartid);
                    expect(res.body[0].userid).toBe(cart.userid);
                })
        })
    })

    describe("Given that the ID doesn't exist", () => {

        test("Should return empty body w/code 200", async() => {

            await agent.get("/cart/0")
                .expect(200)
                .set('token', cookie)
                .then((res) => {
                    //  Check type and length
                    expect(Array.isArray(res.body)).toBeTruthy();
                    expect(res.body.length).toEqual(0);

                })
        })
    })

})

// Adding an item to the cart
describe("PUT /cart/add", ()=> {

})

// Removing an item from a cart
describe("PUT /cart/remove", () => {

})

// Deleting a cart
describe("DELETE /cart/:id", () => {

})