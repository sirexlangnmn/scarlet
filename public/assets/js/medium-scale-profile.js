$(function () {
    getUser();
    getUsersAccount();
    getUserAddress();
    getCompanyDetails();
});

function getUser() {
    $.ajax({
        url: '/api/get/user',
        type: 'POST',
        success: function (data) {
            document.getElementById('firstName').innerHTML = data[0].first_name;
            document.getElementById('lastName').innerHTML = data[0].last_name;
            document.getElementById('middleName').innerHTML = data[0].middle_name;
        },
    });
}

function getUserAddress() {
    $.ajax({
        url: '/api/get/users-address',
        type: 'POST',
        success: function (data) {
            getCityNameToBeDisplayUsingCode(data[0].city, 'city');
            getStatesNameToBeDisplayUsingCode(data[0].state_or_province, 'states');
            getCountryNameUsingCode(data[0].country, 'country');
        },
    });
}

function getCompanyDetails() {
    $.ajax({
        url: '/api/get/company-details',
        type: 'POST',
        success: function (data) {
            document.getElementById('displayBusinessNameH1').innerHTML = data[0].business_name;
            document.getElementById('businessName').innerHTML = data[0].business_name;
            document.getElementById('businessWebsite').innerHTML = data[0].business_website;
            document.getElementById('businessEmailAddress').innerHTML = data[0].business_email;
            document.getElementById('businessContactNumber').innerHTML = data[0].business_contact;
            displayBusinessSocialMediaContactType(data[0].business_social_media_contact_type, 'businessSocialMediaContactType');
            document.getElementById('businessSocialMediaContactNumber').innerHTML = data[0].business_social_media_contact_number;
            getLanguageName(data[0].business_language_of_communication, "languageOfComm");
            getCityNameToBeDisplayUsingCode(data[0].business_city, 'businessCity');
            getStatesNameToBeDisplayUsingCode(data[0].business_states, 'businessStates');
            getCountryNameUsingCode(data[0].business_country, 'businessCountry');
        },
    });
}

function getUsersAccount() {
    $.ajax({
        url: '/api/get/users-account',
        type: 'POST',
        success: function (data) {
            document.getElementById('emailAddress').innerHTML = data[0].email_or_social_media;
            displayBusinessSocialMediaContactType(data[0].social_media_contact_type, 'socialMediaContactType');
            document.getElementById('socialMediaContactNumber').innerHTML = data[0].contact_number;
        },
    });
}

function getCountryNameUsingCode(code, elementId) {
    if (code) {
        fetch('assets/json/countries.json')
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                let filtered = data.filter((d) => d.iso2 == code);
                document.getElementById(elementId).innerHTML = filtered[0].name;
            });
    } else {
        document.getElementById(elementId).innerHTML = 'N/A';
    }
}

function getLanguageName(string, elementId) {
    if (string) {
        let data = string.split(',');
        for (var i = 0; i < data.length; i++) {
            document.getElementById(elementId).innerHTML =
            document.getElementById(elementId).innerHTML +
                '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' +
                getLanguageNameByCode(data[i]) +
                '</a>';
        }
    } else {
        document.getElementById(elementId).innerHTML = 'N/A';
    }
}

function getLanguageNameByCode(code) {
    let value;
    $.ajax({
        url: host + '/api/get/language-name-by-code/' + code,
        async: false,
        success: function (data) {
            value = data[0].name;
        },
    });
    return value;
}

function displayBusinessSocialMediaContactType(value, elementId) {
    let jsonObj =
        '{ "socialMediaContactType" : [' +
        '{ "id":"1" , "title":"Viber" },' +
        '{ "id":"2" , "title":"Wechat" },' +
        '{ "id":"3" , "title":"Whatsapp" } ]}';

    const parsedObj = JSON.parse(jsonObj);
    let data = parsedObj.socialMediaContactType;

    let filtered = data.filter((d) => d.id == value);

    document.getElementById(elementId).innerHTML = filtered[0].title;

}

function editProfile() {
    // location.replace(host + '/edit-traders-profile');
    location.href = '/edit-medium-scale-profile';
}