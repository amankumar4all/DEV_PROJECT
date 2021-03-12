//file syatem -> nodejs modules
let fs=require("fs");
let path=require("path");

function isFileChecker(dirPath){
    return fs.lstatSync(dirPath).isFile();
}
function readContent(dirPath){
    return fs.readdirSync(dirPath);
}

function viewTree(dirPath,indent){
    //path-> file/folder
    let isFile=isFileChecker(dirPath);
    if(isFile==true){
        console.log(indent,path.basename(dirPath)+"*");
    }else{
        //directory
        //print path
        console.log(indent,path.basename(dirPath));
        //get children
        let childrens=readContent(dirPath);
        //call for view flat
        for(let i=0;i<childrens.length;i++){
            viewTree(path.join(dirPath,childrens[i]),indent+"\t");
        }
        //console.log("children: ",childrens)
    }
    //d10/d20
}
viewTree("D:\\PEPCODING\\DEV\\2_file_system_13_07_2021","")