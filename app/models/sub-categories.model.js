const sql = require('./db.js');
const QUERY = require('../query/sub_categories.query.js');

// constructor
const Model = function (model) {
    // some code here
};

Model.getSubCategoriesByTradeCategoryId = (id, result) => {
    //console.log('id model:', id);
    // sql.query(`SELECT * FROM sub_categories WHERE trade_category_id = ${id}`, (err, res) => { // old way
    sql.query(QUERY.SELECT_SUB_CATEGORIES, [id], (err, res) => { // new way
        //console.log('Model.getSubCategoriesByTradeCategoryId id model res:', res);
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log('found sub categories: ', res[0]);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: 'not_found' }, null);
    });
};

Model.getSubCategoryTitleById = (id, result) => {
    // console.log('getSubCategoryTitleById model:', id);
    sql.query(`SELECT title FROM sub_categories WHERE id = "${id}"`, (err, res) => {
        //console.log('id model res:', res);
        if (err) {
            //console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log('found sub categories title: ', res[0]);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: 'not_found' }, null);
    });
};

module.exports = Model;
