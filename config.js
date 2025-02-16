const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳=72I3yLRR#dsrHW4Rk-ZfyFtRciEd_ZkXYYsGBQG056Qe8haYLSkM",
MONGODB: process.env.MONGODB || "mongodb+srv://athulakumara604:qBwvqo6IM64eT1SL@cluster0.wr7rx.mongodb.net/",
GITHUB_USERNAME: process.env.GITHUB_USERNAME === undefined ? 'Asithabzkejx': process.env.GITHUB_USERNAME,
GITHUB_AUTH_TOKEN: process.env.GITHUB_AUTH_TOKEN === undefined ? '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': process.env.GITHUB_AUTH_TOKEN
};
