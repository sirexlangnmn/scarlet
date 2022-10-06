const sql = require('./db.js');

const { v4: uuidV4 } = require('uuid');

const Model = function (model) {
    // console.log('const Model = function (model)');
    // console.log(model.business_language_of_communication.toString());
    // console.log(model.textAreaAddKeywords.toString());
    // console.log(model.textAreaAddKeywords);

    this.session = model.session;

    // users
    this.first_name = model.first_name;
    this.last_name = model.last_name;
    this.middle_name = model.middle_name;
    this.uuid = uuidV4();

    // users_accounts
    this.social_media_contact_type = model.social_media_contact_type;
    this.contact_number = model.contact_number;
    this.email_or_social_media = model.email_or_social_media;
    this.password = model.password;
    this.type = model.type;
    this.verification_code = Math.floor(Math.random() * 900000) + 100000;

    // users_address
    this.country = model.country;
    this.state_or_province = model.state_or_province;
    this.city = model.city;

    // users_business
    this.business_name = model.business_name;
    this.business_email = model.business_email;
    this.business_contact = model.business_contact;
    this.business_language_of_communication = model.business_language_of_communication.toString();
    this.business_tagline = model.business_tagline;

    // users_business_media / users_business
    this.business_website = model.business_website;
    this.business_social_media_contact_type = model.business_social_media_contact_type;
    this.business_social_media_contact_number = model.business_social_media_contact_number;

    // users_business_location / users_business
    this.business_address = model.business_address;
    this.business_country = model.business_country;
    this.business_states = model.business_states;
    this.business_city = model.business_city;

    // users_business_characteristics
    this.business_major_category = model.business_major_category;
    this.business_sub_category = model.business_sub_category;
    this.business_minor_sub_category = model.business_minor_sub_category;
};

Model.create = (newModel, result) => {
    // console.log('Model.create = (newModel, result) =>');
    // console.log(newModel);

    const usersDataQuery = `INSERT INTO users
    (first_name, last_name, middle_name, uuid) VALUES (?, ?, ?, ?);`;

    const usersAccountsQuery = `INSERT INTO users_accounts
    (user_id, email_or_social_media, social_media_contact_type, contact_number, password,  type, verification_code, uuid) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    const usersBusinessQuery = `INSERT INTO users_business
    (user_id, business_name, business_email, business_contact, business_language_of_communication, business_tagline, business_website, business_social_media_contact_type, business_social_media_contact_number, business_address, business_country, business_states, business_city, uuid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const usersAddressQuery = `INSERT INTO users_address
    (user_id, country, state_or_province, city, uuid) VALUES (?, ?, ?, ?, ?);`;

    const usersBusinessCharacteristicsQuery = `INSERT INTO users_business_characteristics
    (user_business_id, business_major_category, business_sub_category, business_minor_sub_category, uuid) VALUES (?, ?, ?, ?, ?);`;

    /* Begin transaction */
    sql.beginTransaction(function (err) {
        if (err) {
            throw err;
        }

        // users
        const usersData = [newModel.first_name, newModel.last_name, newModel.middle_name, newModel.uuid];

        sql.query(usersDataQuery, usersData, function (err, rows) {
            //ok
            if (err) {
                sql.rollback(function () {
                    throw err;
                });
            } else {
                // console.log('users table row inserted with id = ' + rows.insertId);
                // console.log('usersDataQuery', usersDataQuery);
                // console.log('usersData', usersData);

                // users_accounts
                const usersAccountsData = [
                    rows.insertId,
                    newModel.email_or_social_media,
                    newModel.social_media_contact_type,
                    newModel.contact_number,
                    newModel.password,
                    newModel.type,
                    newModel.verification_code,
                    newModel.uuid,
                ];

                // users_address
                const usersAddressData = [
                    rows.insertId,
                    newModel.country,
                    newModel.state_or_province,
                    newModel.city,
                    newModel.uuid,
                ];

                // console.log('usersAccountsQuery', usersAccountsQuery);
                // console.log('usersAccountsData', usersAccountsData);
                sql.query(usersAccountsQuery, usersAccountsData, (err, rows) => {
                    //ok
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    }
                    // console.log('users_accounts table row inserted with id = ' + rows.insertId);
                    // console.log('usersAccountsQuery', usersAccountsQuery);
                    // console.log('usersAccountsData', usersAccountsData);
                });

                sql.query(usersAddressQuery, usersAddressData, (err, rows) => {
                    //ok
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    }
                    // console.log('users_address table row inserted with id = ' + rows.insertId);
                    // console.log('usersAddressQuery', usersAddressQuery);
                    // console.log('usersAddressData', usersAddressData);
                });

                // users_business
                const usersBusinessData = [
                    rows.insertId,
                    newModel.business_name,
                    newModel.business_email,
                    newModel.business_contact,
                    newModel.business_language_of_communication,
                    newModel.business_tagline,
                    newModel.business_website,
                    newModel.business_social_media_contact_type,
                    newModel.business_social_media_contact_number,
                    newModel.business_address,
                    newModel.business_country,
                    newModel.business_states,
                    newModel.business_city,
                    newModel.uuid,
                ];

                sql.query(usersBusinessQuery, usersBusinessData, function (err, rows) {
                    //ok
                    if (err) {
                        sql.rollback(function () {
                            throw err;
                        });
                    } else {
                        // users_business_characteristics
                        const usersBusinessCharacteristicsData = [
                            rows.insertId,
                            newModel.business_major_category,
                            newModel.business_sub_category,
                            newModel.business_minor_sub_category,
                            newModel.uuid,
                        ];

                        sql.query(usersBusinessCharacteristicsQuery, usersBusinessCharacteristicsData, (err, rows) => {
                            //ok
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
                                        newModel.session.verification_code = newModel.verification_code;
                                        newModel.session.registration_uuid = newModel.uuid;
                                        newModel.session.registration_email_address = newModel.email_or_social_media;
                                        result(null, { id: rows.insertId, ...newModel });
                                    }
                                });
                            }
                            // console.log('users_business_characteristics table row inserted with id = ' + rows.insertId);
                            // console.log('usersBusinessCharacteristicsQuery', usersBusinessCharacteristicsQuery);
                            // console.log('usersBusinessCharacteristicsData', usersBusinessCharacteristicsData);
                        });
                    }
                });
            }
        });
    });
    /* End transaction */
};

module.exports = Model;
