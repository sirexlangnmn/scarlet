const sql = require('./db.js');

const TRADERS_VISITORS = require('../query/traders_visitors.query.js');
const USERS_ACCOUNTS = require('../query/users_accounts.query.js');
const USERS_ADDRESS = require('../query/users_address.query.js');
const USERS_BUSINESS = require('../query/users_business.query.js');
const USERS_BUSINESS_CHARACTERISTICS = require('../query/users_business_characteristics.query.js');

const Model = function (model) {
    this.uuid = model.uuid;
    this.session = model.session;
};



Model.getCurrentVisitor = (newModel, result) => {

    let trader_uuid = newModel.uuid;
    sql.query(TRADERS_VISITORS.SELECT_CURRENT_VISITOR, [trader_uuid], (err, res) => {
        let visitor_uuid = res[0].visitor_id;
        newModel.session.current_visitor_date_created = res[0].date_created;

        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        } else {

            sql.query(USERS_ADDRESS.ADDRESS, [visitor_uuid], (err, res) => {
                if (err) {
                    console.log('error: ', err);
                    return;
                } else {
                    newModel.session.current_visitor_address = res[0];
                }
            });

            sql.query(USERS_BUSINESS.LANGUAGE, [visitor_uuid], (err, res) => {
                if (err) {
                    console.log('error: ', err);
                    return;
                } else {
                    newModel.session.current_visitor_language = res[0];
                    //console.log('session.current_visitor_language: ', res[0]);
                }
            });
            
            sql.query(USERS_ACCOUNTS.SELECT_CURRENT_VISITOR, [visitor_uuid], (err, res) => {
                if (err) {
                    console.log('error: ', err);
                    result(null, err);
                    return;
                } else {
                    newModel.session.current_visitor = res[0];
                    result(null, res);
                }
            });
        }
    });
};


Model.connectVisitorAndTrader = (newModel, result) => {

    const visitorTraderObject = {
        visitor_id:  newModel.uuid,
        trader_id:  newModel.trader_uuid,
        date_created: date_time()
    };

    sql.query(TRADERS_VISITORS.CREATE, Object.values(visitorTraderObject), function (err, rows) {
        if (err) {
            sql.rollback(function () {
                throw err;
            });
        } else {}
            result(null, { id: rows.insertId, ...newModel });
        });
};

// Model.getCurrentTrader = (newModel, result) => {

//     let trader_uuid = newModel.trader_uuid;
//     console.log(`Model.getCurrentTrader:`, trader_uuid);
//     newModel.session.current_trader_date_created = date_time();

//     sql.query(USERS_ADDRESS.ADDRESS, [trader_uuid], (err, res) => {
//         if (err) {
//             console.log('error: ', err);
//             return;
//         } else {
//             newModel.session.current_trader_address = res[0];
//         }
//     });

//     sql.query(USERS_BUSINESS.LANGUAGE, [trader_uuid], (err, res) => {
//         if (err) {
//             console.log('error: ', err);
//             return;
//         } else {
//             newModel.session.current_trader_language = res[0];
//             //console.log('session.current_visitor_language: ', res[0]);
//         }
//     });
    
//     sql.query(USERS_ACCOUNTS.SELECT_CURRENT_VISITOR, [trader_uuid], (err, res) => {
//         if (err) {
//             console.log('error: ', err);
//             result(null, err);
//             return;
//         } else {
//             newModel.session.current_trader = res[0];
//             console.log('newModel.session.current_trader: ', res[0]);
//             result(null, res);
//         }
//     });
      
// };


Model.getCurrentTrader = (newModel, result) => {

    let trader_uuid = newModel.trader_uuid;
    console.log(`Model.getCurrentTrader:`, trader_uuid);
    newModel.session.current_trader_date_created = date_time();


    sql.query(USERS_BUSINESS_CHARACTERISTICS.BUSINESS_CHARACTERISTIC, [trader_uuid], (err, res) => {
        if (err) {
            console.log('error: ', err);
            return;
        } else {
            newModel.session.current_trader_business_characteristics = res[0];
            //console.log('session.current_trader_business_characteristics: ', res[0]);

            let majorCategoryId = res[0].business_major_category;
            let subCategoryId = res[0].business_sub_category;
            let minorSubCategoryId = res[0].business_minor_sub_category;

            if (majorCategoryId) {
                sql.query(`SELECT title FROM trade_categories WHERE id = "${majorCategoryId}"`, (err, res) => {
                    if (err) {
                        console.log('error: ', err);
                    }
            
                    if (res) {
                        newModel.session.current_trader_major_category = res[0].title;
                        //console.log('session.current_trader_major_category: ', res[0].title);
                    }
                });
            }

            if (subCategoryId) {
                sql.query(`SELECT title FROM sub_categories WHERE id = "${subCategoryId}"`, (err, res) => {
                    if (err) {
                        console.log('error: ', err);
                    }
            
                    if (res) {
                        newModel.session.current_trader_sub_category = res[0].title;
                        //console.log('session.current_trader_sub_category: ', res[0].title);
                    }
                });
            }

            if (minorSubCategoryId) {
                sql.query(`SELECT title FROM minor_sub_categories WHERE id = "${minorSubCategoryId}"`, (err, res) => {
                    if (err) {
                        console.log('error: ', err);
                    }
            
                    if (res) {
                        newModel.session.current_trader_minor_sub_category = res[0].title;
                        //console.log('session.current_trader_minor_sub_category: ', res[0].title);
                    }
                });
            }
            
            sql.query(USERS_BUSINESS.DETAILS, [trader_uuid], (err, res) => {
                if (err) {
                    console.log('error: ', err);
                    result(null, err);
                    return;
                } else {

                    newModel.session.current_trader = res[0];
                    // console.log('newModel.session.current_trader: ', res[0]);
                    result(null, res);

                }
            });
        }
    });

    
      
};


function date_time() {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // // prints date in YYYY-MM-DD format
    // console.log(year + "-" + month + "-" + date);

    // // prints date & time in YYYY-MM-DD HH:MM:SS format
    // console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
}



module.exports = Model;
