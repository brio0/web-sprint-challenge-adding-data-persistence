// build your `Resource` model here
const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    postResource
}
async function find() {
    const results = await db('resources')
    return results
}

async function findBy(resourceId) {
    const row = await db('resources').where('resource_id', resourceId).first()
    return row
}

function postResource(resource) {
    return db('resources')
        .insert(resource)
        .then(([id]) => {
            return db('resources').where('resource_id', id).first()
        })
}