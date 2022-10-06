const Tutorial = require('../models/users-business.model.js');

// Retrieve all companies from the database (with condition).
exports.findAll = (req, res) => {};

exports.findBusinessLocationCode = (req, res) => {};

// find all published companies
exports.findAllPublished = (req, res) => {};

exports.findCommunicator = (req, res) => {};

exports.createCommunicatorLink = (req, res) => {};

// ===================
// Retrieve objects
// ===================
// Retrieve all companies from the database (with condition).
exports.findAll = (req, res) => {
    const uuid = req.session.user.uuid;

    Tutorial.getAll(uuid, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.',
            });
        else res.send(data);
    });
};



exports.findBusinessLocationCode = (req, res) => {
    const uuid = req.session.user.uuid;
    //console.log('exports.findBusinessLocationCode = (req, res):', uuid);
    Tutorial.getBusinessLocationCode(uuid, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.',
            });
        else res.send(data);
    });
};


exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.',
            });
        else res.send(data);
    });
};

// const express = require('express');
// const bodyParser = require('body-parser');
// const url = require('url');
// const querystring = require('querystring');

// let app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

exports.findCommunicator = (req, res) => {
    // console.log('room_id: ', req.params.room_id);
    // console.log('call_id: ', req.params.call_id);
    // console.log('section_id: ', req.params.section_id);
    // console.log('peer_id: ', req.params.peer_id);
    console.log('link1: ', req.params.link);

    Tutorial.getCommunicator(req.params, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Link not found: ${req.params.link}.`,
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving link: ' + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.createCommunicatorLink = (req, res) => {
    const uuid = req.session.user.uuid;

    Tutorial.createCommunicatorLink(uuid, (err, data) => {
        console.log(' Tutorial.createCommunicatorLink data:', data);
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.',
            });
        else res.send(data);
    });
};
