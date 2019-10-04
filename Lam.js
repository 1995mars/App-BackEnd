var express = require('express');
var path = require('path');

const Lame = require("node-lame").Lame;
 
const encoder = new Lame({
    output: "buffer",
    bitrate: 192
}).setFile("./public/songgio.mp3");
 
encoder
    .encode()
    .then(() => {
        const buffer = encoder.getBuffer();
        console.log(buffer);
    })
    .catch(error => {
      console.log(error);
    });