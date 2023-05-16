// build your `/api/projects` router here
const express = require('express')
const Project = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
    Project.find()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: "error fetching projects",
                err: err.message,
                stack: err.stack
            })
        })
})

module.exports = router


