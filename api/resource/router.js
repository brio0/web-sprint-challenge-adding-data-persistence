// build your `/api/resources` router here
const express = require('express')
const Resource = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
    Resource.find()
        .then(resources => {
            if (resources) {
                res.status(200).json(resources)
            } else {
                return []
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "error fetching resource",
                err: err.message,
                stack: err.stack
            })
        })
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const resource = await Resource.findBy(id)
        if (resource) {
            res.status(200).json(resource)
        } else {
            res.status(404).json({
                message: `no project with id: ${id}`
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "error fetching resource",
            err: err.message,
            stack: err.stack
        })
    }
})

router.post('/', (req, res) => {
    const { resource_name, resource_description } = req.body
    if (!resource_name) {
        res.status(400).json({
            message: "please provide resource_name",
        })
    } else {
        Resource.postResource({ resource_name, resource_description })
            .then((resource) => {
                res.status(200).json(resource)
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