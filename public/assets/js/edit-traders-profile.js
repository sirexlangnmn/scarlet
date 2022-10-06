let companyLogoPreview;
let companyBannerPreview;
let companyLogoId;
let companyBannerId;

let btnUpdateCompanyDetails;

let tagline;
let website;
let businessEmailAddress;
let businessContactNumber;
let businessSocialMediaContactType;
let businessSocialMediaContactNumber;
let businessAddress;
let businessCountryLocation;
let businessCityLocation;
let startOperatingHour;
let endOperatingHour;
let languagesOfCommunication;
let currentLanguagesOfCommunication;
let tradeCategory;
let traderSubCategoryToggleField;
let traderMinorSubCategoryToggleField;
let businessScale;

companyLogoPreview = getId('companyLogoPreview');
companyBannerPreview = getId('companyBannerPreview');
companyLogoId = getId('companyLogoId');
companyBannerId = getId('companyBannerId');

btnUpdateCompanyDetails = getId('btnUpdateCompanyDetails');

tagline = getId('tagline');
website = getId('website');
businessEmailAddress = getId('businessEmailAddress');
businessContactNumber = getId('businessContactNumber');
businessSocialMediaContactType = getId('businessSocialMediaContactType');
businessSocialMediaContactNumber = getId('businessSocialMediaContactNumber');
businessAddress = getId('businessAddress');
currentLanguagesOfCommunication = getId('currentLanguagesOfCommunication');

$(function () {
    getUsersLogoAndBanner();
    getUser();
    getUsersAccount();
    getCompanyDetails();
});

function getCompanyDetails() {
    $.ajax({
        url: '/api/get/company-details',
        type: 'POST',
        success: function (data) {
            // console.log('getCompanyDetails()', data);
            businessAddress.value = data[0].business_address;
            currentLanguagesOfCommunication.value = data[0].business_language_of_communication;
            tagline.value = data[0].business_tagline;
            website.value = data[0].business_website;
            businessEmailAddress.value = data[0].business_email;
            businessContactNumber.value = data[0].business_contact;
            getBusinessSocialMediaContactType(data[0].business_social_media_contact_type);
            businessSocialMediaContactNumber.value = data[0].business_social_media_contact_number;
            business_language_of_communication(data[0].business_language_of_communication);
            document.getElementById("startOperatingHour").value = data[0].start_operating_hour;
            document.getElementById("endOperatingHour").value = data[0].end_operating_hour;
            //document.getElementById("myTime").value = "22:53:05";
        },
    });
}

function getBusinessSocialMediaContactType(value) {
    let jsonObj =
        '{ "companyDetails" : [' +
        '{ "id":"1" , "title":"Viber" },' +
        '{ "id":"2" , "title":"Wechat" },' +
        '{ "id":"3" , "title":"Whatsapp" } ]}';

    const parsedObj = JSON.parse(jsonObj);
    let companyDetails = parsedObj.companyDetails;

    let filtered = companyDetails.filter((d) => d.id == value);

    businessSocialMediaContactType.innerHTML =
        '<option value="' + filtered[0].id + '">' + filtered[0].title + '</option>';
    for (var i = 0; i < companyDetails.length; i++) {
        businessSocialMediaContactType.innerHTML =
            businessSocialMediaContactType.innerHTML +
            '<option value="' +
            companyDetails[i]['id'] +
            '">' +
            companyDetails[i]['title'] +
            '</option>';
    }
}

// display all users logo and banners in frontend profiles
// function getUsersLogoAndBanner() {
//     $.ajax({
//         url: '/api/get/users-logo-and-banners',
//         type: 'GET',
//         success: function (data) {
//             console.log(data);
//             if (data) {
//                 let bannerSrc = data[0].banner
//                     ? host + '/uploads/users_upload_files/' + data[0].banner
//                     : host + '/uploads/placeholder/banner-placeholder.png';
//                 let logoSrc = data[0].banner
//                     ? host + '/uploads/users_upload_files/' + data[0].logo
//                     : host + '/uploads/placeholder/logo-placeholder.jpg';
//                 companyBannerPreview.src = bannerSrc;
//                 companyLogoPreview.src = logoSrc;
//                 companyLogoId.value = data[0].id;
//                 companyBannerId.value = data[0].id;
//             }
//         },
//     });
// }


function getUsersLogoAndBanner() {
    $.ajax({
        url: '/api/get/users-logo-and-banners',
        type: 'GET',
        success: function (data) {
            // console.log('getUsersLogoAndBanner() | data: ', data);
            // console.log('getUsersLogoAndBanner() | data.length : ', data.length );
            if (data.length > 0) {
                if (data[0].banner) {
                    companyBannerPreview.src = host + '/uploads/users_upload_files/' + data[0].banner;
                } else {
                    companyBannerPreview.src = host + '/uploads/placeholder/banner-placeholder.png';
                }
                if (data[0].logo) {
                    companyLogoPreview.src = host + '/uploads/users_upload_files/' + data[0].logo;
                } else {
                    companyLogoPreview.src = host + '/uploads/placeholder/logo-placeholder.jpg';
                }
                companyLogoId.value = data[0].id;
                companyBannerId.value = data[0].id;
            } else {
                companyBannerPreview.src = host + '/uploads/placeholder/banner-placeholder.png';
                companyLogoPreview.src = host + '/uploads/placeholder/logo-placeholder.jpg';
            }
        },
    });
}

companyLogo.onchange = (evt) => {
    const [file] = companyLogo.files;
    if (file) {
        companyLogoPreview.src = URL.createObjectURL(file);
        editcompanyLogo();
    }
};

companyBanner.onchange = (evt) => {
    const [file] = companyBanner.files;
    if (file) {
        companyBannerPreview.src = URL.createObjectURL(file);
        editcompanyBanner();
    }
};

function getLanguageName(string) {
    if (string) {
        let data = string.split(',');
        for (var i = 0; i < data.length; i++) {
            displayLanguageOfComm.innerHTML =
                displayLanguageOfComm.innerHTML +
                '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' +
                getLanguageNameByCode(data[i]) +
                '</a>';
        }
    } else {
        displayLanguageOfComm.innerHTML = 'N/A';
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

function getTradeCategoriesTitleById(id) {
    let value;

    if (id) {
        $.ajax({
            url: host + '/api/get/trade-category-title-by-id/' + id,
            async: false,
            success: function (data) {
                value = data[0].title;
            },
        });
        return value;
    } else {
        return 'N/A';
    }
}

function getSubCategoriesTitleById(id) {
    let value;
    $.ajax({
        url: host + '/api/get/sub-category-title-by-id/' + id,
        async: false,
        success: function (data) {
            value = data[0].title;
        },
    });
    return value;
}

function getMinorSubCategoriesTitleById(id) {
    let value;
    $.ajax({
        url: host + '/api/get/minor-sub-category-title-by-id/' + id,
        async: false,
        success: function (data) {
            value = data[0].title;
        },
    });
    return value;
}

function getBusinessScaleTitle(id) {
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

function getUser() {
    $.ajax({
        url: '/api/get/user',
        type: 'POST',
        success: function (data) {
            document.getElementById('displayReprestativeFullname').innerHTML =
                data[0].first_name + ' ' + data[0].last_name;
        },
    });
}

function getUsersAccount() {
    $.ajax({
        url: '/api/get/users-account',
        type: 'POST',
        success: function (data) {
            document.getElementById('displayReprestativeEmailAddress').innerHTML = data[0].email_or_social_media;
            document.getElementById('displayReprestativeContactNumber').innerHTML = data[0].contact_number;
        },
    });
}

function editcompanyLogo() {
    // Get form
    let form = $('#editcompanyLogo')[0];

    // Create an FormData object
    let data = new FormData(form);

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: '/api/post/update-trader-company-logo',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            // some code here
        },
        error: function (e) {},
    });
}

function editcompanyBanner() {
    // Get form
    let form = $('#editcompanyBanner')[0];

    // Create an FormData object
    let data = new FormData(form);

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: '/api/post/update-trader-company-banner',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            // some code here
        },
        error: function (e) {},
    });
}

function getUsersBusinessScale(data) {
    let value = data[0].business_scale;
    let x = getBusinessScaleTitle(value);
    document.getElementById('editBusinessScale').innerHTML = '<option value="' + value + '">' + x + '</option>';

    let jsonObj =
        '{ "companyDetails" : [' +
        '{ "id":"1" , "title":"Small Scale" },' +
        '{ "id":"2" , "title":"Medium Scale" },' +
        '{ "id":"3" , "title":"Large Scale" } ]}';

    const parsedObj = JSON.parse(jsonObj);
    let companyDetails = parsedObj.companyDetails;
    let leng = companyDetails.length;

    for (let i = 0; i < leng; i++) {
        document.getElementById('editBusinessScale').innerHTML =
            document.getElementById('editBusinessScale').innerHTML +
            '<option value="' +
            companyDetails[i]['id'] +
            '">' +
            companyDetails[i]['title'] +
            '</option>';
    }
}

const $form = $('#editCompanyDetails');

btnUpdateCompanyDetails.addEventListener('click', (e) => {
    //stop submit the form, we will post it manually.
    e.preventDefault();

    let validation = updateTradersProfileValidation();
    console.log('validation');
    console.log(validation);

    if (validation === 'true') {
        $.ajax({
            url: '/api/post/update-company-details',
            type: 'post',
            data: $form.serialize(),
        }).done((response) => {
            // console.log(response.uuid);
            console.log(response);
            // if (response.id) {
            //     Swal.fire('Success', 'Registration Success.', 'success');
            // }
            if (response === 'success') {
                location.replace(host + '/profile');
            }
        });
    } else {
        Swal.fire('Warning', 'At least one required field is incomplete.', 'warning');
    }
});

function backProfile() {
    location.replace(host + '/profile');
}
