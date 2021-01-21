const fetch = require('node-fetch');
const fs = require('fs');
const linereader = require('line-reader');

var ip = "localhost";
var port = 1555;
var stream = "https://geralorigin.eu-central-1.edge.mycdn.live/mylive/nicksd/video.m3u8";
var headers = {
    "Referer": "https://futebolplayhd.com/",
    "Origin": "https://canaismax.com/"
};

function start() {
    fs.mkdirSync("./lista/ultima/", { recursive: true });
    fs.mkdirSync("./lista/ultima/chunks", { recursive: true });

    var playlistFile = "./lista/ultima/playlist.m3u8";
    var chunksFolder = "./lista/ultima/chunks/";
    baixar(stream,headers,playlistFile);
    
    var novaPlaylist = "";
    linereader.eachLine(playlistFile, (line) => {
        
        if (line.startsWith("http")) {
            var spliced = line.split("/");
            baixar(line,headers,chunksFolder + "/" + spliced[spliced.length-1].replace("https","http")); 
        }
    });
}


function baixar(link, headers, destino) {
    fetch(link, {headers: headers}).then(res => res.buffer()).then(buffer => {
        fs.writeFileSync(destino, buffer);
    }).catch(ex => console.log("Erro: " + ex));
}

start();