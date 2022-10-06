const sql = require('./db.js');
const QUERY = require('../query/languages.query.js');

// constructor
const Model = function (model) {
    // this.title = model.title;
    // this.description = model.description;
    // this.published = model.published;
};

Model.getAll = (title, result) => {
    let query = QUERY.SELECT_LANGUAGES;
    // let query = 'SELECT name, code FROM languages';

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    // query += ` ORDER BY identity ASC, name ASC`;

    sql.query(query, (err, res) => {
        if (err) {
            // console.log('error: ', err);
            result(null, err);
            return;
        }

        //console.log('languages: ', res);
        result(null, res);
    });
};

Model.getLanguageNameByCode = (id, result) => {
    //console.log('getLanguageNameByCode model:', id);
    sql.query(`SELECT name FROM languages WHERE code = "${id}"`, (err, res) => {
        //console.log('id model res:', res);
        if (err) {
            //console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log('found region of opertaion: ', res[0]);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: 'not_found' }, null);
    });
};

module.exports = Model;
