const { check, validationResult } = require('express-validator');

const traderRegistrationValidation = [
    // check('companyBanner', 'S:Upload banner.').exists(),
    // check('companyLogo', 'S:Upload logo.').exists(),
    // check('videoInput', 'S:Upload video presenting your company.').exists(),
    // check('thumbnailInput', 'S:Upload video thumbnail.').exists(),
    // check('brochureInput', 'S:Upload brochure related to your company.').exists(),
    // check('webinarsThumbnailInput', 'S:Upload thumbnail image related to your webinars.').exists(),

    check('traderCompanyName')
        .exists()
        .isLength({ min: 3 })
        .trim()
        .escape()
        .withMessage('S:Company Name must not be empty.'),
    check('traderWebsite').exists().isLength({ min: 3 }).trim().escape().withMessage('S:Website is required.'),
    check('traderBusinessEmailAddress')
        .isEmail()
        .normalizeEmail()
        .withMessage('S:Invalid Email Address.')
        .exists()
        .isLength({ min: 3 })
        .withMessage('S:Business Email Address is required.')
        .trim()
        .escape(),
    check('traderBusinessContactNumber')
        .isNumeric()
        .isLength({ min: 11, max: 11 })
        .withMessage('S:Business Contact Number is invalid')
        .trim()
        .escape()
        .exists()
        .withMessage('S:Business Contact Number is required.'),
    check('traderBusinessSocialMediaContactNumber')
        .isNumeric()
        .isLength({ min: 11, max: 11 })
        .withMessage('S:Business SocialMedia Contact Number is invalid.')
        .trim()
        .escape()
        .exists()
        .withMessage('S:Business SocialMedia Contact Number is required.'),

    check('traderSurnameOfRepresentative')
        .exists()
        .isLength({ min: 1 })
        .withMessage('S:Surname of representative is required.')
        .trim()
        .escape()
        .isAlpha()
        .withMessage('S:Surname of representative must alphabetical characters only.'),
    check('traderGivenNameOfRepresentative')
        .exists()
        .isLength({ min: 1 })
        .withMessage('S:Given Name of representative is required.')
        .trim()
        .escape()
        .isAlpha()
        .withMessage('S:Given Name of representative must alphabetical characters only.'),
    check('traderEmailAddress')
        .isEmail()
        .normalizeEmail()
        .withMessage('S:Invalid Email Address.')
        .exists()
        .isLength({ min: 3 })
        .trim()
        .escape()
        .withMessage('S:Trader Email Address is required.'),
];

module.exports = traderRegistrationValidation;
