const sql = require('./db.js');

// constructor
const Tutorial = function (tutorial) {};

Tutorial.getAll = (uuid, result) => {
    let query = 'SELECT * FROM users_business_characteristics';

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

module.exports = Tutorial;
