// 3/4/2024 aditya suman  server to fetch the json data from the server keep updating the auth token
const http = require('http');
const https = require('https');


function makeAPICall(authToken) {
    const options = {
 hostname: '20.244.56.144',
        path: '/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000',
        /// already set parameter  p min max price
        method: 'GET',
         headers: {
            Authorization: `Bearer ${authToken}`
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            // return new Promise((resolve, reject) => {
            //     const req = https.request(options, (res) => {
            //         let data = '';

            res.on('data', (chunk) => {
                data += chunk;
});

            res.on('end', () => {
                resolve(JSON.parse(data));
            });});

        req.on('error', (error) => {
            reject(error);
        });
  req.end();
    });}


const server = http.createServer(async (req, res) => {
   
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTU0NDg5LCJpYXQiOjE3MTIxNTQxODksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU4NmIxODVmLTExMjMtNDVmNi05YWJlLWQxMTc5OGRiYzAyOSIsInN1YiI6ImF1MzQ1NUBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiQWRpdHlhU1JNIiwiY2xpZW50SUQiOiI1ODZiMTg1Zi0xMTIzLTQ1ZjYtOWFiZS1kMTE3OThkYmMwMjkiLCJjbGllbnRTZWNyZXQiOiJGZU1yQWhoUHlGYUxJT2N5Iiwib3duZXJOYW1lIjoiQWRpdHlhIFN1bWFuIiwib3duZXJFbWFpbCI6ImF1MzQ1NUBzcm1pc3QuZWR1LmluIiwicm9sbE5vIjoiUkEyMTExMDI4MDMwMDA5In0.dJFXuceHyS7-lnalNFZjScf2n5LVhzpm9JQzGwEotlQ';
// token changes everyminute
    try {
        const apiResponse = await makeAPICall(authToken);
        // const apiResponse1 = await makeAPICall(authToken);

        console.log(apiResponse);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Check api for this');
    } catch (error) {
        console.error('error:', error);


    //     console.log(apiResponse);
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });
    //     res.end('Check api for this');
    // } catch (error) {
    //     console.error('error:', error);

        // res.writeHead(500, { 'Content-Type': 'text/plain' });


        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(' errror');
    }
});

const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT || 3005; //3000 busy
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
