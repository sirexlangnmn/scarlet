const sql = require('./db.js');
// const USERS_BUSINESS_MEDIAS = require('../query/users_business_medias.query.js');

// constructor
const Model = function (model) {};

Model.getCompaniesRelatedToCurrentUser = (param, result) => {
    // console.log('selection.model.js | Model.getCompaniesRelatedToCurrentUser | parameters: ', param);
    sql.query('SELECT id FROM trade_categories WHERE status = 1', (err, res) => {
        // console.log('TRADE_CATEGORIES_ID: ', res[0].id);
        let tradeCategoryId = res[0].id;
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        } else {

            sql.query(
                `SELECT COUNT(users_business.id) AS id_count 
                FROM users_business JOIN users_business_characteristics 
                ON users_business.uuid = users_business_characteristics.uuid 
                JOIN users_business_medias 
                ON users_business.uuid = users_business_medias.uuid 
                WHERE users_business_characteristics.business_major_category = '${tradeCategoryId}' 
                AND users_business.country_of_operation = '${param.country}'
                AND users_business_medias.banner != ''
                OR users_business_medias.banner != null`,
                (err, res) => {
                    if (err) {
                        console.log('error: ', err);
                        result(null, err);
                        return;
                    } else {
                        let randomNumber = Math.floor(1 + Math.random() * res[0].id_count);

                        // console.log('RANDOM_NUMBER: ', randomNumber);
                        sql.query(
                            `SELECT 
                            users_business.id, 
                            users_business.business_name, 
                            users_business.business_tagline,
                            users_business.business_website,
                            users_business.business_email,
                            users_business.business_contact,
                            users_business.business_language_of_communication,
                            users_business.business_social_media_contact_type,
                            users_business.business_social_media_contact_number,
                            users_business.business_address,
                            users_business.business_country,
                            users_business.business_states,
                            users_business.business_city,
                            users_business.region_of_operation,
                            users_business.country_of_operation,
                            users_business.states_of_operation,
                            users_business.city_of_operation,
                            users_business.communicator,
                            users_business.uuid,
                            users_business_characteristics.business_industry_belong_to,
                            users_business_characteristics.business_major_category,
                            users_business_characteristics.business_sub_category,
                            users_business_characteristics.business_minor_sub_category,
                            users_business_characteristics.business_scale,
                            users_business_medias.banner
                            FROM users_business 
                            JOIN users_business_characteristics 
                            ON users_business.uuid = users_business_characteristics.uuid 
                            JOIN users_business_medias 
                            ON users_business.uuid = users_business_medias.uuid 
                            WHERE users_business_characteristics.business_major_category = '${tradeCategoryId}' 
                            AND users_business.country_of_operation LIKE '%${param.country}%'
                            AND users_business_medias.banner != ''
                            OR users_business_medias.banner != null
                            ORDER BY RAND()  
                            LIMIT 50`,
                            (err, res) => {
                                // console.log('BUSINESS_RETRIEVE: ', res);
                                if (err) {
                                    console.log('error: ', err);

                                    result(null, err);
                                    return;
                                } else {
                                    result(null, res);
                                }
                            },
                        );
                    }
                },
            );
        }
    });
};

Model.getAllBySearchParameter = (param, result) => {
    // console.log('selection.model.js | Model.getAllBySearchParameter | parameters: ', param);
    // console.log('selection.model.js | Model.getAllBySearchParameter | param.uuid: ', param.uuid);
    console.log(
        'selection.model.js | Model.getAllBySearchParameter | param.regionOfOperationCode: ',
        param.regionOfOperationCode,
    );
    console.log('selection.model.js | Model.getAllBySearchParameter | param.countryCode: ', param.countryCode);
    console.log('selection.model.js | Model.getAllBySearchParameter | param.selectionState: ', param.selectionState);
    console.log('selection.model.js | Model.getAllBySearchParameter | param.selectionCity: ', param.selectionCity);
    console.log('selection.model.js | Model.getAllBySearchParameter | param.language: ', param.language);
    console.log('selection.model.js | Model.getAllBySearchParameter | param.business_scale: ', param.business_scale);
    console.log('selection.model.js | Model.getAllBySearchParameter | param.trade_categories: ', param.trade_categories);
    console.log('selection.model.js | Model.getAllBySearchParameter | param.sub_categories: ', param.sub_categories);
    console.log(
        'selection.model.js | Model.getAllBySearchParameter | param.minor_sub_categories: ',
        param.minor_sub_categories,
    );
    console.log(
        'selection.model.js | Model.getAllBySearchParameter | param.product_service_input: ',
        param.product_service_input,
    );
    console.log('selection.model.js | Model.getAllBySearchParameter | param.company_name_input: ', param.company_name_input);

    let query = `SELECT 
        users_business.id, 
        users_business.business_name, 
        users_business.business_tagline,
        users_business.business_website,
        users_business.business_email,
        users_business.business_contact,
        users_business.business_language_of_communication,
        users_business.business_social_media_contact_type,
        users_business.business_social_media_contact_number,
        users_business.business_address,
        users_business.business_country,
        users_business.business_states,
        users_business.business_city,
        users_business.region_of_operation,
        users_business.country_of_operation,
        users_business.states_of_operation,
        users_business.city_of_operation,
        users_business.communicator,
        users_business.uuid,
        users_business_characteristics.business_industry_belong_to,
        users_business_characteristics.business_major_category,
        users_business_characteristics.business_sub_category,
        users_business_characteristics.business_minor_sub_category,
        users_business_characteristics.business_scale,
        users_business_medias.banner
        FROM users_business 
        JOIN users_business_characteristics 
        ON users_business.uuid = users_business_characteristics.uuid 
        JOIN users_business_medias 
        ON users_business.uuid = users_business_medias.uuid 
        WHERE users_business_medias.banner != ''`;

    if (param.trade_categories) {
        query += ` AND users_business_characteristics.business_major_category = '${param.trade_categories}'`;
        //query += `users_business_characteristics.business_major_category = '${param.trade_categories}'`;
        
    }
    if (param.regionOfOperationCode) {
        query += `AND users_business.region_of_operation LIKE '%${param.regionOfOperationCode}%'`;
    }
    if (param.countryCode) {
        // query += ` AND users_business.country_of_operation = '${param.countryCode}'`;
        query += ` AND users_business.country_of_operation LIKE '%${param.countryCode}%'`;
    }
    if (param.selectionState) {
        query += `AND users_business.states_of_operation = '${param.selectionState}'`;
    }
    if (param.selectionCity) {
        query += `AND users_business.city_of_operation = '${param.selectionCity}'`;
    }
    if (param.language) {
        query += ` AND users_business.business_language_of_communication LIKE '%${param.language}%'`;
    }
    if (param.business_scale) {
        query += ` AND users_business_characteristics.business_scale = '${param.business_scale}'`;
    }
    if (param.sub_categories) {
        query += ` AND users_business_characteristics.business_sub_category = '${param.sub_categories}'`;
    }
    if (param.minor_sub_categories) {
        query += ` AND users_business_characteristics.business_minor_sub_category = '${param.minor_sub_categories}'`;
    }
    if (param.product_service_input) {
        query += ` AND users_business_characteristics.business_industry_belong_to LIKE '%${param.product_service_input}%'`;
    }
    if (param.company_name_input) {
        query += ` AND users_business.business_name LIKE '%${param.company_name_input}%'`;
    }

    // query += ` AND users_business_medias.banner != ''`;
    query += ` ORDER BY RAND () LIMIT 50`;

    sql.query(query, (err, res) => {
        console.log('BUSINESS_RETRIEVE: ', res);
        if (err) {
            console.log('error: ', err);

            result(null, err);
            return;
        } else {
            console.log('res: ', res);
            result(null, res);
        }
    });
};


Model.getRandomCompanies = (result) => {
    // console.log('selection.model.js | Model.getRandomCompanies | parameters: ', param);
    // console.log('RANDOM_NUMBER: ', randomNumber);
    sql.query(
        `SELECT 
        users_business.id, 
        users_business.business_name, 
        users_business.business_tagline,
        users_business.business_website,
        users_business.business_email,
        users_business.business_contact,
        users_business.business_language_of_communication,
        users_business.business_social_media_contact_type,
        users_business.business_social_media_contact_number,
        users_business.business_address,
        users_business.business_country,
        users_business.business_states,
        users_business.business_city,
        users_business.region_of_operation,
        users_business.country_of_operation,
        users_business.states_of_operation,
        users_business.city_of_operation,
        users_business.communicator,
        users_business.uuid,
        users_business_characteristics.business_industry_belong_to,
        users_business_characteristics.business_major_category,
        users_business_characteristics.business_sub_category,
        users_business_characteristics.business_minor_sub_category,
        users_business_characteristics.business_scale,
        users_business_medias.banner
        FROM users_business 
        JOIN users_business_characteristics 
        ON users_business.uuid = users_business_characteristics.uuid 
        JOIN users_business_medias 
        ON users_business.uuid = users_business_medias.uuid 
        WHERE users_business_characteristics.business_major_category = 1
        AND users_business_medias.banner != ''
        ORDER BY RAND()  
        LIMIT 50`,
        (err, res) => {
            // console.log('BUSINESS_RETRIEVE: ', res);
            if (err) {
                console.log('error: ', err);

                result(null, err);
                return;
            } else {
                result(null, res);
            }
        },
    );
};

module.exports = Model;
