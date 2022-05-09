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

        test("Should return w/code 500", async() => {

            await agent.get("/cart/0")
                .expect(500)
                .set('token', cookie)
        })
    })

})

// Adding an item to the cart
describe("PUT /cart/add", ()=> {
    test("Should add item to the cart", async() => {

        const cartArr = [1];

        await agent.put('/cart/add')
            .expect(200)
            .set('token', cookie)
            .send({
                itemId: 1,
                userId: 3 
            })
            .then((res) => {
                // Check data
                expect(res.body.cartid).toBe(3);
                expect(res.body.userid).toBe(3);
                expect(res.body.items).toEqual(cartArr);
            })
    })
})

// Removing an item from a cart
describe("PUT /cart/remove", () => {
    test("Should remove item from the cart", async() => {

        const cartArr = [];

        await agent.put('/cart/remove')
            .expect(200)
            .set('token', cookie)
            .send({
                itemId: 1,
                cartId: 3 
            })
            .then((res) => {
                // Check data
                expect(res.body.cartid).toBe(3);
                expect(res.body.userid).toBe(3);
                expect(res.body.items).toEqual(cartArr);
            })
    })
})

// Deleting a cart
describe("DELETE /cart/:id", () => {
    test("Should remove all items from the cart", async() => {

        await agent.put('/cart/add')
        .expect(200)
        .set('token', cookie)
        .send({
            itemId: 1,
            userId: 3 
        })
        await agent.put('/cart/add')
        .expect(200)
        .set('token', cookie)
        .send({
            itemId: 2,
            userId: 3 
        })
        await agent.put('/cart/add')
        .expect(200)
        .set('token', cookie)
        .send({
            itemId: 3,
            userId: 3 
        })

        const cartArr = [];

        await agent.delete('/cart/3')
            .expect(200)
            .set('token', cookie)
            .send({
                cartId: 3 
            })
            .then((res) => {
                // Check data
                expect(res.body.cartid).toBe(3);
                expect(res.body.userid).toBe(3);
                expect(res.body.items).toEqual(cartArr);
            })
    })
})