const { validationResult } = require('express-validator');
const Controller = require('../models/companyDetails.model.js');

// update and Save a new Controller
exports.update = (req, res) => {};

// ===================
// Update a new object
// ===================
exports.update = (req, res) => {
    //const errors = validationResult(req);
    // console.log('company details contoller req.body');
    // console.log(req.body);

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).send({
                message: errors.array(),
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: {
                message: error,
            },
        });
    }

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    // Create a Controller
    const inputData = new Controller({
        uuid: req.session.user.uuid,

        // users_business
        business_tagline: req.body.tagline,
        business_website: req.body.website,
        business_social_media_contact_type: req.body.businessSocialMediaContactType,
        start_operating_hour: req.body.startOperatingHour,
        end_operating_hour: req.body.endOperatingHour,
        business_email: req.body.businessEmailAddress,
        business_contact: req.body.businessContactNumber,
        editLanguagesOfCommunication: req.body.editLanguagesOfCommunication, // new language of communication
        currentLanguagesOfCommunication: req.body.currentLanguagesOfCommunication, // current language of communication
        business_social_media_contact_number: req.body.businessSocialMediaContactNumber,
        business_address: req.body.businessAddress,
        business_country: req.body.editBusinessCountryLocation,
        business_states: req.body.editBusinessStatesLocation,
        business_city: req.body.editBusinessCityLocation,
        region_of_operation: req.body.traderRegionOfOperation,
        country_of_operation: req.body.traderCountryOfOperation,
        country_for_state: req.body.traderCountryOfOperation2,
        states_of_operation: req.body.traderStatesOfOperation,

        // users_business_characteristics
        business_major_category: req.body.editTradeCategory,
        business_sub_category: req.body.traderSubCategoryToggleField,
        business_minor_sub_category: req.body.minorSubCategoryInput,
        textAreaAddKeywords: req.body.textAreaAddKeywords,
        textAreaCurrentKeywords: req.body.textAreaCurrentKeywords,
        business_scale: req.body.editBusinessScale,

        // users_business_visibility
        i_operate_on_a_world_wide_level: req.body.iOperateOnAWorldWideLevelRadioButton,
        i_operate_on_a_global_regional_level: req.body.iOperateOnAGlobalRegionalLevelRadioButton,
        i_operate_on_a_national_level: req.body.iOperateOnANationalLevelRadioButton,
        i_operate_on_a_state_level: req.body.iOperateOnAStateLevelRadioButton,
    });

    //Save Controller in the database
    Controller.update(inputData, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Model.',
            });
        // else res.send(data);
        else res.send('success');
    });
};
