const Tutorial = require('../models/users-business-medias.model.js');

// Retrieve all users business videos from the database (with condition).
exports.findAllBrochures = (req, res) => {};

exports.companiesProfilePicture = (req, res) => {};
// ===================
// Retrieve objects
// ===================
// Retrieve all users business videos from the database (with condition).
exports.findAllBrochures = (req, res) => {
    const uuid = req.session.user.uuid;

    console.log(uuid);

    Tutorial.getAll(uuid, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users business videos.',
            });
        else res.send(data);
    });
};

exports.companiesProfilePicture = (req, res) => {
    // console.log('exports.companiesProfilePicture = (req, res)', req.body.id);
    // console.log('exports.companiesProfilePicture = (req, res)', req.body.uuid);

    let companyID = req.body.id;
    let companyUUID = req.body.uuid;

    // Tutorial.getAllPublished(uuid, (err, data) => {
    //     if (err)
    //         res.status(500).send({
    //             message: err.message || 'Some error occurred while retrieving companies.',
    //         });
    //     else res.send(data);
    // });

    Tutorial.companiesProfilePicture(companyID, companyUUID, (err, data) => {
        // console.log('users-business-medias.controller.js data:', data);
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving user account.',
            });
        else res.send(data);
    });
};
