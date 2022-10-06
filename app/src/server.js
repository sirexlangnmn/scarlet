/*

http://patorjk.com/software/taag/#p=display&f=ANSI%20Regular&t=Server

███████ ███████ ██████  ██    ██ ███████ ██████  
██      ██      ██   ██ ██    ██ ██      ██   ██ 
███████ █████   ██████  ██    ██ █████   ██████  
     ██ ██      ██   ██  ██  ██  ██      ██   ██ 
███████ ███████ ██   ██   ████   ███████ ██   ██       intended for trial                                   

dependencies: {
    compression     : https://www.npmjs.com/package/compression
    cors            : https://www.npmjs.com/package/cors
    dotenv          : https://www.npmjs.com/package/dotenv
    express         : https://www.npmjs.com/package/express
    socket.io       : https://www.npmjs.com/package/socket.io
    swagger         : https://www.npmjs.com/package/swagger-ui-express
    uuid            : https://www.npmjs.com/package/uuid
    yamljs          : https://www.npmjs.com/package/yamljs
    ejs             : https://www.npmjs.com/package/ejs
    mysql           : https://www.npmjs.com/package/mysql
    body-parser     : https://www.npmjs.com/package/body-parser
    bcrypt          : https://www.npmjs.com/package/bcrypt
    express-flash   : https://www.npmjs.com/package/express-flash
    express-session : https://www.npmjs.com/package/express-session
    method-override : https://www.npmjs.com/package/method-override
    nodemon         : https://www.npmjs.com/package/nodemon
    passport        : https://www.npmjs.com/package/passport
    passport-local  : https://www.npmjs.com/package/passport-local
    jsonwebtoken    : https://www.npmjs.com/package/jsonwebtoken
    pdfkit          : https://www.npmjs.com/package/pdfkit
}

*/

'use strict'; // https://www.w3schools.com/js/js_strict.asp

require('dotenv').config();

const { Server } = require('socket.io');
const http = require('http');
const https = require('https');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); // Enable All CORS Requests for all origins
app.use(compression()); // Compress all HTTP responses using GZip

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

const isHttps = false; // must be the same to client.js isHttps
const port = process.env.PORT; // must be the same to client.js signalingServerPort

let io, server, host;

if (isHttps) {
    const fs = require('fs');
    const options = {
        key: fs.readFileSync(path.join(__dirname, '../ssl/key.pem'), 'utf-8'),
        cert: fs.readFileSync(path.join(__dirname, '../ssl/cert.pem'), 'utf-8'),
    };
    server = https.createServer(options, app);
    io = new Server().listen(server);
    host = 'https://' + 'localhost' + ':' + port;
} else {
    server = http.createServer(app);
    io = new Server().listen(server);
    host = 'http://' + 'localhost' + ':' + port;
}

const api_key_secret = process.env.API_KEY_SECRET || 'all_world_trade_default_secret';

require('../routes/index.js')(app);
require('../routes/password.js')(app);
require('../routes/upload-file.js')(app);
require('../routes/forgot-password.js')(app);


const pdfService = require('../service/pdf-service');
const pdfServiceForTrader = require('../service/pdf-trader');


const Logger = require('./Logger');
const log = new Logger('server');

// Use all static files from the public folder
app.use(express.static(path.join(__dirname, '../../', 'public')));

// Api parse body data as json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// Remove trailing slashes in url handle bad requests
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        log.debug('Request Error', {
            header: req.headers,
            body: req.body,
            error: err.message,
        });
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    }
    if (req.path.substr(-1) === '/' && req.path.length > 1) {
        let query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// home
app.get(['/'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
            country: req.session.user.country,
            state_or_province: req.session.user.state_or_province,
        };
        
        res.render(path.join(__dirname, '../../', 'public/view/home/index'));
    }
    
});



app.get(['/template'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
            country: req.session.user.country,
            state_or_province: req.session.user.state_or_province,
        };
        
        res.render(path.join(__dirname, '../../', 'public/view/home/template'));
    }
});

// selections
app.get(['/selection'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };
        
        res.render(path.join(__dirname, '../../', 'public/view/selection/index'));
    }
});

app.get(['/profile'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log("sessionData: ", sessionData);

        if (req.session.user.type == 1) {
            res.render(path.join(__dirname, '../../', 'public/view/profile/traders'), {
                data: sessionData,
            });
        }
        if (req.session.user.type == 2) {
            res.render(path.join(__dirname, '../../', 'public/view/profile/large-scale-company'), {
                data: sessionData,
            });
        }
        if (req.session.user.type == 3) {
            res.render(path.join(__dirname, '../../', 'public/view/profile/medium-scale-company'), {
                data: sessionData,
            });
        }
        if (req.session.user.type == 4) {
            res.render(path.join(__dirname, '../../', 'public/view/profile/small-scale-company'), {
                data: sessionData,
            });
        }
        
    }
});

app.get(['/profile2'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log(sessionData);

        res.render(path.join(__dirname, '../../', 'public/view/profile/edit'), {
            data: sessionData,
        });
    }
});

const { readFileSync } = require('fs');
const countriesData = readFileSync(path.join(__dirname, '../../', 'public/assets/json/countries.json'));
const statesData = readFileSync(path.join(__dirname, '../../', 'public/assets/json/states.json'));
const citiesData = readFileSync(path.join(__dirname, '../../', 'public/assets/json/cities.json'));


app.get(['/download-current-visitor-data'], (req, res) => {
   
    let countries = JSON.parse(countriesData);
    let states = JSON.parse(statesData);
    let cities = JSON.parse(citiesData);

    let visitorCountryCode = req.session.current_visitor_address.country;
    let visitorStateCode = req.session.current_visitor_address.state_or_province;
    let visitorCityCode = req.session.current_visitor_address.city;
    let country = visitorCountryCode ? countries.filter((d) => d.iso2 == visitorCountryCode) : 'N/A';
    let state = visitorStateCode ? states.filter((d) => d.id == visitorStateCode) : 'N/A';
    let city = visitorCityCode ? cities.filter((d) => d.id == visitorCityCode) : 'N/A';
    let socialMediaContactType = displayBusinessSocialMediaContactType(req.session.current_visitor.social_media_contact_type);

    const visitorData = {
        email: req.session.current_visitor.email_or_social_media,
        contact_number: req.session.current_visitor.contact_number,
        first_name: req.session.current_visitor.first_name,
        last_name: req.session.current_visitor.last_name,
        middle_name: req.session.current_visitor.middle_name,
        date_created: req.session.current_visitor_date_created,
        country: country[0].name,
        state: state[0].name,
        city: city[0].name,
        language: req.session.current_visitor_language.business_language_of_communication,
        social_media_contact_type: socialMediaContactType
    };
    
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=data_of_current_visitor.pdf`,
    });
    pdfService.buildPDF(
        (chunk) => stream.write(chunk),
        () => stream.end(),
        visitorData
    );
});


app.get(['/download-current-trader-data'], (req, res) => {
   
    const sessionData = req.session;
    let businessName, businessWebsite, businessEmail, businessContact, businessAddress;
    let tradeCategory, businessSubCategory, businessSubCategoryStr, businessMinorsubCategoryStr, businessMinorsubCategory, tags, businessScale;
    let traderCountryCode, visitorStateCode, visitorCityCode, countries, states, cities, country, state, city;
    let regionOfOperation, countryOfOperation, statesOfOperation;

    countries = JSON.parse(countriesData);
    states = JSON.parse(statesData);
    cities = JSON.parse(citiesData);

    traderCountryCode = sessionData.current_trader.business_country;
    visitorStateCode = sessionData.current_trader.business_states;
    visitorCityCode = sessionData.current_trader.business_city;
    country = traderCountryCode ? countries.filter((d) => d.iso2 == traderCountryCode) : 'N/A';
    state = visitorStateCode ? states.filter((d) => d.id == visitorStateCode) : 'N/A';
    city = visitorCityCode ? cities.filter((d) => d.id == visitorCityCode) : 'N/A';
    
    businessName = sessionData.current_trader.business_name;
    businessWebsite = sessionData.current_trader.business_website;
    businessEmail = sessionData.current_trader.business_email;
    businessContact = sessionData.current_trader.business_contact;
    businessAddress = sessionData.current_trader.business_address;
     
    tradeCategory = sessionData.current_trader_major_category;

    businessSubCategoryStr = sessionData.current_trader_business_characteristics.business_sub_category_str;
    businessSubCategory = sessionData.current_trader_sub_category;
    businessSubCategory = businessSubCategory ? businessSubCategory : businessSubCategoryStr;

    businessMinorsubCategoryStr = sessionData.current_trader_business_characteristics.business_minor_sub_category_str;
    businessMinorsubCategory = sessionData.current_trader_minor_sub_category;
    businessMinorsubCategory = businessMinorsubCategory ? businessMinorsubCategory : businessMinorsubCategoryStr;

    tags = sessionData.current_trader_business_characteristics.business_industry_belong_to;
    tags = tags ? formattingBusinessTags(tags) : 'N/A'; 
    businessScale = sessionData.current_trader_business_characteristics.business_scale;
    businessScale = businessScale ? formattingBusinessScale(businessScale) : 'N/A';

    regionOfOperation = sessionData.current_trader.region_of_operation;
    regionOfOperation = regionOfOperation ? formattingBusinessTags(regionOfOperation) : 'N/A';
    countryOfOperation = sessionData.current_trader.country_of_operation;
    countryOfOperation = countryOfOperation ? formattedCountryOfOperation(countryOfOperation, countriesData) : 'N/A';    
    statesOfOperation = sessionData.current_trader.states_of_operation;
    statesOfOperation = statesOfOperation ? states.filter((d) => d.id == statesOfOperation) : 'N/A';

    let date_created = sessionData.current_trader_date_created;

    const traderData = {
        business_name: businessName,
        business_website: businessWebsite,
        business_email: businessEmail,
        business_contact: businessContact,
        business_address: businessAddress,
        business_country: country[0].name,
        business_states: state[0].name,
        business_city: city[0].name,
        trade_categories: tradeCategory,
        sub_categories: businessSubCategory,
        minor_sub_categories: businessMinorsubCategory,
        tags: tags,
        businessScale: businessScale,
        region_of_operation: regionOfOperation,
        country_of_operation: countryOfOperation,
        state_of_operation: statesOfOperation[0].name,
        date_created: date_created
    };
    

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=data_of_current_trader-${businessName}.pdf`,
    });
    pdfServiceForTrader.buildPDF(
        (chunk) => stream.write(chunk),
        () => stream.end(),
        traderData
    );
});

function formattedCountryOfOperation(string, countriesData) {
    let countries = JSON.parse(countriesData);
    let value = [];

    if (string) {
        let data = string.split(','); 
        for (var i = 0; i < data.length; i++) {
            let country = countries.filter((d) => d.iso2 == data[i]);
            value.push(" " + country[0].name);
        }
        
        return value;
    } else {
        return 'N/A';
    }
}

function displayBusinessSocialMediaContactType(value) {
    let filtered;
    let jsonObj =
        '{ "socialMediaContactType" : [' +
        '{ "id":"1" , "title":"Viber" },' +
        '{ "id":"2" , "title":"Wechat" },' +
        '{ "id":"3" , "title":"Whatsapp" } ]}';

    const parsedObj = JSON.parse(jsonObj);
    let data = parsedObj.socialMediaContactType;

    filtered = data.filter((d) => d.id == value);
    return filtered[0].title;
}

function formattingBusinessTags(string) {
    let value = [];
    if (string) {
        let data = string.split(',');
        for (var i = 0; i < data.length; i++) {
            value.push(" " + data[i]);
        }
        return value;
    } else {
        return 'N/A';
    }
}

function formattingBusinessScale(id) {
    let value;

    switch (id) {
        case '1':
            value = 'Small Scale';
            break;
        case '2':
            value = 'Medium Scale';
            break;
        case '3':
            value = 'Large Scale';
            break;
        default:
            value = 'N/A';
    }

    return value;
}


app.get(['/edit-traders-profile'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log(sessionData);

        res.render(path.join(__dirname, '../../', 'public/view/profile/edit-traders'), {
            data: sessionData,
        });
    }
});

app.get(['/edit-small-scale-profile'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log(sessionData);

        res.render(path.join(__dirname, '../../', 'public/view/profile/edit-small-scale-company'), {
            data: sessionData,
        });
    }
});


app.get(['/edit-medium-scale-profile'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log(sessionData);

        res.render(path.join(__dirname, '../../', 'public/view/profile/edit-medium-scale-company'), {
            data: sessionData,
        });
    }
});

app.get(['/edit-large-scale-profile'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        console.log(sessionData);

        res.render(path.join(__dirname, '../../', 'public/view/profile/edit-large-scale-company'), {
            data: sessionData,
        });
    }
});

// registration
app.get(['/registration-for-small-scale-company'], (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/registration/small-scale-company'));
});

// registration
app.get(['/registration-for-medium-scale-company'], (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/registration/medium-scale-company'));
});

// registration
app.get(['/registration-for-large-scale-company'], (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/registration/large-scale-company'));
});

// registration
app.get(['/traders-registration'], (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/registration/traders'));
});


app.get(['/upgrade-plan'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        res.render(path.join(__dirname, '../../', 'public/view/upgrade/index'), {
            data: sessionData,
        });
    }
});


app.get(['/upgrade-to-medium-scale'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        res.render(path.join(__dirname, '../../', 'public/view/upgrade/medium-scale-company'), {
            data: sessionData,
        });
    }
});

app.get(['/upgrade-to-large-scale'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        res.render(path.join(__dirname, '../../', 'public/view/upgrade/large-scale-company'), {
            data: sessionData,
        });
    }
});

app.get(['/upgrade-to-traders'], (req, res) => {
    if (req.session.user === undefined) {
        res.render(path.join(__dirname, '../../', 'public/view/login/index'));
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };

        res.render(path.join(__dirname, '../../', 'public/view/upgrade/traders'), {
            data: sessionData,
        });
    }
});


// email-verification
app.get(['/email-verification'], (req, res) => {
    console.log('req.session sa server email-verification');
    console.log(req.session.verification_code);
    console.log(req.session.registration_uuid);
    console.log(req.session.registration_email_address);
    
    res.render(path.join(__dirname, '../../', 'public/view/verification/email-verification'), {registration_email_address: req.session.registration_email_address});
});

// for test
// app.get(['/email-verification'], (req, res) => {
//     console.log('req.session sa server email-verification');
//     res.render(path.join(__dirname, '../../', 'public/view/verification/email-verification'), {registration_email_address: "potolinfederex03@gmail.com"});
// });

app.get(['/login'], (req, res) => {
    res.render(path.join(__dirname, '../../', 'public/view/login/index'));
});


app.get(['/terms-and-conditions'], (req, res) => {
    if (req.session.user === undefined) {
        const sessionData = {
            id: null,
            uuid: null,
            type: null,
            first_name: null,
            last_name: null,
            email: null,
        };
    
        res.render(path.join(__dirname, '../../', 'public/view/legal/terms-and-conditions'), {
            data: sessionData,
        });
        
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };
    
        res.render(path.join(__dirname, '../../', 'public/view/legal/terms-and-conditions'), {
            data: sessionData,
        });
        
    }
});

app.get(['/data-privacy-notice'], (req, res) => {
    if (req.session.user === undefined) {
        const sessionData = {
            id: null,
            uuid: null,
            type: null,
            first_name: null,
            last_name: null,
            email: null,
        };
    
        res.render(path.join(__dirname, '../../', 'public/view/legal/data-privacy-notice'), {
            data: sessionData,
        });
        
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };
    
        res.render(path.join(__dirname, '../../', 'public/view/legal/data-privacy-notice'), {
            data: sessionData,
        });
        
    }
});

app.get(['/cookie-policy'], (req, res) => {
    if (req.session.user === undefined) {
        const sessionData = {
            id: null,
            uuid: null,
            type: null,
            first_name: null,
            last_name: null,
            email: null,
        };
    
        res.render(path.join(__dirname, '../../', 'public/view/legal/cookie-policy'), {
            data: sessionData,
        });
        
    } else {
        const sessionData = {
            id: req.session.user.id,
            uuid: req.session.user.uuid,
            type: req.session.user.type,
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email_or_social_media,
        };
    
        res.render(path.join(__dirname, '../../', 'public/view/legal/cookie-policy'), {
            data: sessionData,
        });
        
    }

});




app.get('/logout', function(req, res, next) {
    // remove the req.user property and clear the login session
    //req.logout();

    req.session.destroy();
  
    // destroy session data
    req.session = null;
  
    // redirect to homepage
    res.redirect('/login');
  });

// // API
// app.get("/api-test", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });

// app.get("/get-", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });



// not match any of page before, so 404 not found
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../../', 'public/view/404.html'));
// });

server.listen(port, null, () => {
    log.debug(
        `%c

	███████╗██╗ ██████╗ ███╗   ██╗      ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
	██╔════╝██║██╔════╝ ████╗  ██║      ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
	███████╗██║██║  ███╗██╔██╗ ██║█████╗███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
	╚════██║██║██║   ██║██║╚██╗██║╚════╝╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
	███████║██║╚██████╔╝██║ ╚████║      ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
	╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝      ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝ started...

	`,
        'font-family:monospace',
    );

    // server settings
    log.debug('settings', {
        server: host,
        api_key_secret: api_key_secret,
    });
});
