const fetch = require('node-fetch');
const fs = require('fs');

var ip = "localhost";
var port = 1555;
var stream = "https://geralorigin.eu-central-1.edge.mycdn.live/mylive/nicksd/video.m3u8";
var headers = {
    "Origin":"https://canaismax.com/",
    "Referer:":"https://futebolplayhd.com/"
};

fetch(stream, {headers: headers}).then(res => res.buffer()).then(buffer => {
    fs.writeFileSync("playlist.m3u8", buffer);
}).catch(ex => console.log("Erro: " + ex));