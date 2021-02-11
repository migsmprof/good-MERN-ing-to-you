const db = require("../models")
const Counties = db.counties
const Op = db.sequelizeModule.Op

//C
exports.create = (req, res) => {
    if (!req.body) {
        res.send({
            message: '',
        })
    }

    Counties
        .bulkCreate(req.body.entries)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}

//R
exports.findOne = (req, res) => {
    var code = req.params.code * 1

    Counties
        .findByPk(code)
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
    var home_state = req.query.home_state
    var condition = home_state ? {
        home_state: {
            [Op.eq]: home_state
        }
    } : null

    Counties
        .findAll({
            where: condition
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
    var code = req.params.code * 1

    Counties
        .update(req.body, {
            where: {
                code: code
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
    var code = req.params.code * 1

    Counties
        .destroy({
            where: {
                code: code
            }
        })
        .then(num => {
            var msg = (num == 1) ? 's' : 'e'
            res.send({
                message: msg
            })
        })
        .catch(err => {
            res.send({
                message: err.message || '',
            })
        })
}

exports.deleteAll = (req, res) => {
    Counties
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