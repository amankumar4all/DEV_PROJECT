let fs = require("fs");
let path = require("path");
let request = require("request");
let cheerio = require("cheerio");
let PDFDocument = require("pdfkit");
let pathOfFolder;

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/points-table-standings";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractLink(html);
    }
}
function extractLink(html) {
    let selTool = cheerio.load(html);
    let pathToTeamsList = selTool(".label.d-flex.align-items-center.row-name");
    // console.log(pathToTeamsList.length);
    for (let i = 0; i < pathToTeamsList.length; i++) {
        let linkPath = selTool(pathToTeamsList[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com"+linkPath;
        // console.log(fullLink);
        dirCreater(linkPath);
        getPlayerJson(fullLink,linkPath);

    }

}
function getPlayerJson(teamNameLink,folderName){
    request(teamNameLink, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractPlayerLinkFromSquad(html,folderName);
    }
}
}
function extractPlayerLinkFromSquad(html,folderName){
    let selTool = cheerio.load(html);
    let playersTable=selTool("div .squad .squad-col a")
    for(let i=0;i<playersTable.length;i++){
        let playerlink=selTool(playersTable[i]).attr("href");
        
        let playerName=selTool(playersTable[i]).text();
        createPlayerJson(playerName,folderName);

        console.log(playerlink);
        callPlayerData(playerlink);
    }
}
function callPlayerData(playerlink){
    request(playerlink, cb);
    function cb(err, response, html){
        if(err){
            console.log(err);
        }
        else {
            extractHtml(html);
        }
    }
}
function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let teamNameElemArr=selectorTool("table thead .head th");
    console.log("xxxt",teamNameElemArr.length);
    let keys=[];
    for(let i=0;i<teamNameElemArr.length;i++){
         keys=selectorTool(teamNameElemArr[i]).text();
        //  console.log("keys values are",keys[i]);
    }
//     for (let i = 0; i < batsmantableArr.length; i++) {
//         let batsmanName = selectorTool(batsmantableArr[i]).find("tbody tr .batsman-cell");
        // }
}


function createPlayerJson(playerName,folderName){
    playerName=playerName.trim();
    playerName=playerName.split(" ").join("");
    
    // console.log(folderName);
    names=folderName.substring(6);
    names=names.split("-");
    let TeamName=names[0]+"-"+names[1];
    console.log(TeamName);

    let pathofFile=path.join(__dirname,"team",TeamName, playerName+".json");
    if(fs.existsSync(pathofFile)==false){
        let createStream = fs.createWriteStream(pathofFile);
        createStream.end();
    }
}
function dirCreater(folderName){
    names=folderName.split("-");
    let TeamName=names[0]+"-"+names[1];
    pathOfFolder=path.join(__dirname,TeamName);
    // console.log("paths",__dirname,"++",TeamName);
    if(fs.existsSync(pathOfFolder)==false){
        fs.mkdirSync(pathOfFolder);
    }
}