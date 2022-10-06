const formLogin = $('#formLogin');
formLogin.on('submit', loginSubmitHandler);

function loginSubmitHandler(e) {
    e.preventDefault();

    $.ajax({
        url: '/api/post/login-process',
        type: 'POST',
        data: formLogin.serialize(),
        success: function (res) {
            console.log(res)
            if (res.message === 'found') {
                comparePassword(res.plainPassword, res.hashedPassword);
            } else {
                Swal.fire('Error', 'Please check your email address and password', 'error');
            }
        },
    });
}



function comparePassword(plainPassword, hashedPassword) {
    $.ajax({
        url: '/api/post/compare-password',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            plainPassword: plainPassword,
            hashedPassword: hashedPassword,
        }),
        success: function (res) {
            console.log(res)
            if (res === true) {
                window.location.replace('/profile');
            }
            if (res === false) {
                Swal.fire('Error', 'Please check your email address and password', 'error');
            }
        },
    });
}

function lookingForSmallScaleCompany() {
    location.replace(host + '/registration-for-small-scale-company');
}