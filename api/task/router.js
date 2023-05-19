// build your `/api/tasks` router here
const express = require('express')
const Tasks = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
    Tasks.find()
        .then(task => {
            if (task) {
                res.status(200).json(task)
            } else {
                return []
            }

        })
        .catch(err => {
            res.status(500).json({
                message: "error fetching tasks",
                err: err.message,
                stack: err.stack
            })
        })
})

module.exports = router
