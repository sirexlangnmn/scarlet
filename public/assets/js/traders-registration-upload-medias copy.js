function registrationUploadBusinessMedias(uuid) {
    // // Get form
    // let form = $('#traderRegistrationForm')[0];

    // // Create an FormData object
    // let formData = new FormData(form);
    // formData.append('uuid', uuid);

    let companyLogo = document.getElementById('companyLogo').files.length;
    let companyBanner = document.getElementById('companyBanner').files.length;
    let thumbnailInput = document.getElementById('thumbnailInput').files.length;
    let brochureInput = document.getElementById('brochureInput').files.length;
    let webinarsThumbnailInput = document.getElementById('webinarsThumbnailInput').files.length;

    let isWantToUploadVideo = document.getElementById('inputWantToUploadCompanyVideo').value;
    let isWantToUploadBrochure = document.getElementById('inputWantToUploadCompanyBrochure').value;
    let isWantToUploadCompanyWebinar = document.getElementById('inputWantToUploadCompanyWebinar').value;

    console.log('uuid');
    console.log(uuid);
    console.log('companyLogo');
    console.log(companyLogo);
    console.log('companyBanner');
    console.log(companyBanner);
    console.log('thumbnailInput');
    console.log(thumbnailInput);
    console.log('brochureInput');
    console.log(brochureInput);
    console.log('webinarsThumbnailInput');
    console.log(webinarsThumbnailInput);
    console.log('isWantToUploadVideo');
    console.log(isWantToUploadVideo);
    console.log('isWantToUploadBrochure');
    console.log(isWantToUploadBrochure);
    console.log('isWantToUploadCompanyWebinar');
    console.log(isWantToUploadCompanyWebinar);

    // const uploadUrl = {
    //     noUpload: path.join(__dirname, '../../', 'public/views/about.html'),
    //     client: path.join(__dirname, '../../', 'public/views/client.html'),
    //     // landing: path.join(__dirname, '../../', 'public/views/landing.html'),
    //     landing: path.join(__dirname, '../../', 'public/views/landing2.html'),
    //     newCall: path.join(__dirname, '../../', 'public/views/newcall.html'),
    //     // notFound: path.join(__dirname, '../../', 'public/views/404.html'),
    //     notFound: path.join(__dirname, '../../', 'public/views/404-not-found.html'),
    //     permission: path.join(__dirname, '../../', 'public/views/permission.html'),
    //     privacy: path.join(__dirname, '../../', 'public/views/privacy.html'),
    //     stunTurn: path.join(__dirname, '../../', 'public/views/testStunTurn.html'),
    // };

    // no upload 
    if (
        companyLogo == 0 &&
        companyBanner == 0 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationNoUpload(uuid);
        console.log('yes registrationNoUpload');
        console.log('registrationNoUpload: ' + response);
    } else {
        console.log('no registrationNoUpload');
    }

    // logo only
    if (
        companyLogo == 1 &&
        companyBanner == 0 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyLogo(uuid);
        console.log('yes registrationUploadCompanyLogo');
        console.log('registrationUploadCompanyLogo: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogo');
    }

    // banner only
    if (
        companyLogo == 0 &&
        companyBanner == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyBanner(uuid);
        console.log('yes registrationUploadCompanyBanner');
        console.log('registrationUploadCompanyBanner: ' + response);
    } else {
        console.log('no registrationUploadCompanyBanner');
    }

    // video only 
    if (
        companyLogo == 0 &&
        companyBanner == 0 &&
        thumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        console.log('yes registrationUploadCompanyVideo');
        registrationUploadCompanyVideo(uuid);
    } else {
        console.log('no registrationUploadCompanyVideo');
    }

    // brochure only
    if (
        companyLogo == 0 &&
        companyBanner == 0 &&
        brochureInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == ''
    ) {
        console.log('yes registrationUploadCompanyBrochure');
        registrationUploadCompanyBrochure(uuid);
    } else {
        console.log('no registrationUploadCompanyBrochure');
    }

    // webinar only
    if (
        companyLogo == 0 &&
        companyBanner == 0 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == 1
    ) {
        console.log('yes registrationUploadCompanyWebinar');
        registrationUploadCompanyWebinar(uuid);
    } else {
        console.log('no registrationUploadCompanyWebinar');
    }

    // all 
    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadAllUsersBusinessMedias(uuid);
        console.log('yes registrationUploadAllUsersBusinessMedias');
        console.log('registrationUploadAllUsersBusinessMedias: ' + response);
    } else {
        console.log('no registrationUploadAllUsersBusinessMedias');
    }

    // all - no logo
    if (
        companyLogo == 0 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadAllButNoLogo(uuid);
        console.log('yes registrationUploadAllButNoLogo');
        console.log('registrationUploadAllButNoLogo: ' + response);
    } else {
        console.log('no registrationUploadAllButNoLogo');
    }

    // all - no banner
    if (
        companyLogo == 1 &&
        companyBanner == 0 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadAllButNoBanner(uuid);
        console.log('yes registrationUploadAllButNoBanner');
        console.log('registrationUploadAllButNoBanner: ' + response);
    } else {
        console.log('no registrationUploadAllButNoBanner');
    }

    // all - no video
    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadAllButNoVideo(uuid);
        console.log('yes registrationUploadAllButNoVideo');
        console.log('registrationUploadAllButNoVideo: ' + response);
    } else {
        console.log('no registrationUploadAllButNoVideo');
    }

    // all - no brochure
    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadAllButNoBrochure(uuid);
        console.log('yes registrationUploadAllButNoBrochure');
        console.log('registrationUploadAllButNoBrochure: ' + response);
    } else {
        console.log('no registrationUploadAllButNoBrochure');
    }

    // all - no webinar
    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadAllButNoWebinar(uuid);
        console.log('yes registrationUploadAllButNoWebinar');
        console.log('registrationUploadAllButNoWebinar: ' + response);
    } else {
        console.log('no registrationUploadAllButNoWebinar');
    }

     // logo and banner
     if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyLogoBanner(uuid);
        console.log('yes registrationUploadCompanyLogoBanner');
        console.log('registrationUploadCompanyLogoBanner: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoBanner');
    }

    
    // logo and video
    // logo and brochure
    // logo and webinar


    // banner and video
    // banner and brochure
    // banner and webinar
    // banner and logo - ekis kasi meron ng logo and banner


    // video and brochure
    // video and webinar
    // video and banner - ekis kasi meron ng banner and video
    // video and logo - ekis kasi meron ng logo and video


    // brochure and video - ekis kasi meron ng video and brochure
    // brochure and banner - ekis kasi meron ng banner and brochure
    // brochure and webinar
    // brochure and logo - ekis kasi meron ng logo and brochure


    // webinar and brochure  - ekis kasi meron ng brochure and webinar
    // webinar and video - ekis kasi meron ng video and webinar
    // webinar and banner - ekis kasi meron ng banner and webinar
    // webinar and logo - ekis kasi meron ng logo and webinar


    // logo, banner, and video (no brochure, no webinar)
    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyLogoBannerVideo(uuid);
        console.log('yes registrationUploadCompanyLogoBannerVideo');
        console.log('registrationUploadCompanyLogoBannerVideo: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoBannerVideo');
    }

    // logo, banner, and brochure (no video, no webinar)
    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        brochureInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyLogoBannerBrochure(uuid);
        console.log('yes registrationUploadCompanyLogoBannerBrochure');
        console.log('registrationUploadCompanyLogoBannerBrochure: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoBannerBrochure');
    }

    // logo, banner, and webinar (no video, no brochure)
    if (
        companyLogo == 1 &&
        companyBanner == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadCompanyLogoBannerWebinar(uuid);
        console.log('yes registrationUploadCompanyLogoBannerWebinar');
        console.log('registrationUploadCompanyLogoBannerWebinar: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoBannerWebinar');
    }

    // logo, video, and brochure (no banner, no webinar)
    if (
        companyLogo == 1 &&
        companyBanner == 0 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyLogoVideoBrochure(uuid);
        console.log('yes registrationUploadCompanyLogoVideoBrochure');
        console.log('registrationUploadCompanyLogoVideoBrochure: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoVideoBrochure');
    }

    // logo, video, and webinar (no banner, no brochure)
    if (
        companyLogo == 1 &&
        companyBanner == 0 &&
        thumbnailInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadCompanyLogoVideoWebinar(uuid);
        console.log('yes registrationUploadCompanyLogoVideoWebinar');
        console.log('registrationUploadCompanyLogoVideoWebinar: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoVideoWebinar');
    }


    // logo, brochure, and webinar (no banner, no video) 
    if (
        companyLogo == 1 &&
        companyBanner == 0 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadCompanyLogoBrochureWebinar(uuid);
        console.log('yes registrationUploadCompanyLogoBrochureWebinar');
        console.log('registrationUploadCompanyLogoBrochureWebinar: ' + response);
    } else {
        console.log('no registrationUploadCompanyLogoBrochureWebinar');
    }

    // banner, video, and brochure (no logo, no webinar) 
    if (
        companyLogo == 0 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        brochureInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == ''
    ) {
        let response = registrationUploadCompanyBannerVideoBrochure(uuid);
        console.log('yes registrationUploadCompanyBannerVideoBrochure');
        console.log('registrationUploadCompanyBannerVideoBrochure: ' + response);
    } else {
        console.log('no registrationUploadCompanyBannerVideoBrochure');
    }

    // banner, video, and webinar (no logo, no brochure) 
    if (
        companyLogo == 0 &&
        companyBanner == 1 &&
        thumbnailInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == 1 &&
        isWantToUploadBrochure == '' &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadCompanyBannerVideoWebinar(uuid);
        console.log('yes registrationUploadCompanyBannerVideoWebinar');
        console.log('registrationUploadCompanyBannerVideoWebinar: ' + response);
    } else {
        console.log('no registrationUploadCompanyBannerVideoWebinar');
    }

    // banner, webinar, and brochure (no logo, no video) 
    if (
        companyLogo == 0 &&
        companyBanner == 1 &&
        brochureInput == 1 &&
        webinarsThumbnailInput == 1 &&
        isWantToUploadVideo == '' &&
        isWantToUploadBrochure == 1 &&
        isWantToUploadCompanyWebinar == 1
    ) {
        let response = registrationUploadCompanyBannerBrochureWebinar(uuid);
        console.log('yes registrationUploadCompanyBannerBrochureWebinar');
        console.log('registrationUploadCompanyBannerBrochureWebinar: ' + response);
    } else {
        console.log('no registrationUploadCompanyBannerBrochureWebinar');
    }

   

    
}


function registrationNoUpload(uuid) {
    let value;

    $.ajax({
        url: '/api/post/registration-no-upload',
        type: 'POST',
        data: {
            uuid: uuid,
        },
        success: function (data) {
            console.log(data);
            value = data;
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllUsersBusinessMedias(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-users-business-medias',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllButNoLogo(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-but-no-logo',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllButNoBanner(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-but-no-banner',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllButNoVideo(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-but-no-video',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllButNoBrochure(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-but-no-brochure',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadAllButNoWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-all-but-no-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}
function registrationUploadCompanyLogoBannerVideo(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-banner-video',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        async: false,
        success: function (data) {
            console.log(data);
            value = data;
            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoBannerBrochure(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-banner-brochure',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoBannerWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-banner-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoVideoBrochure(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-video-brochure',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoVideoWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-video-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoBrochureWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-brochure-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyBannerVideoBrochure(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-banner-video-brochure',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyBannerVideoWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-banner-video-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyBannerBrochureWebinar(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-banner-brochure-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);
            value = data;

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogoBanner(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo-banner',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        async: false,
        success: function (data) {
            console.log(data);
            value = data;
            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyLogo(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-logo',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        async: false,
        success: function (data) {
            console.log(data);
            value = data;
            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyBanner(uuid) {
    let value;

    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-banner',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        async: false,
        success: function (data) {
            console.log(data);
            value = data;
            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });

    return value;
}

function registrationUploadCompanyVideo(uuid) {
    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-video',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });
}

function registrationUploadCompanyBrochure(uuid) {
    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-brochure',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });
}

function registrationUploadCompanyWebinar(uuid) {
    // Get form
    let form = $('#traderRegistrationForm')[0];

    // Create an FormData object
    let formData = new FormData(form);
    formData.append('uuid', uuid);

    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: '/api/post/registration-upload-company-webinar',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (data) {
            console.log(data);

            // if (data === 'success upload files') {
            //     location.replace(host + '/email-verification');
            // }
        },
        error: function (e) {
            // some code here
        },
    });
}
