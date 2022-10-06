$(function () {
    getUser();
    getUsersAddress();
    getUsersAccount();
    getCompanyDetails();
    getUserBusinessCharacteristics();
});

function getUser() {
    $.ajax({
        url: '/api/get/user',
        type: 'POST',
        success: function (data) {
            document.getElementById('firstName').value = data[0].first_name;
            document.getElementById('lastName').value = data[0].last_name;
            document.getElementById('middleName').value = data[0].middle_name;
        },
    });
}

function getUsersAddress() {
    $.ajax({
        url: '/api/get/users-address',
        type: 'POST',
        success: function (data) {
            console.log('getUsersAddress', data);
            getCountryLocation(data, 'country');
            // getStatesLocation(data, 'states');
            getUsersStatesLocationToBeEditAndOptions(data, 'states');
            // getCityLocation(data, 'city');
            getUsersCityLocationToBeEditAndOptions(data, 'city');
        },
    });
}

function getUsersAccount() {
    $.ajax({
        url: '/api/get/users-account',
        type: 'POST',
        success: function (data) {
            document.getElementById('personalSocialMediaContactNumber').value = data[0].contact_number;
            getSocialMediaContactType(data[0].social_media_contact_type, 'personalSocialMediaContactType');
        },
    });
}

function getCompanyDetails() {
    $.ajax({
        url: '/api/get/company-details',
        type: 'POST',
        success: function (data) {
            console.log('getCompanyDetails', data);
            document.getElementById('companyName').value = data[0].business_name;
            document.getElementById('tagline').value = data[0].business_tagline;
            document.getElementById('businessAddress').value = data[0].business_address;
            document.getElementById('website').value = data[0].business_website;
            document.getElementById('businessEmailAddress').value = data[0].business_email;
            document.getElementById('businessContactNumber').value = data[0].business_contact;
            document.getElementById('businessSocialMediaContactNumber').value = data[0].business_social_media_contact_number;
            document.getElementById('currentLanguagesOfCommunication').value = data[0].business_language_of_communication;
            getBusinessSocialMediaContactType(data[0].business_social_media_contact_type);
            getBusinessCountryLocationToBeEditAndOptions(data, 'businessCountryLocation');
            getBusinessStatesLocationToBeEditAndOptions(data, 'businessStatesLocation');
            getBusinessCityLocationToBeEditAndOptions(data, 'businessCityLocation');
        },
    });
}


// consume api to get all languages
async function getLanguages() {
    let response = await fetch(host + '/api/get/languages');
    let data = await response.json();
    return data;
}

// display all languages in frontend select option
getLanguages().then((data) => {
    document.getElementById('editLanguagesOfCommunication').innerHTML = '<option value="" disabled>Status Quo</option>';
    for (var i = 0; i < data.length; i++) {
        document.getElementById('editLanguagesOfCommunication').innerHTML =
            document.getElementById('editLanguagesOfCommunication').innerHTML +
            '<option value="' +
            data[i]['code'] +
            '">' +
            data[i]['name'] +
            '</option>';
    }
});


document.getElementById('businessCountryLocation').addEventListener('change', function () {
    $('#businessStatesLocation').empty();
    $('#businessCityLocation').empty();

    let traderBusinessCountryCode = this.value;

    fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            if (filtered.length) {
                for (var i = 0; i < filtered.length; i++) {
                    document.getElementById('businessStatesLocation').innerHTML =
                        document.getElementById('businessStatesLocation').innerHTML +
                        '<option value="' +
                        filtered[i].id +
                        '">' +
                        filtered[i].name +
                        '</option>';
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No States Found';
                option.innerHTML = 'No States Found';
                document.getElementById('businessStatesLocation').appendChild(option);
            }

            $('#businessStatesLocation').selectpicker('refresh');
        });

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_id = document.getElementById('businessStatesLocation').value;
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            if (filtered.length) {
                for (var i = 0; i < filtered.length; i++) {
                    if (filtered[i].state_id == state_id) {
                        document.getElementById('businessCityLocation').innerHTML =
                            document.getElementById('businessCityLocation').innerHTML +
                            '<option value="' +
                            filtered[i].id +
                            '">' +
                            filtered[i].name +
                            '</option>';
                    }
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No Cities Found';
                option.innerHTML = 'No Cities Found';
                document.getElementById('businessCityLocation').appendChild(option);
            }

            $('#businessCityLocation').selectpicker('refresh');
        });
});

document.getElementById('businessStatesLocation').addEventListener('change', function () {
    $('#businessCityLocation').empty();

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_id = document.getElementById('businessStatesLocation').value;
            let traderResidenceCountryCode = document.getElementById('businessCountryLocation').value;
            let filtered = data.filter((d) => d.country_code == traderResidenceCountryCode);
            let filtered2 = filtered.filter((x) => x.state_id == state_id);

            if (filtered2.length) {
                for (var i = 0; i < filtered2.length; i++) {
                    document.getElementById('businessCityLocation').innerHTML =
                        document.getElementById('businessCityLocation').innerHTML +
                        '<option value="' +
                        filtered2[i].id +
                        '">' +
                        filtered2[i].name +
                        '</option>';
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No Cities Found';
                option.innerHTML = 'No Cities Found';
                document.getElementById('businessCityLocation').appendChild(option);
            }

            $('#businessCityLocation').selectpicker('refresh');
        });
});

function getUserBusinessCharacteristics() {
    $.ajax({
        url: '/api/get/user-business-characteristics',
        type: 'POST',
        success: function (value) {
            // getTradeCategoriesFunction(value);
            // getSubCategoriesByTradeCategoryIdFunction(value);
            // getMinorSubCategoriesByIdFunction(value);
            // getTradeCategoriesFunction(value);
            getTradeCategoriesToBeEditAndOptions(value, 'editTradeCategory');
            getSubCategoriesToBeEditAndOptions(value, 'traderSubCategoryToggleField1', 'traderSubCategoryToggleField2');
            getMinorSubCategoryToBeEditAndOptions(
                value,
                'minorSubCategories',
                'minorSubCategory',
                'minorSubCategoryInput',
            );
        },
    });
}

editTradeCategory.addEventListener('change', function () {
    let tradeCategoryId = this.value;

    document.getElementById('minorSubCategory').value = '';
    document.getElementById('minorSubCategoryInput').value = '';
    $('#minorSubCategories').empty();

    getSubCategoriesOptionsWhenTradeCategoryChange(tradeCategoryId, 'traderSubCategoryToggleField1');
});

traderSubCategoryToggleField1.addEventListener('change', function () {
    let subCategoryId = this.value;

    document.getElementById('minorSubCategory').value = '';
    document.getElementById('minorSubCategoryInput').value = '';
    $('#minorSubCategories').empty();

    if (this.options[this.selectedIndex].value == 'customOption') {
        toggleField(this, this.nextSibling);
        this.selectedIndex = '0';
    }

    getMinorSubCategoriesOptionsWhenSubCategoryChange(subCategoryId, 'minorSubCategories');
});

traderSubCategoryToggleField2.addEventListener('blur', function () {
    if (this.value == '') {
        toggleField(this, this.previousSibling);
    }
});


function toggleField(hideObj, showObj) {
    hideObj.disabled = true;
    hideObj.style.display = 'none';
    showObj.disabled = false;
    showObj.style.display = 'inline';
    showObj.focus();
}

document.getElementById('minorSubCategory').addEventListener('change', function () {
    getMinorSubCategoryForInitialInputValue('minorSubCategory', 'minorSubCategoryInput');
});

document.getElementById('minorSubCategory').addEventListener('blur', function () {
    getMinorSubCategoryForInitialInputValue('minorSubCategory', 'minorSubCategoryInput');
});


function getCountryLocation(value, elementId) {
    fetch('assets/json/countries.json')
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        let filtered = data.filter((d) => d.iso2 == value[0].country);

        document.getElementById(elementId).innerHTML =
            '<option value="' + filtered[0].iso2 + '" >' + filtered[0].name + '</option>';

        for (var i = 0; i < data.length; i++) {
            document.getElementById(elementId).innerHTML =
            document.getElementById(elementId).innerHTML +
                '<option value="' +
                data[i].iso2 +
                '">' +
                data[i].name +
                '</option>';
        }
        $("#"+elementId).selectpicker('refresh');
    });
}



document.getElementById("country").addEventListener('change', function () {
    $('#states').empty();
    $('#city').empty();

    let traderBusinessCountryCode = this.value;

    fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            if (filtered.length) {
                for (var i = 0; i < filtered.length; i++) {
                    document.getElementById("states").innerHTML =
                    document.getElementById("states").innerHTML +
                        '<option value="' +
                        filtered[i].id +
                        '">' +
                        filtered[i].name +
                        '</option>';
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No States Found';
                option.innerHTML = 'No States Found';
                document.getElementById("states").appendChild(option);
            }

            $('#states').selectpicker('refresh');
        });

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_id = document.getElementById("states").value;
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            if (filtered.length) {
                for (var i = 0; i < filtered.length; i++) {
                    if (filtered[i].state_id == state_id) {
                        document.getElementById("city").innerHTML =
                        document.getElementById("city").innerHTML +
                            '<option value="' +
                            filtered[i].id +
                            '">' +
                            filtered[i].name +
                            '</option>';
                    }
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No Cities Found';
                option.innerHTML = 'No Cities Found';
                document.getElementById("city").appendChild(option);
            }

            $('#city').selectpicker('refresh');
        });
});

document.getElementById("country").addEventListener('change', function () {
    $('#states').empty();
    $('#city').empty();

    let traderBusinessCountryCode = this.value;

    fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            if (filtered.length) {
                for (var i = 0; i < filtered.length; i++) {
                    document.getElementById("states").innerHTML =
                    document.getElementById("states").innerHTML +
                        '<option value="' +
                        filtered[i].id +
                        '">' +
                        filtered[i].name +
                        '</option>';
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No States Found';
                option.innerHTML = 'No States Found';
                document.getElementById("states").appendChild(option);
            }

            $('#states').selectpicker('refresh');
        });

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_id = document.getElementById("states").value;
            let filtered = data.filter((d) => d.country_code == traderBusinessCountryCode);

            if (filtered.length) {
                for (var i = 0; i < filtered.length; i++) {
                    if (filtered[i].state_id == state_id) {
                        document.getElementById("city").innerHTML =
                        document.getElementById("city").innerHTML +
                            '<option value="' +
                            filtered[i].id +
                            '">' +
                            filtered[i].name +
                            '</option>';
                    }
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No Cities Found';
                option.innerHTML = 'No Cities Found';
                document.getElementById("city").appendChild(option);
            }

            $('#city').selectpicker('refresh');
        });
});

document.getElementById("states").addEventListener('change', function () {
    $('#city').empty();

    fetch('assets/json/cities.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_id = document.getElementById("states").value;
            let traderResidenceCountryCode = document.getElementById("country").value;
            let filtered = data.filter((d) => d.country_code == traderResidenceCountryCode);
            let filtered2 = filtered.filter((x) => x.state_id == state_id);

            if (filtered2.length) {
                for (var i = 0; i < filtered2.length; i++) {
                    document.getElementById("city").innerHTML =
                    document.getElementById("city").innerHTML +
                        '<option value="' +
                        filtered2[i].id +
                        '">' +
                        filtered2[i].name +
                        '</option>';
                }
            } else {
                let option = document.createElement('option');
                option.value = 'No Cities Found';
                option.innerHTML = 'No Cities Found';
                document.getElementById("city").appendChild(option);
            }

            $('#city').selectpicker('refresh');
        });
});


function getBusinessSocialMediaContactType(value) {
    let jsonObj =
        '{ "companyDetails" : [' +
        '{ "id":"1" , "title":"Viber" },' +
        '{ "id":"2" , "title":"Wechat" },' +
        '{ "id":"3" , "title":"Whatsapp" } ]}';

    const parsedObj = JSON.parse(jsonObj);
    let companyDetails = parsedObj.companyDetails;

    let filtered = companyDetails.filter((d) => d.id == value);

    document.getElementById('businessSocialMediaContactType').innerHTML =
        '<option value="' + filtered[0].id + '">' + filtered[0].title + '</option>';
    for (var i = 0; i < companyDetails.length; i++) {
        document.getElementById('businessSocialMediaContactType').innerHTML =
        document.getElementById('businessSocialMediaContactType').innerHTML +
            '<option value="' +
            companyDetails[i]['id'] +
            '">' +
            companyDetails[i]['title'] +
            '</option>';
    }
}

function getSocialMediaContactType(value, elementId) {
    let jsonObj =
        '{ "companyDetails" : [' +
        '{ "id":"1" , "title":"Viber" },' +
        '{ "id":"2" , "title":"Wechat" },' +
        '{ "id":"3" , "title":"Whatsapp" } ]}';

    const parsedObj = JSON.parse(jsonObj);
    let companyDetails = parsedObj.companyDetails;

    let filtered = companyDetails.filter((d) => d.id == value);

    document.getElementById(elementId).innerHTML =
        '<option value="' + filtered[0].id + '">' + filtered[0].title + '</option>';
    for (var i = 0; i < companyDetails.length; i++) {
        document.getElementById(elementId).innerHTML =
        document.getElementById(elementId).innerHTML +
            '<option value="' +
            companyDetails[i]['id'] +
            '">' +
            companyDetails[i]['title'] +
            '</option>';
    }
    $('#' + elementId).selectpicker('refresh');
}

const $form = $('#editLargeScaleForm');

document.getElementById('btnUpdateLargeScale').addEventListener('click', (e) => {
    //stop submit the form, we will post it manually.
    e.preventDefault();


    $.ajax({
        url: '/api/post/update-large-scale-company',
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
});


function backProfile() {
    location.replace(host + '/profile');
}