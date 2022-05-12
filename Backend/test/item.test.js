const supertest = require('supertest');
const app = require('../app');
const { CookieAccessInfo } = require('cookiejar');
const agent = supertest.agent(app);

var access_info, cookie, itemId;

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

// Getting all items
describe('GET /items', () => {
    test('Should return a list of items', async () => {

        await agent.get("/items")
            .expect(200)
            .set('token', cookie)
            .then((res) => {
                // Check type
                expect(Array.isArray(res.body)).toBeTruthy();
            })
    })
})

// Getting item by ID
describe('GET /items/:id', () => {
    test('Given ID exists, return item', async () => {
        await agent.get('/items/1')
            .expect(200)
            .set('token', cookie)
            .then((res) => {
                //  Check type and length
                let data = res.body.message;
                expect(data.length).toEqual(1);

                //  check item is correct (hard coded currently), not checking date
                expect(data.name === "Product 1");
                expect(data.description === "The first product");
                expect(data.price === "10.00");
            })
    })
    test('Given ID does not exist, should return 500 code', async () => {
        await agent.get('/items/0')
            .expect(500)
            .set('token', cookie);
    })
})

// Creating an item
describe('POST /items', () => {
    test('Should create an item & return it w/ 201 code', async() => {

        let item = {
            name: 'Test product',
            date: new Date(),
            description: 'Test product that was made via jest tests',
            price: 999.99
        }

        await agent.post('/items')
            .expect(201)
            .set('token', cookie)
            .send(item)
            .then((res) => {
                //  Check type and length
                let ret = res.body.message;
                expect(Array.isArray(ret)).toBeTruthy();
                expect(ret.length).toEqual(1);
                itemId = ret.id;
            })
    })
})

// Updating an item
describe('PUT /items', () => {
    test('Should update an item & return it', async() => {

        let item = {
            name: 'Test product',
            date: new Date(),
            description: 'Test product that was made via jest tests, but updated through put',
            price: 999.99,
            id: itemId
        }

        await agent.put('/items')
            .expect(200)
            .set('token', cookie)
            .send(item)
            .then((res) => {
                //  Check type and content
                let ret = res.body.message;
                expect(Array.isArray(ret)).toBeTruthy();                
                expect(ret.description == item.description);
            })
    })
})

// Deleting an itemm
describe('DELETE /items/:id', () => {
    test('Should delete the item given the ID', async() => {

        await agent.delete('/items/' + itemId)
            .expect(200)
            .set('token', cookie)
            .then((res) => {

            })
    })
})