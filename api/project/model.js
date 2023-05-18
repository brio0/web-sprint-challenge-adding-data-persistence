// build your `Project` model here
const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    postProject
}

async function find() {
    const rows = await db('projects')
    return rows
}

async function findBy(projectId) {
    const result = await db('projects').where('project_id', projectId).first()
    return result
}

function postProject(project) {
    return db("projects")
        .insert(project)
        .then(([id]) => findBy(id));
}