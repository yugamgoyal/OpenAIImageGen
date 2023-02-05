const express = require("express");
const path = require('path'); // Added for heroku
const { generateImage } = require('../controllers/openaiController');
const PORT = process.env.PORT || 3001; // Heroku will set this later

const app = express();

app.use(express.static(path.resolve(__dirname, '../aiimagegen/build')));

app.get("/api", generateImage);

// (req, res) => {
//     // const input = req.query.prompt;
//     // console.log(input);
//     // // req.query.input
//     // res.json({
//     //     urlOfImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Chain_link_icon.png/440px-Chain_link_icon.png",
//     //     otherData: input
//     // });
// });


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../aiimagegen/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


// "start": "node server/index.js",
// "server": "nodemon index.js --ignore client"
