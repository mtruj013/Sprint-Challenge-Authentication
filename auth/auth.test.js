const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig.js');

beforeEach(() => {
    return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run())
})

test("can successfully register user", async () => {
    const res = await request(server)
        .post("/api/auth/register")
        .send({
            username: "maria",
            password: "ilnp"
        })
    expect(res.status).toBe(200);
})

test("can weed out invalid input", async () => {
    const res = await request(server)
        .post("/api/auth/register")
        .send({
            usernam: "bob"
        })
    expect(res.status).toBe(403)
})

test("can successfully log user in", async () => {
    const register = await request(server)
        .post("/api/auth/register")
        .send({
            username: "maria", 
            password: "ilnp"})
    const res = await request(server)
        .post("/api/auth/login")
        .send({
            username: "maria",
            password: "ilnp"
        })
    expect(res.status).toBe(200);
})

test("can successfully catch invalid login", async () => {
    const register = await request(server)
        .post("/api/auth/register")
        .send({
            username: "bobs",
            password: "burgers"
        })
    const res = await request(server)
        .post("/api/auth/login")
        .send({
            username: "bob"
        })
    expect(res.status).toBe(403)
})