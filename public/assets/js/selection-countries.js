let selectionRegionOfOperation;
selectionRegionOfOperation = getId('selectionRegionOfOperation');

$(function () {
    getUsersAddress();
});

function getUsersAddress() {
    $.ajax({
        url: '/api/get/users-address',
        type: 'POST',
        success: function (data) {
            //console.log('function getUsersAddress()', data);
            getCountryOfOperation(data, 'selectionCountry');
            getStatesLocation(data, 'selectionState');
            getCityLocation(data, 'selectionCity');
        },
    });
}

function getCountryOfOperation(value, elementId) {
    fetch('assets/json/countries.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            // console.log('global-countries.js | function getBusinessCountryLocationToBeEditAndOptions(value, elementId)');
            // console.log(data);
            // console.log(value);

            let countryCode = value[0].country;

            if (countryCode == null || countryCode == '') {
                document.getElementById(elementId).innerHTML = '<option value="" >Any</option>';
            } else {
                let filtered = data.filter((d) => d.iso2 == countryCode);
                document.getElementById(elementId).innerHTML =
                    '<option value="' + filtered[0].iso2 + '" >' + filtered[0].name + '</option>';
                document.getElementById(elementId).innerHTML += '<option value="" >Any</option>';
            }

            for (var i = 0; i < data.length; i++) {
                document.getElementById(elementId).innerHTML =
                    document.getElementById(elementId).innerHTML +
                    '<option value="' +
                    data[i].iso2 +
                    '">' +
                    data[i].name +
                    '</option>';
            }

            $('#' + elementId).selectpicker('refresh');
        });
}

// function getStatesLocation(value, elementId) {
//     console.log('getStatesLocation() | value', value); 
//     fetch('assets/json/states.json')
//         .then(function (resp) {
//             return resp.json();
//         })
//         .then(function (data) {
//             let filtered = data.filter((d) => d.country_code == value[0].country);
//             let filtered2 = filtered.filter((x) => x.id == value[0].state_or_province);

//             document.getElementById(elementId).innerHTML =
//                 '<option value="' + filtered2[0].id + '" >' + filtered2[0].name + '</option>';
//             document.getElementById(elementId).innerHTML += '<option value="" >Any</option>';

//             for (var i = 0; i < filtered.length; i++) {
//                 let option = document.createElement('option');
//                 option.value = filtered[i].id;
//                 option.innerHTML = filtered[i].name;
//                 document.getElementById(elementId).appendChild(option);
//             }

//             $('#' + elementId).selectpicker('refresh');
//         });
// }

function getStatesLocation(value, elementId) {
    if (value[0].state_or_province == 'No States Found') {
        document.getElementById(elementId).innerHTML =
            '<option value="No States Found" >No States Found</option>';
    } else {
        fetch('assets/json/states.json')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            let state_code = value[0].state_or_province;
            let countryCode = value[0].country;

            let filtered = data.filter((d) => d.id == state_code);

            document.getElementById(elementId).innerHTML =
                '<option value="' + filtered[0].id + '" >' + filtered[0].name + '</option>';

            for (var i = 0; i < data.length; i++) {
                if (data[i].country_code === countryCode) {
                    let option = document.createElement('option');
                    option.value = data[i].id;
                    option.innerHTML = data[i].name;
                    document.getElementById(elementId).appendChild(option);
                }

                if (i + 1 == data.length) {
                    $('#' + elementId).selectpicker('refresh');
                }
            }
        });
    }
}

// function getCityLocation(value, elementId) {
//     fetch('assets/json/cities.json')
//         .then(function (resp) {
//             return resp.json();
//         })
//         .then(function (data) {
//             let filtered = data.filter((d) => d.country_code == value[0].country);
//             let filtered2 = filtered.filter((x) => x.state_id == value[0].state_or_province);

//             document.getElementById(elementId).innerHTML = '<option value="" >Any</option>';

//             for (var i = 0; i < filtered2.length; i++) {
//                 let option = document.createElement('option');
//                 option.value = filtered2[i].id;
//                 option.innerHTML = filtered2[i].name;
//                 document.getElementById(elementId).appendChild(option);
//             }

//             $('#' + elementId).selectpicker('refresh');
//         });
// }

function getCityLocation(value, elementId) {
    if (value[0].city == 'No Cities Found') {
        document.getElementById(elementId).innerHTML = '<option value="No Cities Found" >No Cities Found</option>';
    } else {
        fetch('assets/json/cities.json')
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                let filtered = data.filter((d) => d.country_code == value[0].country);
                let filtered2 = filtered.filter((x) => x.state_id == value[0].state_or_province);
                let filtered3 = filtered.filter((x) => x.id == value[0].city);

                document.getElementById(elementId).innerHTML =
                    '<option value="' + filtered3[0].id + '" >' + filtered3[0].name + '</option>';

                for (var i = 0; i < filtered2.length; i++) {
                    let option = document.createElement('option');
                    option.value = filtered2[i].id;
                    option.innerHTML = filtered2[i].name;
                    document.getElementById(elementId).appendChild(option);

                    if (i + 1 == filtered2.length) {
                        $('#' + elementId).selectpicker('refresh');
                    }
                }
            });
    }
}


// consume api to get all global region
async function getGlobalRegion() {
    let response = await fetch(host + '/api/get/region-of-operations');
    let data = await response.json();
    return data;
}

// display all trade categories in frontend select option
getGlobalRegion().then((data) => {
    selectionRegionOfOperation.innerHTML = '<option value="" selected>Any</option>';
    for (var i = 0; i < data.length; i++) {
        selectionRegionOfOperation.innerHTML =
            selectionRegionOfOperation.innerHTML +
            '<option value="' +
            data[i]['iso'] +
            '">' +
            data[i]['name'] +
            '</option>';
    }
});

