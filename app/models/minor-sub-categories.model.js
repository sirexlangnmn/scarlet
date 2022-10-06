const sql = require('./db.js');

// constructor
const Model = function (model) {
    // some code here
};

Model.getMinorSubCategoriesBySubCategoryId = (id, result) => {
    // console.log('id model:', id);
    sql.query(`SELECT * FROM minor_sub_categories WHERE sub_category_id = ${id}`, (err, res) => {
        // console.log('id model res:', res);
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log('found sub categories: ', res);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: 'not_found' }, null);
    });
};

Model.getMinorSubCategoryTitleById = (id, result) => {
    // console.log('getMinorSubCategoryTitleById model:', id);
    sql.query(`SELECT title FROM minor_sub_categories WHERE id = "${id}"`, (err, res) => {
        //console.log('id model res:', res);
        if (err) {
            //console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log('found minor sub categories title: ', res[0]);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: 'not_found' }, null);
    });
};

Model.getMinorSubCategoriesById = (id, result) => {
    // console.log('getMinorSubCategoriesById model:', id);
    sql.query(`SELECT id, title FROM minor_sub_categories WHERE id = "${id}"`, (err, res) => {
        //console.log('id model res:', res);
        if (err) {
            //console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log('found minor sub categories title: ', res[0]);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: 'not_found' }, null);
    });
};

Model.getMinorSubCategoryByTitle = (title, result) => {
    // console.log('getMinorSubCategoryByTitle model:', id);
    sql.query(`SELECT id, title FROM minor_sub_categories WHERE title = "${title}"`, (err, res) => {
        //console.log('id model res:', res);
        if (err) {
            //console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log('found minor sub categories title: ', res[0]);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: 'not_found' }, null);
    });
};

module.exports = Model;
