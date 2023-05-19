// build your `Project` model here
const db = require('../../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    postProject
}

async function find() {
    const result = await db('projects')
    return result
}

async function findBy(projectId) {
    const result = await db('projects').where('project_id', projectId).first()
    return result
}

function postProject(project) {
    return db("projects")
        .insert(project)
        .then(([id]) => {
            return db('projects').where('project_id', id).first()
        });
}