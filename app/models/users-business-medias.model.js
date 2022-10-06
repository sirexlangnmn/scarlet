const sql = require('./db.js');
const USERS_BUSINESS_MEDIAS = require('../query/users_business_medias.query.js');

// constructor
const Tutorial = function (tutorial) {};

Tutorial.getAll = (uuid, result) => {
    let query = 'SELECT id, brochure, brochure_title FROM users_business_medias';

    if (uuid) {
        query += ` WHERE uuid = "${uuid}"`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        // console.log('users_business_medias: ', res);
        result(null, res);
    });
};

Tutorial.companiesProfilePicture = (companyID, companyUUID, result) => {
    // console.log('user-accounts.model.js companiesProfilePicture companyID:', companyID);
    // console.log('user-accounts.model.js companiesProfilePicture companyUUID:', companyUUID);

    if (companyUUID) {
        let query = `SELECT banner FROM users_business_medias WHERE uuid = '${companyUUID}'`;

        sql.query(query, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            // console.log('users_business_medias: ', res);
            result(null, res);
        });
    }
};

module.exports = Tutorial;
