function calculateTimeZone(traderTimeOfOperation, traderUtc, viewerUtc) {
    // NOTE: UTC default value is 12:00
    // time zone offset like this +08:00 meaning add 8 hours from utc default value
    // time zone offset like this -08:00 meaning subtract 8 hours from utc default value
    const UTC = '12:00';

    let traderUtcAlpha = '';
    let traderUtcNum = '';
    let traderUtcSpecial = '';
    for (let i = 0; i < traderUtc.length; i++) {
        if (!isNaN(String(traderUtc[i]) * 1)) traderUtcNum += traderUtc[i];
        else if ((traderUtc[i] >= 'A' && str[i] <= 'Z') || (traderUtc[i] >= 'a' && traderUtc[i] <= 'z'))
            traderUtcAlpha += traderUtc[i];
        else traderUtcSpecial += traderUtc[i];
    }

    let viewerUtcAlpha = '';
    let viewerUtcNum = '';
    let viewerUtcSpecial = '';
    for (let i = 0; i < viewerUtc.length; i++) {
        if (!isNaN(String(viewerUtc[i]) * 1)) viewerUtcNum += viewerUtc[i];
        else if ((viewerUtc[i] >= 'A' && str[i] <= 'Z') || (viewerUtc[i] >= 'a' && viewerUtc[i] <= 'z'))
            viewerUtcAlpha += viewerUtc[i];
        else viewerUtcSpecial += viewerUtc[i];
    }

    // let traderMinutes = (traderUtcNum * 60 / 100);
    // let traderHours = (traderMinutes / 60);
    //console.log(traderHours);

    // let viewerMinutes = (viewerUtcNum * 60 / 100);
    // let viewerHours = (viewerMinutes / 60);
    // console.log(viewerHours);

    // let splitTraderUtc = traderUtc.split(':');
    // let splitUtc = UTC.split(':');

    // let traderUtcVsUtcDefaultValue = Number(splitUtc[0]) + Number(splitTraderUtc[0]);

    let traderUtcVsUtcDefaultValue = addTimes(traderUtc, UTC);

    let traderUtcVsUtcDefaultOutput;
    let splittraderUtcVsUtcDefaultValue = traderUtcVsUtcDefaultValue.split(':');
    if (splittraderUtcVsUtcDefaultValue[0] > 12) {
        traderUtcVsUtcDefaultOutput = subtractTimes(traderTimeOfOperation, UTC);
    }

    console.log(traderUtcVsUtcDefaultOutput);
    // hours = Math.floor(Number(splitTraderUtc[0]) + Number(splitUtc[0]));
    // minutes = Math.floor(Number(splitTraderUtc[1]) + Number(splitUtc[1]));
}

console.log(calculateTimeZone('08:00', '+08:01', '+04:30'));

// Convert a time in hh:mm format to minutes
function timeToMins(time) {
    var b = time.split(':');
    return b[0] * 60 + +b[1];
}

// Convert minutes to a time in format hh:mm
// Returned value is in range 00  to 24 hrs
function timeFromMins(mins) {
    function z(n) {
        return (n < 10 ? '0' : '') + n;
    }
    var h = ((mins / 60) | 0) % 24;
    var m = mins % 60;
    return z(h) + ':' + z(m);
}

// Add two times in hh:mm format
function addTimes(t0, t1) {
    return timeFromMins(timeToMins(t0) + timeToMins(t1));
}

// Subtract two times in hh:mm format
function subtractTimes(t0, t1) {
    return timeFromMins(timeToMins(t0) - timeToMins(t1));
}

// console.log(addTimes('12:13', '01:42')); // 13:55
// console.log(addTimes('12:13', '13:42')); // 01:55
// console.log(addTimes('02:43', '03:42')); // 06:25
