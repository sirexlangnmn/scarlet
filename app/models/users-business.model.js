const sql = require('./db.js');
const { v4: uuidV4 } = require('uuid');
const USERS_BUSINESS = require('../query/users_business.query.js');

// constructor
const Tutorial = function (tutorial) {};

Tutorial.getAll = (uuid, result) => {
    let query = 'SELECT * FROM users_business';

    if (uuid) {
        query += ` WHERE uuid = "${uuid}"`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        // console.log('users_business: ', res);
        result(null, res);
    });
};

Tutorial.getBusinessLocationCode = (uuid, result) => {
    let query = 'SELECT business_country, business_states, business_city, region_of_operation, country_of_operation, country_for_state, states_of_operation, city_of_operation FROM users_business';

    if (uuid) {
        query += ` WHERE uuid = "${uuid}"`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        // console.log('users_business: ', res);
        result(null, res);
    });
};

Tutorial.getAllPublished = (result) => {
    sql.query('SELECT * FROM users_business WHERE status=1', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        //console.log('SELECT * FROM users_business WHERE status=1: ', res);
        result(null, res);
    });
};

Tutorial.getCommunicator = (params, result) => {
    // console.log('room_id: ', params.room_id);
    // console.log('call_id: ', params.call_id);
    // console.log('section_id: ', params.section_id);
    // console.log('peer_id: ', params.peer_id);
    console.log('link2: ', params.link);


    sql.query(`SELECT communicator FROM users_business WHERE communicator = "${params.link}"`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length > 0) {
            console.log('found link: ', res[0]);
            result(null, { message: 'valid'});
            return;
        }

        // not found Tutorial with the id
        result({ kind: 'not_found' }, null);
    });

    
};


Tutorial.createCommunicatorLink = (uuid, result) => {
    const communicator_link = uuidV4();
    const linkObject = {
        communicator: communicator_link,
    };

    sql.query(USERS_BUSINESS.UPDATE_COMMUNICATOR_LINK, [...Object.values(linkObject), uuid], (err, rows) => {
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
                    result(null, { id: rows.insertId, ...linkObject });
                }
            });
        }             
    });
};

module.exports = Tutorial;
