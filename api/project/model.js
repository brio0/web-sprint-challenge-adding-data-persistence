// build your `Project` model here
const db = require('../../data/dbConfig.js')

module.exports = {
    find
}

async function find() {
    const rows = await db('projects')
    console.log(rows)
    return rows
}