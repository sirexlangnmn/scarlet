const sql = require('./db.js');

const Model = function (model) {
    this.email_or_social_media = model.email_or_social_media;
    this.password = model.password;
    this.session = model.session;
};

Model.create = (newModel, result) => {
    //const usersAccountsQuery = `SELECT id, uuid, email_or_social_media, password, type FROM users_accounts WHERE email_or_social_media = "${newModel.email_or_social_media}"`;
    
    const usersAccountsQuery = `SELECT 
    users_accounts.id, 
    users_accounts.uuid, 
    users_accounts.email_or_social_media, 
    users_accounts.password, 
    users_accounts.type, 
    users.first_name, 
    users.last_name,
    users_address.country,
    users_address.state_or_province
    FROM users_accounts
    INNER JOIN users 
    ON users.uuid = users_accounts.uuid 
    INNER JOIN users_address 
    ON users_address.uuid = users_accounts.uuid 
    WHERE users_accounts.email_or_social_media = "${newModel.email_or_social_media}"`;

    sql.query(usersAccountsQuery, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            newModel.session.user = res[0];
            console.log('login res: ',  res);
            result(null, { message: 'found', plainPassword: newModel.password, hashedPassword: res[0].password });
            return;
        } else {
            result(null, { message: 'not found' });
            return;
        }
    });
};

module.exports = Model;
