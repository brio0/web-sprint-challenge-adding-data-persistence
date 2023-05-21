// build your `Task` model here
const db = require('../../data/dbConfig')

module.exports = {
    find,
    postTask
}

async function find() {
    const result = await db('tasks as t')
        .leftJoin('projects as p', 't.project_id', '=', 'p.project_id').select('task_id', 'task_description', 'task_notes', 'task_completed', 't.project_id', 'project_name', 'project_description')
    return result


    //     select
    //     t.task_id,
    //         t.task_description,
    //         t.task_notes,
    //         t.task_completed,
    //         t.project_id,
    //         p.project_id,
    //         p.project_name,
    //         p.project_description
    // from tasks as t
    //  left join projects as p 
    // where t.project_id = p.project_id

}

function postTask(task) {
    return db('tasks')
        .insert(task)
        .then(([id]) => {
            return db('tasks').where('task_id', id).first()
        })
}


