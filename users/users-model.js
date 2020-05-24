const db = require("../database/dbConfig.js");

module.exports = {
    find, 
    add,
    findByUsername,
}

function find(){
    return db('users');
}

function add(user){
    return db('users')
    .insert(user)
    // .then(([id]) => id)
}

function findByUsername(username) {
    return db('users')
    .where({ username }).first();
}