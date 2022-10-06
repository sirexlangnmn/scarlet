const sql = require('./db.js');

// constructor
const Tutorial = function (tutorial) {};

Tutorial.getAll = (uuid, result) => {
    let query = 'SELECT * FROM users_accounts';

    if (uuid) {
        query += ` WHERE uuid = "${uuid}"`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        // console.log('users_accounts: ', res);
        result(null, res);
    });
};

Tutorial.emailVerification = (registration_uuid, verification_code, inputCode, result) => {
    // console.log('user-accounts.model.js registration_uuid:', registration_uuid);
    // console.log('user-accounts.model.js verification_code:', verification_code);
    // console.log('user-accounts.model.js inputCode:', inputCode);
    // console.log('user-accounts.model.js typeof registration_uuid:', typeof registration_uuid);
    // console.log('user-accounts.model.js typeof verification_code:', typeof verification_code);
    // console.log('user-accounts.model.js typeof inputCode:', typeof req.body.inputCode);
    // console.log('user-accounts.model.js typeof Number inputCode:', typeof Number(inputCode));
    // console.log('user-accounts.model.js typeof Number verification_code:', typeof Number(verification_code));

    let query = 'SELECT verification_code FROM users_accounts';

    if (registration_uuid) {
        query += ` WHERE uuid = "${registration_uuid}"`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        } else {
            if (res[0].verification_code == inputCode) {
                const usersAccountsData = [1, registration_uuid];
                const usersAccountsQuery = `UPDATE users_accounts SET status = ? WHERE uuid = ?`;

                sql.query(usersAccountsQuery, usersAccountsData, (err, res) => {
                    if (err) {
                        console.log('error: ', err);
                        result(null, err);
                        return;
                    } else {
                        // result(null, { id: res.insertId });
                        result(null, 'valid');
                    }
                });
            } else {
                result(null, 'not_valid');
            }
        }

        // console.log('users_accounts: ', res);
        // result(null, res);
    });
};

module.exports = Tutorial;
