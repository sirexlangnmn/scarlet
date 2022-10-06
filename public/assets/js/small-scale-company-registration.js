let btnRegistration;

let password;
let plainPassword;
let confirmPassword;
let hashedPassword;
let plainPasswordInput;
let hashedPasswordInput;

btnRegistration = getId('btnRegistration');

password = getId('password');
plainPassword = getId('plainPassword');
confirmPassword = getId('confirmPassword');
hashedPassword = getId('hashedPassword');
plainPasswordInput = getId('plainPasswordInput');
hashedPasswordInput = getId('hashedPasswordInput');

hashedPasswordInput.style.display = 'none';
plainPasswordInput.style.display = 'none';

// consume api to get all languages
async function getLanguages() {
    let response = await fetch(host + '/api/get/languages');
    let data = await response.json();
    return data;
}

// display all languages in frontend select option
getLanguages().then((data) => {
    language.innerHTML = '<option value="select">Select</option>';
    for (var i = 0; i < data.length; i++) {
        language.innerHTML =
            language.innerHTML + '<option value="' + data[i]['code'] + '">' + data[i]['name'] + '</option>';
    }
});

password.onkeyup = function () {
    hashedPasswordProcess();
    required(password, passwordValidation, 'Password');
};

function hashedPasswordProcess() {
    let inputPassword = password.value;
    plainPassword.value = inputPassword;

    if (inputPassword !== '') {
        $.ajax({
            url: '/api/post/password-hashing',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                password: inputPassword,
            }),
            success: function (response) {
                // console.log('hashedPasswordProcess');
                // console.log(response);
                hashedPassword.value = response;
            },
        });
    } else {
        hashedPassword.value = '';
    }
}

password.addEventListener('blur', function () {
    passwordComparison('password', 'confirmPassword');
});

confirmPassword.addEventListener('blur', function () {
    passwordComparison('password', 'confirmPassword');
});

function passwordComparison(tags1, tags2) {
    let password1 = document.getElementById(tags1).value;
    let password2 = document.getElementById(tags2).value;
    if (password2 !== '') {
        if (password1 === password2) {
        } else {
            Swal.fire('Warning', 'Password does not match.', 'warning');
        }
    }
}

btnRegistration.addEventListener('click', (e) => {
    // registrationUploadBusinessMedias(1);
    //stop submit the form, we will post it manually.
    e.preventDefault();

    const form = $('#lookingForSmallScaleCompanyForm');
    let validation = registrationValidation();
    console.log("validation");
    console.log(validation);

    if (validation === 'true') {
        //     //if (validation != '') {
        $.ajax({
            url: '/api/post/looking-for-small-scale-company-registration',
            type: 'post',
            data: form.serialize(),
        }).done((res) => {
            console.log(res);
            if (res.id) {
                registrationUploadBusinessMedias(res.uuid);
                registrationEmailVerification(res.uuid, res.verification_code, res.email_or_social_media);
                Swal.fire('Success', 'Registration Success.', 'success');
            }

            // if (res.message) {
            //     tradersRegistrationServerValidation(res.message);
            // }
        });
    } else {
        Swal.fire('Warning', 'At least one required field is incomplete.', 'warning');
    }
});
