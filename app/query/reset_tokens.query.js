const QUERY = {
     
    CREATE: 'INSERT INTO reset_tokens (' +
            'token, ' +
            'expiration, ' +
            'uuid, ' +
            'updatedAt) VALUES' +
            '(?, ?, ?, ?)',
}

module.exports = QUERY;