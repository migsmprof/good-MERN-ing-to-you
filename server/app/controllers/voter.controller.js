const db = require('../models')
const Voters = db.voters
const Op = db.sequelizeModule.Op

//C
exports.create = (req, res) => {
    var new_voter = {
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        home_county: req.body.home_county,
        home_state: req.body.home_state,
    }

    Voters
        .create(new_voter)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                message: err.message,
            })
        })
}

//R
exports.findOne = (req, res) => {
    var id = req.params.id

    Voters
        .findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}

exports.findAll = (req, res) => {
    var home_county = req.query.home_county
    var home_state = req.query.home_state
    var condition = (home_state, home_county) => {
        if (home_state) {
            return {
                home_state: {
                    [Op.eq]: home_state
                }
            }
        } else if (home_county) {
            return {
                home_county: {
                    [Op.eq]: home_county
                }
            }
        } else {
            return {}
        }
    }

    Voters
        .findAll({
            where: condition(home_county, home_state)
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}

//U
exports.update = (req, res) => {
    var id = req.params.id

    Voters
        .update(req.body, {
            where: {
                id: id,
            }
        })
        .then(num => {
            var msg = (num == 1) ? 's' : 'e'
            res.send({
                message: msg,
            })
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}

//D
exports.delete = (req, res) => {
    var id = req.params.id

    Voters
        .destroy({
            where: {
                id: id,
            }
        })
        .then(num => {
            var msg = (num == 1) ? 's' : 'e'
            res.send({
                message: msg,
            })
        })
        .catch(err => {
            res.status.send({
                message: err.message || '',
            })
        })
}

exports.deleteAll = (req, res) => {
    Voters
        .destroy({
            where: {},
            truncate: false,
        })
        .then(nums => {
            res.send({
                message: nums,
            })
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}