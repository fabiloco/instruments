const jwt = require('jsonwebtoken');

const secret = 'secret';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.eyJzdWIiOjEsImlhdCI6MTY0NTQyMjMwMH0.0ArpgVA10hmWakOXTm4_hx1WuB2kXF3ro0hB_n3mEwE';

const verifyToken = (token, secret) => {
	return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);
console.log(payload);
