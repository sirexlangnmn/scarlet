const sql = require('./db.js');
const QUERY = require('../query/trade_categories.query.js');

// constructor
const Model = function (model) {
    //some code here
};

Model.getTradeCategoryTitleById = (id, result) => {
    //console.log('getTradeCategoryTitleById model:', id);
    // sql.query(`SELECT title FROM trade_categories WHERE id = "${id}"`, (err, res) => { // old way
        sql.query(QUERY.SELECT_TRADE_CATEGORY_TITLE_BY_ID, [id], (err, res) => { // new way
        //console.log('id model res:', res);
        if (err) {
            //console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log('found trade categories title: ', res[0]);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: 'not_found' }, null);
    });
};


Model.getTradeCategoriesForToday = (title, result) => {
    sql.query(QUERY.SELECT_TRADE_CATEGORIES_FOR_TODAY, (err, res) => {
        if (err) {
            //console.log('error: ', err);
            result(null, err);
            return;
        }

        //console.log('trade_categories: ', res);
        result(null, res);
    });
};

module.exports = Model;
