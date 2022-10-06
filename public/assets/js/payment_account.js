function paymentAccount() {
    // console.log('yes payment account');
    // console.log(sessionEmail);
    $.ajax({
        url: '/api/post/email-payment-account',
        type: 'POST',
        data: {
            email: sessionEmail,
        },
        success: function (data) {
            console.log(data);

            // if (data == 'email sent') {
            //     location.replace(host + '/email-verification');
            // } else {
            //     // in case mag failed yung sending ng email verification pwede pa din mag proceed
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });
}