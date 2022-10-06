const sql = require('./db.js');

// constructor
const Tutorial = function (tutorial) {};

Tutorial.getAll = (uuid, result) => {
    let query = 'SELECT video, video_thumbnail, video_title, video_description FROM users_business_medias';

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

module.exports = Tutorial;
