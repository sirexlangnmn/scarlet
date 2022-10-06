const { validationResult } = require('express-validator');
const Controller = require('../models/upgrade-to-large-scale-company.model.js');

exports.update = (req, res) => {};

exports.update = (req, res) => {
    // const errors = validationResult(req);
    console.log('large-scale-company.controller.js | req.body');
    console.log(req.body);

    // try {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(200).send({
    //             message: errors.array(),
    //         });
    //     }
    // } catch (error) {
    //     return res.status(400).json({
    //         error: {
    //             message: error,
    //         },
    //     });
    // }

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    // Create a Controller
    const inputData = new Controller({
        id: req.session.user.id,
        uuid: req.session.user.uuid,

        // users ok
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        middle_name: req.body.middleName,

        // users_accounts ok
        social_media_contact_type: req.body.personalSocialMediaContactType,
        contact_number: req.body.personalSocialMediaContactNumber,
        
        // users_address ok
        country: req.body.country,
        state_or_province: req.body.states,
        city: req.body.city, //new

        // users_business
        business_name: req.body.companyName,
        business_tagline: req.body.tagline,
        business_website: req.body.website, 
        business_email: req.body.businessEmailAddress,
        business_contact: req.body.businessContactNumber,
        business_social_media_contact_type: req.body.businessSocialMediaContactType,
        business_social_media_contact_number: req.body.businessSocialMediaContactNumber,
        business_address: req.body.businessAddress,
        business_country: req.body.businessCountryLocation,
        business_states: req.body.businessStatesLocation,
        business_city: req.body.businessCityLocation,
        editLanguagesOfCommunication: req.body.editLanguagesOfCommunication, // new language of communication
        currentLanguagesOfCommunication: req.body.currentLanguagesOfCommunication, // current language of communication
        
        // users_business_characteristics
        business_major_category: req.body.editTradeCategory,
        business_sub_category: req.body.traderSubCategoryToggleField,
        business_minor_sub_category: req.body.traderMinorSubCategoryToggleField,    
        
        session: req.session,
    });

    console.log('large-scale-company.controller.js | inputData');
    console.log(inputData);

    // Save Controller in the database
    Controller.update(inputData, (err, data) => {
        // console.log('controller data');
        // console.log(data);
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Model.',
            });
        //else res.send(data);
        else res.send('success');
    });
};
