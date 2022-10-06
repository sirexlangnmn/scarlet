const QUERY = {

    CREATE: 'INSERT INTO users_address (' +
            'user_id, ' +
            'address, ' +
            'country, ' +
            'state_or_province, ' +
            'city, ' +
            'uuid) VALUES' +
            '(?, ?, ?, ?, ?, ?)',

    ADDRESS: `SELECT 
            country, 
            state_or_province, 
            city
            FROM users_address 
            WHERE uuid = ? `,
}

module.exports = QUERY;