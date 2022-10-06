const forgotPasswordForm = $('#forgotPasswordForm');
forgotPasswordForm.on('submit', forgotPasswordSubmitHandler);

function forgotPasswordSubmitHandler(e) {
    e.preventDefault();

    $.ajax({
        url: '/api/post/forgot-password-process',
        type: 'POST',
        data: forgotPasswordForm.serialize(),
        success: function (res) {
            Swal.fire('Success', 'Email Send Successfully', 'success');
            if (res.message === 'found') {
                createResetToken(res.email_or_social_media, res.password, res.uuid);
            } else {
                Swal.fire('Warning', 'Email not found', 'warning');
            }
        },
    });
}


function createResetToken(email, password, uuid) {
    $.ajax({
        url: '/api/post/create-reset-token',
        type: 'POST',
        data: {
            uuid: uuid,
            password: password,
            email_or_social_media: email,
        },
        success: function (data) {
            console.log(data);

            // if (data == 'email sent') {
            //     location.replace(host + '/login');
            // } else {
                
            // }

            if (data.message == 'reset tokens saved') {
                sendEmailForChangePasswordRequest(data)
            } else {
                
            }
         
        },
        error: function (e) {
            // some code here
        },
    });
}

function sendEmailForChangePasswordRequest(data) {
    $.ajax({
        url: '/api/post/send-email-for-change-password',
        type: 'POST',
        data: {
            uuid: data.uuid,
            link: data.link,
            receiverEmailAddress: data.receiverEmailAddress,
        },
        success: function (data) {
            console.log(data);

            if (data == 'email sent') {
                // location.replace(host + '/login');
            } else {
                
            }
         
        },
        error: function (e) {
            // some code here
        },
    });
}

// Exclusive

// // verify a token symmetric - synchronous
// var decoded = jwt.verify(token, 'shhhhh');
// console.log(decoded.foo) // bar
 
// // verify a token symmetric
// jwt.verify(token, 'shhhhh', function(err, decoded) {
//   console.log(decoded.foo) // bar
// });
 
// // invalid token - synchronous
// try {
//   var decoded = jwt.verify(token, 'wrong-secret');
// } catch(err) {
//   // err
// }
 
// // invalid token
// jwt.verify(token, 'wrong-secret', function(err, decoded) {
//   // err
//   // decoded undefined
// });
 
// // verify a token asymmetric
// var cert = fs.readFileSync('public.pem');  // get public key
// jwt.verify(token, cert, function(err, decoded) {
//   console.log(decoded.foo) // bar
// });
 
// // verify audience
// var cert = fs.readFileSync('public.pem');  // get public key
// jwt.verify(token, cert, { audience: 'urn:foo' }, function(err, decoded) {
//   // if audience mismatch, err == invalid audience
// });
 
// // verify issuer
// var cert = fs.readFileSync('public.pem');  // get public key
// jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer' }, function(err, decoded) {
//   // if issuer mismatch, err == invalid issuer
// });
 
// // verify jwt id
// var cert = fs.readFileSync('public.pem');  // get public key
// jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid' }, function(err, decoded) {
//   // if jwt id mismatch, err == invalid jwt id
// });
 
// // verify subject
// var cert = fs.readFileSync('public.pem');  // get public key
// jwt.verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid', subject: 'subject' }, function(err, decoded) {
//   // if subject mismatch, err == invalid subject
// });
 
// // alg mismatch
// var cert = fs.readFileSync('public.pem'); // get public key
// jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, payload) {
//   // if token alg != RS256,  err == invalid signature
// });
 
// // Verify using getKey callback
// // Example uses https://github.com/auth0/node-jwks-rsa as a way to fetch the keys.
// var jwksClient = require('jwks-rsa');
// var client = jwksClient({
//   jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json'
// });
// function getKey(header, callback){
//   client.getSigningKey(header.kid, function(err, key) {
//     var signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });
// }
 
// jwt.verify(token, getKey, options, function(err, decoded) {
//   console.log(decoded.foo) // bar
// });