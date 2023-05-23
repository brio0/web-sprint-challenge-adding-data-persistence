// build your `/api/projects` router here
const express = require('express')
const Project = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
    Project.find()
        .then(projects => {
            console.log(projects)

            if (projects) {
                const projectsWithBooleans = projects.map((project) => {
                    return {
                        ...project,
                        project_completed: Boolean(project.project_completed)
                    }
                })
                res.status(200).json(projectsWithBooleans)
            } else {
                return []
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "error fetching projects",
                err: err.message,
                stack: err.stack
            })
        })
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findBy(id)
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({
                message: `no project with id: ${id}`
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "error fetching project",
            err: err.message,
            stack: err.stack
        })
    }
})

router.post('/', (req, res) => {
    const { project_name, project_description, project_completed } = req.body

    if (!project_name) {
        res.status(400).json({
            message: "Please provide project_name"
        })
    } else {
        Project.postProject({ project_name, project_description, project_completed })
            .then((project) => {
                const projectWithBoolean = {
                    ...project,
                    project_completed: Boolean(project.project_completed)
                }
                res.status(201).json(projectWithBoolean)
            })
            .catch(err => {
                res.status(500).json({
                    message: "error posting project",
                    err: err.message,
                    stack: err.stack
                })
            })
    }
})

module.exports = router


