const companyDetailsJsonObj2 = [];
const dataForDisplaySearchParameter = []
var intervalId = null;
var varCounter = 0;

$(function () {
    getCompaniesRelatedToCurrentUser();
    displayFirstCompanyDetails();
    displayTopCompany();
});

$(window).scroll(function (e) {
    var $el = $('.fixed-top-mid');
    var isPositionFixed = $el.css('position') == 'fixed';
    if ($(this).scrollTop() > 200 && !isPositionFixed) {
        $el.css({ position: 'fixed', top: '0px' });
    }
    if ($(this).scrollTop() < 200 && isPositionFixed) {
        $el.css({ position: 'static', top: '0px' });
    }
});

let tradeCategories;
let subCategories;
let minorSubCategories;

let companiesProfilePicture;

// to get the active image in carousel
let selectionsNextSlide;
let selectionsPrevSlide;
let activeDivOfCarousel;
let activeImageOfCarousel;
let imageSrcOfActiveImageInCarousel;
let imageNameOfActiveImageInCarousel;
let fileNameOfActiveImageInCarousel;

tradeCategories = getId('trade-categories');
subCategories = getId('sub-categories');
minorSubCategories = getId('minor-sub-categories');

companiesProfilePicture = getId('companiesProfilePicture');

selectionsNextSlide = getId('selections-next-slide');
selectionsPrevSlide = getId('selections-prev-slide');

// selectionsPrevSlide.onmouseup = function () {
//     varCounter = 0;
//     intervalId = setInterval(getImageName, 1500);
// };

// selectionsPrevSlide.onmousedown = function () {
//     varCounter = 0;
//     intervalId = setInterval(getImageName, 1500);
// };

// selectionsPrevSlide.onkeyup = function () {
//     varCounter = 0;
//     intervalId = setInterval(getImageName, 1500);
// };

// selectionsPrevSlide.addEventListener('click', (e) => {
//     varCounter = 0;
//     intervalId = setInterval(getImageName, 1500);
// });

selectionsPrevSlide.addEventListener('mouseleave', (e) => {
    varCounter = 0;
    intervalId = setInterval(getImageName, 1000);
});

// selectionsPrevSlide.onmouseover = function () {
//     varCounter = 0;
//     intervalId = setInterval(getImageName, 1500);
// };

// selectionsNextSlide.onmouseup = function () {
//     varCounter = 0;
//     intervalId = setInterval(getImageName, 1500);
// };

// selectionsNextSlide.onmousedown = function () {
//     varCounter = 0;
//     intervalId = setInterval(getImageName, 1500);
// };

//not working
// selectionsNextSlide.onkeyup = function () {
//     varCounter = 0;
//     intervalId = setInterval(getImageName, 1500);
// };

// selectionsNextSlide.addEventListener('click', (e) => {
//     varCounter = 0;
//     intervalId = setInterval(getImageName, 1500);
// });

var timer,
    num = 0;

$('#selections-prev-slide').click(function () {
    varCounter = 0;

    /*This condition is required because 2 click events are fired for each
    dblclick but we only want to record the time of the first click*/
    if (num % 2 === 0) {
        if (num === 0) {
            timer = new Date().getTime() - 2000;
        } else {
            timer = new Date().getTime();
        }
    }

    let time2 = new Date().getTime(),
        dblClickTime = time2 - timer;
    console.log('dblClickTime: ', dblClickTime);
    console.log('time2: ', time2);
    console.log('timer: ', timer);

    if (dblClickTime > 1000) {
        console.log('good: ', dblClickTime);
        intervalId = setInterval(getImageName, 1500);
    } else {
        console.log('too fast: ', dblClickTime);
    }
    num++;
});

$('#selections-next-slide').click(function () {
    varCounter = 0;

    /*This condition is required because 2 click events are fired for each
    dblclick but we only want to record the time of the first click*/
    if (num % 2 === 0) {
        if (num === 0) {
            timer = new Date().getTime() - 2000;
        } else {
            timer = new Date().getTime();
        }
    }

    let time2 = new Date().getTime(),
        dblClickTime = time2 - timer;
    // console.log('dblClickTime: ', dblClickTime);
    // console.log('time2: ', time2);
    // console.log('timer: ', timer);

    if (dblClickTime > 1000) {
        // console.log('good: ', dblClickTime);
        intervalId = setInterval(getImageName, 1500);
    } else {
        // console.log('too fast: ', dblClickTime);
    }
    num++;
});

selectionsNextSlide.addEventListener('mouseleave', (e) => {
    varCounter = 0;
    intervalId = setInterval(getImageName, 1000);
});

// selectionsNextSlide.onmouseover = function () {
//     varCounter = 0;
//     intervalId = setInterval(getImageName, 1500);
// };

function getImageName() {
    if (varCounter < 4) {
        // console.log('varCounter: ', varCounter);
        varCounter++;
        // get the active parent div to get the active image
        activeDivOfCarousel = getEcN('uk-active uk-transition-active')[0];
        // console.log("getEcN('uk-active uk-transition-active')[0]: ", activeDivOfCarousel);
        // get the active image inside parent div
        activeImageOfCarousel = activeDivOfCarousel.getElementsByTagName('img')[0];
        // get the image src
        imageSrcOfActiveImageInCarousel = activeImageOfCarousel.getAttribute('src');
        // remove "uploads/" part of image src name
        imageNameOfActiveImageInCarousel = imageSrcOfActiveImageInCarousel.split('/').pop();
        // exclude extension from filename
        //fileNameOfActiveImageInCarousel = imageNameOfActiveImageInCarousel.split('.').slice(0, -1).join('.');

        displayCompanyDetailsUsingImageName(imageNameOfActiveImageInCarousel);
        //alert(imageNameOfActiveImageInCarousel);
    } else {
        clearInterval(intervalId);
    }
}

function displayCompanyDetailsUsingImageName(filename) {
    $('#selection-business-industry-belong').empty();
    $('#selection-business-language-of-communication').empty();

    // console.log('function displayCompanyDetailsUsingImageName(filename): ', filename);
    // document.getElementById('test-filename').innerHTML = filename;

    let leng = companyDetailsJsonObj2[0].length;

    for (let i = 0; i < leng; i++) {
        if (companyDetailsJsonObj2[0][i].banner === filename) {
            // console.log(
            //     'function displayCompanyDetailsUsingImageName | companyDetailsJsonObj2[0][i] : ',
            //     companyDetailsJsonObj2[0][i],
            // );

            // document.getElementById('test-banner').innerHTML = companyDetailsJsonObj2[0][i].banner;
            document.getElementById('selection-company-name').innerHTML = companyDetailsJsonObj2[0][i].business_name;
            if (companyDetailsJsonObj2[0][i].business_tagline) {
                document.getElementById('selection-company-tagline').innerHTML =
                    companyDetailsJsonObj2[0][i].business_tagline;
            }
            // if (companyDetailsJsonObj2[0][i].business_website) {
            //     document.getElementById('selection-company-website').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_website;
            // }
            // if (companyDetailsJsonObj2[0][i].business_email) {
            //     document.getElementById('selection-company-email').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_email;
            // }
            // if (companyDetailsJsonObj2[0][i].business_contact) {
            //     document.getElementById('selection-company-contact').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_contact;
            // }
            // if (companyDetailsJsonObj2[0][i].business_social_media_contact_type) {
            //     document.getElementById('selection-business-social-media-contact-type').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_social_media_contact_type;
            // }
            // if (companyDetailsJsonObj2[0][i].business_social_media_contact_number) {
            //     document.getElementById('selection-business-social-media-contact-number').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_social_media_contact_number;
            // }
            // if (companyDetailsJsonObj2[0][i].business_address) {
            //     document.getElementById('selection-business-address').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_address;
            // }
            if (companyDetailsJsonObj2[0][i].business_language_of_communication) {
                //document.getElementById('selection-business-language-of-communication').innerHTML =
                formattingLanguageName(companyDetailsJsonObj2[0][i].business_language_of_communication);
            }
            if (companyDetailsJsonObj2[0][i].business_major_category) {
                document.getElementById('selection-business-major-category').innerHTML = getTradeCategoriesTitleById(
                    companyDetailsJsonObj2[0][i].business_major_category,
                );
            }
            if (companyDetailsJsonObj2[0][i].business_sub_category) {
                document.getElementById('selection-business-sub-category').innerHTML = getSubCategoriesTitleById(
                    companyDetailsJsonObj2[0][i].business_sub_category,
                );
            }
            if (companyDetailsJsonObj2[0][i].business_minor_sub_category) {
                document.getElementById('selection-business-minor-sub-category').innerHTML =
                    getMinorSubCategoriesTitleById(companyDetailsJsonObj2[0][i].business_minor_sub_category);
            }
            if (companyDetailsJsonObj2[0][i].business_scale) {
                document.getElementById('selection-business-scale').innerHTML = getBusinessScaleTitle(
                    companyDetailsJsonObj2[0][i].business_scale,
                );
            }
            if (companyDetailsJsonObj2[0][i].business_industry_belong_to) {
                // document.getElementById('selection-business-industry-belong').innerHTML =
                formattingBusinessTags(companyDetailsJsonObj2[0][i].business_industry_belong_to);
            }
            getCountryNameUsingCode(
                companyDetailsJsonObj2[0][i].country_of_operation,
                'selection-company-country-of-operations',
            );
            getStatesNameToBeDisplayUsingCode(
                companyDetailsJsonObj2[0][i].states_of_operation,
                'selection-company-state-of-operations',
            );
            getCityNameToBeDisplayUsingCode(
                companyDetailsJsonObj2[0][i].city_of_operation,
                'selection-company-city-of-operations',
            );
            // getCountryNameUsingCode(companyDetailsJsonObj2[0][i].business_country, 'selection-company-country');
            // getStatesNameToBeDisplayUsingCode(companyDetailsJsonObj2[0][i].business_states, 'selection-company-state');
            // getCityNameToBeDisplayUsingCode(companyDetailsJsonObj2[0][i].business_city, 'selection-company-city');
            if (companyDetailsJsonObj2[0][i].region_of_operation) {
                document.getElementById('selection-company-region-of-operations').innerHTML =
                    companyDetailsJsonObj2[0][i].region_of_operation;
            } else {
                document.getElementById('selection-company-region-of-operations').innerHTML = 'N/A';
            }
        }
    }
}

// function displayFirstCompanyDetails() {
//     console.log('function displayFirstCompanyDetails: ', companyDetailsJsonObj2[0][0]);
//     console.log('function displayFirstCompanyDetails: ', companyDetailsJsonObj2);


//     document.getElementById('selection-company-name').innerHTML = companyDetailsJsonObj2[0][0].business_name;
//     if (companyDetailsJsonObj2[0][0].business_tagline) {
//         document.getElementById('selection-company-tagline').innerHTML = companyDetailsJsonObj2[0][0].business_tagline;
//     }
//     // if (companyDetailsJsonObj2[0][0].business_website) {
//     //     document.getElementById('selection-company-website').innerHTML = companyDetailsJsonObj2[0][0].business_website;
//     // }
//     // if (companyDetailsJsonObj2[0][0].business_email) {
//     //     document.getElementById('selection-company-email').innerHTML = companyDetailsJsonObj2[0][0].business_email;
//     // }
//     // if (companyDetailsJsonObj2[0][0].business_contact) {
//     //     document.getElementById('selection-company-contact').innerHTML = companyDetailsJsonObj2[0][0].business_contact;
//     // }
//     // if (companyDetailsJsonObj2[0][0].business_social_media_contact_type) {
//     //     document.getElementById('selection-business-social-media-contact-type').innerHTML =
//     //         companyDetailsJsonObj2[0][0].business_social_media_contact_type;
//     // }
//     // if (companyDetailsJsonObj2[0][0].business_social_media_contact_number) {
//     //     document.getElementById('selection-business-social-media-contact-number').innerHTML =
//     //         companyDetailsJsonObj2[0][0].business_social_media_contact_number;
//     // }
//     // if (companyDetailsJsonObj2[0][0].business_address) {
//     //     document.getElementById('selection-business-address').innerHTML = companyDetailsJsonObj2[0][0].business_address;
//     // }
//     if (companyDetailsJsonObj2[0][0].business_language_of_communication) {
//         //document.getElementById('selection-business-language-of-communication').innerHTML =
//         formattingLanguageName(companyDetailsJsonObj2[0][0].business_language_of_communication);
//     }
//     if (companyDetailsJsonObj2[0][0].business_major_category) {
//         document.getElementById('selection-business-major-category').innerHTML = getTradeCategoriesTitleById(
//             companyDetailsJsonObj2[0][0].business_major_category,
//         );
//     }
//     if (companyDetailsJsonObj2[0][0].business_sub_category) {
//         document.getElementById('selection-business-sub-category').innerHTML = getSubCategoriesTitleById(
//             companyDetailsJsonObj2[0][0].business_sub_category,
//         );
//     }
//     if (companyDetailsJsonObj2[0][0].business_minor_sub_category) {
//         document.getElementById('selection-business-minor-sub-category').innerHTML = getMinorSubCategoriesTitleById(
//             companyDetailsJsonObj2[0][0].business_minor_sub_category,
//         );
//     }
//     if (companyDetailsJsonObj2[0][0].business_scale) {
//         document.getElementById('selection-business-scale').innerHTML = getBusinessScaleTitle(
//             companyDetailsJsonObj2[0][0].business_scale,
//         );
//     }
//     if (companyDetailsJsonObj2[0][0].business_industry_belong_to) {
//         // document.getElementById('selection-business-industry-belong').innerHTML =
//         formattingBusinessTags(companyDetailsJsonObj2[0][0].business_industry_belong_to);
//     }
//     // new - end
//     getCountryNameUsingCode(
//         companyDetailsJsonObj2[0][0].country_of_operation,
//         'selection-company-country-of-operations',
//     );
//     getStatesNameToBeDisplayUsingCode(
//         companyDetailsJsonObj2[0][0].states_of_operation,
//         'selection-company-state-of-operations',
//     );
//     getCityNameToBeDisplayUsingCode(
//         companyDetailsJsonObj2[0][0].city_of_operation,
//         'selection-company-city-of-operations',
//     );
//     // getCountryNameUsingCode(companyDetailsJsonObj2[0][0].business_country, 'selection-company-country');
//     // getStatesNameToBeDisplayUsingCode(companyDetailsJsonObj2[0][0].business_states, 'selection-company-state');
//     // getCityNameToBeDisplayUsingCode(companyDetailsJsonObj2[0][0].business_city, 'selection-company-city');
//     if (companyDetailsJsonObj2[0][0].region_of_operation) {
//         document.getElementById('selection-company-region-of-operations').innerHTML =
//             companyDetailsJsonObj2[0][0].region_of_operation;
//     } else {
//         document.getElementById('selection-company-region-of-operations').innerHTML = 'N/A';
//     }
// }

function displayFirstCompanyDetails() {
    // console.log('function displayFirstCompanyDetails: ', companyDetailsJsonObj2[0][0]);
    // console.log('function displayFirstCompanyDetails: ', companyDetailsJsonObj2);

    if (companyDetailsJsonObj2[0][0] !== undefined) {
        // console.log('function displayFirstCompanyDetails: | NOT undefined');
        // console.log('function displayFirstCompanyDetails: | message: ' + companyDetailsJsonObj2[0].message);
        document.getElementById('selection-company-name').innerHTML = companyDetailsJsonObj2[0][0].business_name;
    if (companyDetailsJsonObj2[0][0].business_tagline) {
        document.getElementById('selection-company-tagline').innerHTML = companyDetailsJsonObj2[0][0].business_tagline;
    }
    if (companyDetailsJsonObj2[0][0].business_language_of_communication) {
        //document.getElementById('selection-business-language-of-communication').innerHTML =
        formattingLanguageName(companyDetailsJsonObj2[0][0].business_language_of_communication);
    }
    if (companyDetailsJsonObj2[0][0].business_major_category) {
        document.getElementById('selection-business-major-category').innerHTML = getTradeCategoriesTitleById(
            companyDetailsJsonObj2[0][0].business_major_category,
        );
    }
    if (companyDetailsJsonObj2[0][0].business_sub_category) {
        document.getElementById('selection-business-sub-category').innerHTML = getSubCategoriesTitleById(
            companyDetailsJsonObj2[0][0].business_sub_category,
        );
    }
    if (companyDetailsJsonObj2[0][0].business_minor_sub_category) {
        document.getElementById('selection-business-minor-sub-category').innerHTML = getMinorSubCategoriesTitleById(
            companyDetailsJsonObj2[0][0].business_minor_sub_category,
        );
    }
    if (companyDetailsJsonObj2[0][0].business_scale) {
        document.getElementById('selection-business-scale').innerHTML = getBusinessScaleTitle(
            companyDetailsJsonObj2[0][0].business_scale,
        );
    }
    if (companyDetailsJsonObj2[0][0].business_industry_belong_to) {
        // document.getElementById('selection-business-industry-belong').innerHTML =
        formattingBusinessTags(companyDetailsJsonObj2[0][0].business_industry_belong_to);
    }
    // new - end
    getCountryNameUsingCode(
        companyDetailsJsonObj2[0][0].country_of_operation,
        'selection-company-country-of-operations',
    );
    getStatesNameToBeDisplayUsingCode(
        companyDetailsJsonObj2[0][0].states_of_operation,
        'selection-company-state-of-operations',
    );
    getCityNameToBeDisplayUsingCode(
        companyDetailsJsonObj2[0][0].city_of_operation,
        'selection-company-city-of-operations',
    );
    if (companyDetailsJsonObj2[0][0].region_of_operation) {
        document.getElementById('selection-company-region-of-operations').innerHTML =
            companyDetailsJsonObj2[0][0].region_of_operation;
    } else {
        document.getElementById('selection-company-region-of-operations').innerHTML = 'N/A';
    }
    } else {
        replaceDashCompanyDetailsDiv();
    }
}


function displayTopCompany() {
    // top 20 search
    let leng = companyDetailsJsonObj2[0].length;
    console.log('displayTopCompany | companyDetailsJsonObj2[0].length: ', leng);
    console.log('displayTopCompany | companyDetailsJsonObj2: ', companyDetailsJsonObj2);

    document.getElementById('top-selection-results').innerHTML = '';
    for (let i = 0; i < leng; i++) {
        document.getElementById('top-selection-results').innerHTML +=
            '<div class="flex items-center space-x-4 rounded-md -mx-2 p-2 hover:bg-gray-50">';
        document.getElementById('top-selection-results').innerHTML += '<div class="flex-1" id="test">';
        document.getElementById('top-selection-results').innerHTML +=
            '<a href="#" onclick="displayTopCompanyDetails(\'' +
            companyDetailsJsonObj2[0][i].business_name +
            '\')" class="text-base font-semibold capitalize">' +
            companyDetailsJsonObj2[0][i].business_name +
            '</a>';
        document.getElementById('top-selection-results').innerHTML += '</div>';
        document.getElementById('top-selection-results').innerHTML += '</div>';
    }
}

// function displaySearchParameter() {
//     console.log('displaySearchParameter', dataForDisplaySearchParameter[0][0]);
//     document.getElementById('displaySearchParameter').innerHTML = '';
//     document.getElementById('displaySearchParameter').innerHTML += '<li>';
//     document.getElementById('displaySearchParameter').innerHTML += '<a href="index.html">Home</a>';
//     document.getElementById('displaySearchParameter').innerHTML += '</li>';
//     document.getElementById('displaySearchParameter').innerHTML += '<li class="active">';
//     document.getElementById('displaySearchParameter').innerHTML += '<a href="#">Selection </a>';
//     document.getElementById('displaySearchParameter').innerHTML += '</li>';
//     if (dataForDisplaySearchParameter[0][0].business_major_category) {
//         document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
//         document.getElementById('displaySearchParameter').innerHTML +=
//             '<a href="#">' + getTradeCategoriesTitleById(dataForDisplaySearchParameter[0][0].business_major_category) + '</a>';
//         document.getElementById('displaySearchParameter').innerHTML += '</li>';
//     }
//     if (dataForDisplaySearchParameter[0][0].business_sub_category) {
//         document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
//         document.getElementById('displaySearchParameter').innerHTML +=
//             '<a href="#">' + getSubCategoriesTitleById(dataForDisplaySearchParameter[0][0].business_sub_category) + '</a>';
//         document.getElementById('displaySearchParameter').innerHTML += '</li>';
//     }

//     if (dataForDisplaySearchParameter[0][0].business_minor_sub_category) {
//         document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
//         document.getElementById('displaySearchParameter').innerHTML +=
//             '<a href="#">' +
//             getMinorSubCategoriesTitleById(dataForDisplaySearchParameter[0][0].business_minor_sub_category) +
//             '</a>';
//         document.getElementById('displaySearchParameter').innerHTML += '</li>';
//     }
//     if (dataForDisplaySearchParameter[0][0].region_of_operation) {
//         document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
//         document.getElementById('displaySearchParameter').innerHTML +=
//             '<a href="#">' + dataForDisplaySearchParameter[0][0].region_of_operation + '</a>';
//         document.getElementById('displaySearchParameter').innerHTML += '</li>';
//     }
//     if (dataForDisplaySearchParameter[0][0].country_of_operation) {
//         document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
//         document.getElementById('displaySearchParameter').innerHTML +=
//             '<a href="#" id="displaySearchParameter_countryOperation"></a>';
//         document.getElementById('displaySearchParameter').innerHTML += '</li>';
//         getCountryNameUsingCode(
//             dataForDisplaySearchParameter[0][0].country_of_operation,
//             'displaySearchParameter_countryOperation',
//         );
//     }
//     if (companyDetailsJsonObj2[0][0].states_of_operation) {
//         document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
//         document.getElementById('displaySearchParameter').innerHTML +=
//             '<a href="#" id="displaySearchParameter_stateOperation"></a>';
//         document.getElementById('displaySearchParameter').innerHTML += '</li>';
//         getStatesNameToBeDisplayUsingCode(
//             companyDetailsJsonObj2[0][0].states_of_operation,
//             'displaySearchParameter_stateOperation',
//         );
//     }
// }

function displaySearchParameter() {
    //console.log('displaySearchParameter', dataForDisplaySearchParameter[0][0]);
    //console.log('displaySearchParameter', dataForDisplaySearchParameter);

    console.log('displaySearchParameter', dataForDisplaySearchParameter[0]);
    document.getElementById('displaySearchParameter').innerHTML = '';
    document.getElementById('displaySearchParameter').innerHTML += '<li>';
    document.getElementById('displaySearchParameter').innerHTML += '<a href="index.html">Home</a>';
    document.getElementById('displaySearchParameter').innerHTML += '</li>';
    document.getElementById('displaySearchParameter').innerHTML += '<li class="active">';
    document.getElementById('displaySearchParameter').innerHTML += '<a href="#">Selection </a>';
    document.getElementById('displaySearchParameter').innerHTML += '</li>';
    if (dataForDisplaySearchParameter[0].business_major_category) {
        document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
        document.getElementById('displaySearchParameter').innerHTML +=
            '<a href="#">' + getTradeCategoriesTitleById(dataForDisplaySearchParameter[0].business_major_category) + '</a>';
        document.getElementById('displaySearchParameter').innerHTML += '</li>';
    }
    if (dataForDisplaySearchParameter[0].business_sub_category) {
        document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
        document.getElementById('displaySearchParameter').innerHTML +=
            '<a href="#">' + getSubCategoriesTitleById(dataForDisplaySearchParameter[0].business_sub_category) + '</a>';
        document.getElementById('displaySearchParameter').innerHTML += '</li>';
    }

    if (dataForDisplaySearchParameter[0].business_minor_sub_category) {
        document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
        document.getElementById('displaySearchParameter').innerHTML +=
            '<a href="#">' +
            getMinorSubCategoriesTitleById(dataForDisplaySearchParameter[0].business_minor_sub_category) +
            '</a>';
        document.getElementById('displaySearchParameter').innerHTML += '</li>';
    }
    if (dataForDisplaySearchParameter[0].region_of_operation) {
        document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
        document.getElementById('displaySearchParameter').innerHTML +=
            '<a href="#">' + dataForDisplaySearchParameter[0].region_of_operation + '</a>';
        document.getElementById('displaySearchParameter').innerHTML += '</li>';
    }
    if (dataForDisplaySearchParameter[0].country_of_operation) {
        document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
        document.getElementById('displaySearchParameter').innerHTML +=
            '<a href="#" id="displaySearchParameter_countryOperation"></a>';
        document.getElementById('displaySearchParameter').innerHTML += '</li>';
        getCountryNameUsingCode(
            dataForDisplaySearchParameter[0].country_of_operation,
            'displaySearchParameter_countryOperation',
        );
    }
    if (dataForDisplaySearchParameter[0].states_of_operation) {
        document.getElementById('displaySearchParameter').innerHTML += '<li class="">';
        document.getElementById('displaySearchParameter').innerHTML +=
            '<a href="#" id="displaySearchParameter_stateOperation"></a>';
        document.getElementById('displaySearchParameter').innerHTML += '</li>';
        getStatesNameToBeDisplayUsingCode(
            dataForDisplaySearchParameter[0].states_of_operation,
            'displaySearchParameter_stateOperation',
        );
    }
}

function getCountryNameUsingCode(code, elementId) {
    $('#' + elementId).empty();

    if (code) {
        fetch('assets/json/countries.json')
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                let countryCode = code.split(',');

                for (var i = 0; i < countryCode.length; i++) {
                    let filtered = data.filter((d) => d.iso2 == countryCode[i]);
                    let countryName;
                    if (countryCode.length > 1 || i == countryCode.length + 1) {
                        countryName = filtered[0].name + ', ';
                    } else {
                        countryName = filtered[0].name;
                    }
                    document.getElementById(elementId).innerHTML =
                        document.getElementById(elementId).innerHTML + countryName;
                }
            });
    } else {
        document.getElementById(elementId).innerHTML = 'N/A ';
    }
}

function test(countryCode) {
    console.log('test', countryCode);
    fetch('assets/json/countries.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.iso2 == countryCode);
            return filtered[0].name;
        });
}

function getStatesNameToBeDisplayUsingCode(code, elementId) {
    if (code) {
        fetch('assets/json/states.json')
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                let filtered = data.filter((d) => d.id == code);
                document.getElementById(elementId).innerHTML = filtered[0].name;
            });
    } else {
        document.getElementById(elementId).innerHTML = 'N/A';
    }
}

function getCityNameToBeDisplayUsingCode(code, elementId) {
    if (code) {
        fetch('assets/json/cities.json')
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                let filtered = data.filter((d) => d.id == code);
                document.getElementById(elementId).innerHTML = filtered[0].name;
            });
    } else {
        document.getElementById(elementId).innerHTML = 'N/A';
    }
}

function getCompaniesProfilePicture(id, uuid) {
    let value;
    $.ajax({
        url: '/api/get/companies-profile-picture',
        type: 'POST',
        data: { id: id, uuid: uuid },
        async: false,
        success: function (data) {
            value = data;
        },
    });
    return value;
}

// function searchParameter() {
//     let countrySelected = document.getElementById('selectionCountry').value;
// }

// document.getElementById('selectionCountry').onchange = function () {
//     searchParameter();
// };

// consume api to get all trade categories
async function getTradeCategories() {
    let response = await fetch(host + '/api/get/trade-categories-for-today');
    let data = await response.json();
    return data;
}

// display all trade categories in frontend select option
getTradeCategories().then((data) => {
    for (var i = 0; i < data.length; i++) {
        tradeCategories.innerHTML =
            tradeCategories.innerHTML + '<option value="' + data[i]['id'] + '">' + data[i]['title'] + '</option>';
    }
});

// display all sub categories under trade category in frontend select option
tradeCategories.addEventListener('change', function () {
    $('#sub-categories').empty();
    let tradeCategoryId = this.value;

    async function getSubCategoriesByTradeCategoryId() {
        let response = await fetch(host + '/api/get/sub-categories-by-trade-category-id/' + tradeCategoryId);
        let data = await response.json();
        return data;
    }

    getSubCategoriesByTradeCategoryId().then((data) => {
        
        minorSubCategories.innerHTML = '<option value="" selected>Any</option>';
        subCategories.innerHTML = '<option value="" selected>Any</option>';
        for (var i = 0; i < data.length; i++) {
            subCategories.innerHTML =
                subCategories.innerHTML + '<option value="' + data[i]['id'] + '">' + data[i]['title'] + '</option>';
        }
        $('#minor-sub-categories').selectpicker('refresh');
        $('#sub-categories').selectpicker('refresh');
    });
});

// display all minor sub categories under sub category in frontend select option
subCategories.addEventListener('change', function () {
    $('#minor-sub-categories').empty();
    let subCategoryId = this.value;

    async function getMinorSubCategoriesByTradeCategoryId() {
        let response = await fetch(host + '/api/get/minor-sub-categories-by-sub-category-id/' + subCategoryId);
        let data = await response.json();
        return data;
    }

    getMinorSubCategoriesByTradeCategoryId().then((data) => {
        // for (var i = 0; i < data.length; i++) {
        //     let option = document.createElement('option');
        //     option.value = data[i]['id'];
        //     option.innerHTML = data[i]['title'];
        //     minorSubCategories.appendChild(option);
        // }

        minorSubCategories.innerHTML = '<option value="" selected>Any</option>';
        for (var i = 0; i < data.length; i++) {
            minorSubCategories.innerHTML =
                minorSubCategories.innerHTML +
                '<option value="' +
                data[i]['id'] +
                '">' +
                data[i]['title'] +
                '</option>';
        }

        $('#minor-sub-categories').selectpicker('refresh');
    });
});

// consume api to get all languages
async function getLanguages() {
    let response = await fetch(host + '/api/get/languages');
    let data = await response.json();
    return data;
}

// display all languages in frontend select option
getLanguages().then((data) => {
    document.getElementById('language').selectedIndex = 0;

    document.getElementById('language').innerHTML = '<option value="" >Any</option>';
    for (var i = 0; i < data.length; i++) {
        document.getElementById('language').innerHTML =
            document.getElementById('language').innerHTML +
            '<option value="' +
            data[i]['code'] +
            '">' +
            data[i]['name'] +
            '</option>';
    }
});

// function getCompanies() {
//     $.ajax({
//         url: '/api/get/companies',
//         type: 'POST',
//         success: function (data) {
//             // console.log(data);
//         },
//     });
// }

function getCompaniesRelatedToCurrentUser() {
    $.ajax({
        url: '/api/get/get-companies-related-to-current-user',
        type: 'POST',
        async: false,
        success: function (data) {
            // console.log('function getCompaniesRelatedToCurrentUser() | data.length :', data.length);
            // console.log('function getCompaniesRelatedToCurrentUser() | data :', data);
            // console.log('function getCompaniesRelatedToCurrentUser() | data :', data[0]);


            if (data.length > 0) {
                companyDetailsJsonObj2.push(data);
                dataForDisplaySearchParameter.push(data[0]);
                companiesProfilePicture.innerHTML = '';
                // for (var i = 0; i < data.length; i++) {
                for (var i = data.length - 1; i > -1; i--) {
                    let bannerTitle = getCompaniesProfilePicture(data[i]['id'], data[i]['uuid']);
                    let bannerSrc = host + '/uploads/users_upload_files/' + bannerTitle[0].banner;
    
                    companiesProfilePicture.innerHTML =
                        companiesProfilePicture.innerHTML +
                        '<li>' +
                        '<img src="' +
                        bannerSrc +
                        // '" id="companyBannerPreview'+i+'" alt="" uk-cover>' +
                        '" id="companyBannerPreview" alt="" uk-cover>' +
                        '</li>';
                    // testArrayOfImage(host + bannerSrc, isValidBannerToSelection, i);
                }
                displaySearchParameter();
            } else {
                const data = {
                    message:"empty"
                };
                companyDetailsJsonObj2.push(data);
            }
        },
    });
}

document.getElementById('product_service_input').style.display = 'block';
document.getElementById('company_name_input').style.display = 'none';

document.getElementById('searchByProductOrCompanyName').onchange = function () {
    let searchByProductOrCompanyNameValue = this.value;

    if (searchByProductOrCompanyNameValue === 'product_service') {
        document.getElementById('product_service_input').style.display = 'block';
        document.getElementById('company_name_input').style.display = 'none';
    }
    if (searchByProductOrCompanyNameValue === 'company_name') {
        document.getElementById('product_service_input').style.display = 'none';
        document.getElementById('company_name_input').style.display = 'block';
    }
};

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
        url: host + '/api/get/minor-sub-categories-by-id/' + id,
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

function formattingBusinessTags(string) {
    if (string) {
        let data = string.split(',');
        for (var i = 0; i < data.length; i++) {
            document.getElementById('selection-business-industry-belong').innerHTML =
                document.getElementById('selection-business-industry-belong').innerHTML +
                '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' +
                data[i] +
                '</a>';
        }
    } else {
        document.getElementById('selection-business-industry-belong').innerHTML = 'N/A';
    }
}

function formattingLanguageName(string) {
    let data = string.split(',');
    for (var i = 0; i < data.length; i++) {
        document.getElementById('selection-business-language-of-communication').innerHTML =
            document.getElementById('selection-business-language-of-communication').innerHTML +
            '<a href="#" class="bg-gray-200 py-1.5 px-4 rounded-full">' +
            getLanguageNameByCode(data[i]) +
            '</a>';
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

function displayTopCompanyDetails(companyName) {
    $('#selection-business-industry-belong').empty();
    $('#selection-business-language-of-communication').empty();

    let leng = companyDetailsJsonObj2[0].length;

    for (let i = 0; i < leng; i++) {
        if (companyDetailsJsonObj2[0][i].business_name === companyName) {
            // console.log(
            //     'function displayCompanyDetailsUsingImageName | companyDetailsJsonObj2[0][i] : ',
            //     companyDetailsJsonObj2[0][i],
            // );
            document.getElementById('selection-company-name').innerHTML = companyDetailsJsonObj2[0][i].business_name;
            if (companyDetailsJsonObj2[0][i].business_tagline) {
                document.getElementById('selection-company-tagline').innerHTML =
                    companyDetailsJsonObj2[0][i].business_tagline;
            }
            // if (companyDetailsJsonObj2[0][i].business_website) {
            //     document.getElementById('selection-company-website').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_website;
            // }
            // if (companyDetailsJsonObj2[0][i].business_email) {
            //     document.getElementById('selection-company-email').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_email;
            // }
            // if (companyDetailsJsonObj2[0][i].business_contact) {
            //     document.getElementById('selection-company-contact').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_contact;
            // }
            // if (companyDetailsJsonObj2[0][i].business_social_media_contact_type) {
            //     document.getElementById('selection-business-social-media-contact-type').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_social_media_contact_type;
            // }
            // if (companyDetailsJsonObj2[0][i].business_social_media_contact_number) {
            //     document.getElementById('selection-business-social-media-contact-number').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_social_media_contact_number;
            // }
            // if (companyDetailsJsonObj2[0][i].business_address) {
            //     document.getElementById('selection-business-address').innerHTML =
            //         companyDetailsJsonObj2[0][i].business_address;
            // }
            if (companyDetailsJsonObj2[0][i].business_language_of_communication) {
                //document.getElementById('selection-business-language-of-communication').innerHTML =
                formattingLanguageName(companyDetailsJsonObj2[0][i].business_language_of_communication);
            }
            if (companyDetailsJsonObj2[0][i].business_major_category) {
                document.getElementById('selection-business-major-category').innerHTML = getTradeCategoriesTitleById(
                    companyDetailsJsonObj2[0][i].business_major_category,
                );
            }
            if (companyDetailsJsonObj2[0][i].business_sub_category) {
                document.getElementById('selection-business-sub-category').innerHTML = getSubCategoriesTitleById(
                    companyDetailsJsonObj2[0][i].business_sub_category,
                );
            }
            if (companyDetailsJsonObj2[0][i].business_minor_sub_category) {
                document.getElementById('selection-business-minor-sub-category').innerHTML =
                    getMinorSubCategoriesTitleById(companyDetailsJsonObj2[0][i].business_minor_sub_category);
            }
            if (companyDetailsJsonObj2[0][i].business_scale) {
                document.getElementById('selection-business-scale').innerHTML = getBusinessScaleTitle(
                    companyDetailsJsonObj2[0][i].business_scale,
                );
            }
            if (companyDetailsJsonObj2[0][i].business_industry_belong_to) {
                // document.getElementById('selection-business-industry-belong').innerHTML =
                formattingBusinessTags(companyDetailsJsonObj2[0][i].business_industry_belong_to);
            }
            getCountryNameUsingCode(
                companyDetailsJsonObj2[0][i].country_of_operation,
                'selection-company-country-of-operations',
            );
            getStatesNameToBeDisplayUsingCode(
                companyDetailsJsonObj2[0][i].states_of_operation,
                'selection-company-state-of-operations',
            );
            getCityNameToBeDisplayUsingCode(
                companyDetailsJsonObj2[0][i].city_of_operation,
                'selection-company-city-of-operations',
            );
            // getCountryNameUsingCode(companyDetailsJsonObj2[0][i].business_country, 'selection-company-country');
            // getStatesNameToBeDisplayUsingCode(companyDetailsJsonObj2[0][i].business_states, 'selection-company-state');
            // getCityNameToBeDisplayUsingCode(companyDetailsJsonObj2[0][i].business_city, 'selection-company-city');
            if (companyDetailsJsonObj2[0][i].region_of_operation) {
                document.getElementById('selection-company-region-of-operations').innerHTML =
                    companyDetailsJsonObj2[0][i].region_of_operation;
            } else {
                document.getElementById('selection-company-region-of-operations').innerHTML = 'N/A';
            }

            $('#companiesProfilePicture').empty();
            let bannerTitle = getCompaniesProfilePicture(
                companyDetailsJsonObj2[0][i].id,
                companyDetailsJsonObj2[0][i].uuid,
            );
            // console.log('function displayTopCompanyDetails(companyName) | banner: ', bannerTitle[0].banner);
            companiesProfilePicture.innerHTML =
                companiesProfilePicture.innerHTML +
                '<li>' +
                '<img src="' +
                host +
                '/uploads/users_upload_files/' +
                bannerTitle[0].banner +
                '" alt="" uk-cover>' +
                '</li>';
        }
    }
}

document.getElementById('selectionRegionOfOperation').addEventListener('change', function () {
    selectionSearchParameter();
});

document.getElementById('selectionCountry').addEventListener('change', function () {
    getStatesOptions('selectionCountry', 'selectionState', 'selectionCity');
    selectionSearchParameter();
});

document.getElementById('selectionState').addEventListener('change', function () {
    getCitiesOptions('selectionCountry', 'selectionState', 'selectionCity');
    selectionSearchParameter();
});

document.getElementById('selectionCity').addEventListener('change', function () {
    selectionSearchParameter();
});

document.getElementById('language').addEventListener('change', function () {
    selectionSearchParameter();
});

document.getElementById('business_scale').addEventListener('change', function () {
    selectionSearchParameter();
});

document.getElementById('trade-categories').addEventListener('change', function () {
    selectionSearchParameter();
});

document.getElementById('sub-categories').addEventListener('change', function () {
    selectionSearchParameter();
});

document.getElementById('minor-sub-categories').addEventListener('change', function () {
    selectionSearchParameter();
});

document.getElementById('product_service_input').addEventListener('change', function () {
    selectionSearchParameter();
});

document.getElementById('company_name_input').addEventListener('change', function () {
    selectionSearchParameter();
});

document.getElementById('trade-categories').addEventListener('change', function () {
    selectionSearchParameter();
});

function selectionSearchParameter() {
    

    let regionOfOperationCode = document.getElementById('selectionRegionOfOperation').value;
    let countryCode = document.getElementById('selectionCountry').value;
    let selectionState = document.getElementById('selectionState').value;
    let selectionCity = document.getElementById('selectionCity').value;
    let language = document.getElementById('language').value;
    let business_scale = document.getElementById('business_scale').value;
    let trade_categories = document.getElementById('trade-categories').value;
    let sub_categories = document.getElementById('sub-categories').value;
    let minor_sub_categories = document.getElementById('minor-sub-categories').value;
    let product_service_input = document.getElementById('product_service_input').value;
    let company_name_input = document.getElementById('company_name_input').value;

    $.ajax({
        url: '/api/post/selection-search-parameter',
        type: 'POST',
        data: {
            regionOfOperationCode: regionOfOperationCode,
            countryCode: countryCode,
            selectionState: selectionState,
            selectionCity: selectionCity,
            language: language,
            business_scale: business_scale,
            trade_categories: trade_categories,
            sub_categories: sub_categories,
            minor_sub_categories: minor_sub_categories,
            product_service_input: product_service_input,
            company_name_input: company_name_input,
        },
        success: function (data) {
            // value = data;

            // console.log('function getCompaniesRelatedToCurrentUser() | data.length :', data.length);
            // console.log('function getCompaniesRelatedToCurrentUser() | data :', data);
            if (data.length == 0) {
                replaceDashCompanyDetailsDiv();
                //getCompaniesRelatedToCurrentUser();
                // displaySearchParameter();
            } else {
                emptyCompanyDetailsDiv();
                while (companyDetailsJsonObj2.length > 0) {
                    companyDetailsJsonObj2.pop();
                }
                companyDetailsJsonObj2.push(data);
                // console.log('/api/post/selection-search-parameter | data', data);
                // console.log('/api/post/selection-search-parameter | companyDetailsJsonObj2', companyDetailsJsonObj2);
                companiesProfilePicture.innerHTML = '';
                // for (var i = 0; i < data.length; i++) {
                for (var i = data.length - 1; i > -1; i--) {
                    let bannerTitle = getCompaniesProfilePicture(data[i]['id'], data[i]['uuid']);

                    companiesProfilePicture.innerHTML =
                        companiesProfilePicture.innerHTML +
                        '<li>' +
                        '<img src="' +
                        host +
                        '/uploads/users_upload_files/' +
                        bannerTitle[0].banner +
                        '" alt="" uk-cover>' +
                        '</a>';
                }
                displayFirstCompanyDetails();
                displayTopCompany();
                // displaySearchParameter();
            }

            while (dataForDisplaySearchParameter.length > 0) {
                dataForDisplaySearchParameter.pop();
            }
            const dataSearchParameter = {
                business_major_category: trade_categories,
                business_sub_category: sub_categories,
                business_minor_sub_category: minor_sub_categories,
                region_of_operation: regionOfOperationCode,
                country_of_operation: countryCode,
                states_of_operation: selectionState
            };
            dataForDisplaySearchParameter.push(dataSearchParameter);
            displaySearchParameter();
        },
    });
}

function replaceDashCompanyDetailsDiv() {
    // $('#companiesProfilePicture').empty();
    $('#top-selection-results').empty();
    $('#selections-next-slide').hide();
    $('#selections-prev-slide').hide();

    document.getElementById('selection-company-name').innerHTML = '-';
    document.getElementById('selection-company-tagline').innerHTML = '-';
    document.getElementById('selection-business-language-of-communication').innerHTML = '-';
    document.getElementById('selection-business-major-category').innerHTML = '-';
    document.getElementById('selection-business-sub-category').innerHTML = '-';
    document.getElementById('selection-business-minor-sub-category').innerHTML = '-';
    document.getElementById('selection-business-industry-belong').innerHTML = '-';
    document.getElementById('selection-company-name').innerHTML = '-';
    document.getElementById('selection-company-country-of-operations').innerHTML = '-';
    document.getElementById('selection-company-state-of-operations').innerHTML = '-';
    document.getElementById('selection-company-city-of-operations').innerHTML = '-';
    document.getElementById('selection-company-region-of-operations').innerHTML = '-';
    document.getElementById('selection-business-scale').innerHTML = '-';
    document.getElementById('operating-time').innerHTML = '-';

    noRecordFoundImageSrc();
    showRandomChoices();
}

function noRecordFoundImageSrc() {
    let noRecordFoundImageSrc = host + '/uploads/placeholder/no-record-found.jpg';

    companiesProfilePicture.innerHTML =
    '<li>' +
    '<img src="' +
    noRecordFoundImageSrc +
    '" id="companyBannerPreview" alt="" uk-cover>' +
    '</li>';


    Swal.fire('Info', 'No record found related to your personal data. Allow us to give you random choices.', 'info');
}


function showRandomChoices() {
    setTimeout(function () {
        $.ajax({
            url: '/api/get/get-random-companies',
            type: 'POST',
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    emptyCompanyDetailsDiv();
                    while (companyDetailsJsonObj2.length > 0) {
                        companyDetailsJsonObj2.pop();
                    }
                    companyDetailsJsonObj2.push(data);
                    companiesProfilePicture.innerHTML = '';
                    for (var i = data.length - 1; i > -1; i--) {
                        let bannerTitle = getCompaniesProfilePicture(data[i]['id'], data[i]['uuid']);

                        companiesProfilePicture.innerHTML =
                            companiesProfilePicture.innerHTML +
                            '<li>' +
                            '<img src="' +
                            host +
                            '/uploads/users_upload_files/' +
                            bannerTitle[0].banner +
                            '" alt="" uk-cover>' +
                            '</a>';
                    }
                    displayFirstCompanyDetails();
                    displayTopCompany();
                }
            },
        });
    }, 3 * 1000);
}

function emptyCompanyDetailsDiv() {
    $('#companiesProfilePicture').empty();
    $('#top-selection-results').empty();
    $('#selections-next-slide').show();
    $('#selections-prev-slide').show();

    $('#selection-company-name').empty();
    $('#selection-company-tagline').empty();
    $('#selection-business-language-of-communication').empty();
    $('#selection-business-major-category').empty();
    $('#selection-business-sub-category').empty();
    $('#selection-business-minor-sub-category').empty();
    $('#selection-business-industry-belong').empty();
    $('#selection-company-country-of-operations').empty();
    $('#selection-company-state-of-operations').empty();
    $('#selection-company-city-of-operations').empty();
    $('#selection-company-region-of-operations').empty();
    $('#selection-business-scale').empty();
    $('#operating-time').empty();
}

// $('.uk-active uk-transition-active')[0].click(function() {
//     alert('hohoho');
//   });

$('#companiesProfilePicture').click(function () {
    // get the active parent div to get the active image
    activeDivOfCarousel = getEcN('uk-active uk-transition-active')[0];
    // console.log("getEcN('uk-active uk-transition-active')[0]: ", activeDivOfCarousel);
    // get the active image inside parent div
    activeImageOfCarousel = activeDivOfCarousel.getElementsByTagName('img')[0];
    // get the image src
    imageSrcOfActiveImageInCarousel = activeImageOfCarousel.getAttribute('src');
    // remove "uploads/" part of image src name
    imageNameOfActiveImageInCarousel = imageSrcOfActiveImageInCarousel.split('/').pop();
    // exclude extension from filename
    //fileNameOfActiveImageInCarousel = imageNameOfActiveImageInCarousel.split('.').slice(0, -1).join('.');

    openCommunicator(imageNameOfActiveImageInCarousel);

    //console.log(imageNameOfActiveImageInCarousel);

    // window.open(
    //     "https://www.yourURL.com", "_blank");
});

// function openCommunicator(filename) {
//     let leng = companyDetailsJsonObj2[0].length;

//     for (let i = 0; i < leng; i++) {
//         if (companyDetailsJsonObj2[0][i].banner === filename) {
//             window.open(companyDetailsJsonObj2[0][i].communicator, '_blank');
//             // console.log(
//             //     'function displayCompanyDetailsUsingImageName | companyDetailsJsonObj2[0][i].communicator : ',
//             //     companyDetailsJsonObj2[0][i].communicator,
//             // );
//         }
//     }
// }


function openCommunicator(filename) {
    let leng = companyDetailsJsonObj2[0].length;
    let companyName;
    let communicator_link;

    for (let i = 0; i < leng; i++) {
        if (companyDetailsJsonObj2[0][i].banner === filename) {
            companyName = companyDetailsJsonObj2[0][i].business_name;
            communicator_link = companyDetailsJsonObj2[0][i].communicator;
            trader_uuid = companyDetailsJsonObj2[0][i].uuid;
        }
    }

    Swal.fire({
        title: '',
        text: `Do you want to download the details of ${companyName} Company ?`,
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Proceed to call',
        denyButtonText: 'Download',
        denyButtonColor: 'blue',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
            // Swal.fire('Saved!', '', 'success')
            // window.open(communicator_link, '_blank');
            recordTheMeetingOfVisitorAndTrader(trader_uuid, communicator_link);
        } else if (result.isDenied) {
            downloadCurrentTraderData(trader_uuid);
        }
      })
}

function recordTheMeetingOfVisitorAndTrader(trader_uuid, communicator_link) {
    $.ajax({
        url: '/api/post/record-the-meeting-of-visitor-and-trader',
        type: 'POST',
        data: { trader_uuid: trader_uuid },
        success: function (res) {
            console.log('recordTheMeetingOfVisitorAndTrader res', res);
            console.log('recordTheMeetingOfVisitorAndTrader res.length', res.length);
            console.log('recordTheMeetingOfVisitorAndTrader res.id', res.id);
            if (res.id > 0) {
                const domainLink = 'https://meet2.allworldtrade.com/groupcall/'
                window.open(domainLink + communicator_link, '_blank');
            } else {

            }

        },
    });
}

function downloadCurrentTraderData(trader_uuid) {
    // $.ajax({
    //     url: '/api/post/get-current-visitor',
    //     type: 'POST',
    //     success: function (res) {
    //         if (res.length > 0) {
    //             window.location = host + '/download-current-visitor-data';
    //         } else {

    //         }

    //     },
    // });

    $.ajax({
        url: '/api/post/get-current-trader',
        type: 'POST',
        data: { trader_uuid: trader_uuid },
        success: function (res) {
            window.location = host + '/download-current-trader-data';
            // if (res.length > 0) {
            //     window.location = host + '/download-current-trader-data';
            // } else {

            // }

        },
    });
}