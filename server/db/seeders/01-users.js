const data = require('../seeds/users');
const db = require('../../db');

module.exports = db.describeSeeder('users', data);
