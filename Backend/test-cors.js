require('dotenv').config();
const app = require('./src/app');
const request = require('http');

const server = app.listen(0, () => {
    const port = server.address().port;
    
    request.get(`http://localhost:${port}/api/auth/me`, {
        headers: {
            'Origin': 'https://job-you-need.vercel.app/' // Unknown origin because of trailing slash
        }
    }, (res) => {
        console.log("Response status:", res.statusCode);
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log("Response body:", data);
            process.exit(0);
        });
    });
});
