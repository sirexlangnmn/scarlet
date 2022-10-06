const sql = require('./db.js');

const Model = function (model) {
    console.log('large-scale-company.model.js | const Model = function (model): ');
    console.log(model);

    this.id = model.id;
    this.uuid = model.uuid;

    // users ok
    this.first_name = model.first_name;
    this.last_name = model.last_name;
    this.middle_name = model.middle_name;

    // users_accounts ok
    this.social_media_contact_type = model.social_media_contact_type;
    this.contact_number = model.contact_number;
    this.type = 2, // member/user that looking for large scale

    // users_address ok
    this.country = model.country;
    this.state_or_province = model.state_or_province;
    this.city = model.city;

    // // users_business
    this.business_name = model.business_name;
    this.business_tagline = model.business_tagline;
    this.business_website = model.business_website;
    this.business_email = model.business_email;
    this.business_contact = model.business_contact;
    this.business_social_media_contact_type = model.business_social_media_contact_type;
    this.business_social_media_contact_number = model.business_social_media_contact_number;
    this.business_address = model.business_address;
    this.business_country = model.business_country;
    this.business_states = model.business_states; 
    this.business_city = model.business_city;
    this.business_language_of_communication = model.editLanguagesOfCommunication === undefined ? model.currentLanguagesOfCommunication : model.editLanguagesOfCommunication.toString(); //new

    // users_business_characteristics ok
    this.business_major_category = model.business_major_category;
    this.business_sub_category = model.business_sub_category;
    this.business_minor_sub_category = model.business_minor_sub_category;   

    this.session = model.session;
};

Model.update = (newModel, result) => {
    console.log('large-scale-company.model.js | Model.create = (newModel, result) => {');
    console.log(newModel);

    // users ok
    const usersData = [
        newModel.first_name,
        newModel.last_name,
        newModel.middle_name,
        newModel.uuid,
    ];

    const usersQuery = `UPDATE users SET 
        first_name = ?, 
        last_name = ?, 
        middle_name = ?
        WHERE uuid = ?`;

     // users_accounts ok
    const usersAccountsData = [
        newModel.social_media_contact_type,
        newModel.contact_number,
        newModel.type,
        newModel.uuid,
    ];

    const usersAccountsQuery = `UPDATE users_accounts SET 
        social_media_contact_type = ?, 
        contact_number = ?,
        type = ?
        WHERE uuid = ?`;

    // users_address ok
    const usersAddressData = [
        newModel.country,
        newModel.state_or_province,
        newModel.city,
        newModel.uuid,
    ];

    const usersAddressQuery = `UPDATE users_address SET 
        country = ?, 
        state_or_province = ?, 
        city = ?
        WHERE uuid = ?`;

    // users_business
    const usersBusinessData = [
        newModel.business_name,
        newModel.business_tagline,
        newModel.business_website,
        newModel.business_email,
        newModel.business_contact,
        newModel.business_social_media_contact_type,
        newModel.business_social_media_contact_number,
        newModel.business_address,
        newModel.business_country,
        newModel.business_states,
        newModel.business_city,
        newModel.business_language_of_communication,
        newModel.uuid,
    ];
    
    const usersBusinessQuery = `UPDATE users_business SET 
        business_name = ?, 
        business_tagline = ?, 
        business_website = ?, 
        business_email = ?, 
        business_contact = ?, 
        business_social_media_contact_type = ?, 
        business_social_media_contact_number = ?,
        business_address = ?, 
        business_country = ?, 
        business_states = ?, 
        business_city = ?,
        business_language_of_communication = ?
        WHERE uuid = ?`;
    
    // users_business_characteristics ok
    const usersBusinessCharacteristicsData = [
        newModel.id,
        newModel.business_major_category,
        newModel.business_sub_category,
        newModel.business_minor_sub_category,
        newModel.uuid,
    ];

    const usersBusinessCharacteristicsQuery = `INSERT INTO users_business_characteristics
    (user_business_id, business_major_category, business_sub_category, business_minor_sub_category, uuid) VALUES (?, ?, ?, ?, ?);`;


    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) {
            throw err;
        }

        sql.query(usersQuery, usersData, function (err, rows) {
            if (err) {
                sql.rollback(function () {
                    throw err;
                });
            } else {
                sql.query(usersAccountsQuery, usersAccountsData, function (err, rows) {
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    } else {
                        sql.query(usersAddressQuery, usersAddressData, (err, rows) => {
                            if (err) {
                                sql.rollback(function () {
                                    throw err;
                                });
                            } else {
                                sql.query(usersBusinessQuery, usersBusinessData, (err, rows) => {
                                    if (err) {
                                        sql.rollback(function () {
                                            throw err;
                                        });
                                    } else {
                                        sql.query(usersBusinessCharacteristicsQuery, usersBusinessCharacteristicsData, (err, rows) => {
                                            if (err) {
                                                sql.rollback(function () {
                                                    throw err;
                                                });
                                            } else {
                                                sql.commit(function (err) {
                                                    if (err) {
                                                        sql.rollback(function () {
                                                            throw err;
                                                        });
                                                    } else {
                                                            newModel.session.user.type = newModel.type;
                                                            result(null, { id: rows.insertId, ...newModel });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
    /* End transaction */
};

module.exports = Model;
