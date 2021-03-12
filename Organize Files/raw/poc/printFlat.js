//file syatem -> nodejs modules
let fs=require("fs");
function isFileChecker(dirPath){
    return fs.lstatSync(dirPath).isFile();
}
function readContent(dirPath){
    return fs.readdirSync(dirPath);
}

function viewFlat(dirPath){
    //path-> file/folder
    let isFile=isFileChecker(dirPath);
    if(isFile==true){
        console.log(dirPath+"*");
    }else{
        //directory
        //print path
        console.log(dirPath);
        //get children
        let childrens=readContent(dirPath);
        //call for view flat
        for(let i=0;i<childrens.length;i++){
            viewFlat(dirPath+"/"+childrens[i]);
        }
        //console.log("children: ",childrens)
    }
    //d10/d20
}
viewFlat("D:\\PEPCODING\\DEV")