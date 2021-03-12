const fs = require('fs');
const readline = require('readline');

function setNumber(cmd, fileName){

    let pathArray=fileName.split(".");
    let extension=pathArray[pathArray.length-1];
    if(extension=="txt"){
        var input=fs.createReadStream(fileName);
        var r1=require('readline').createInterface({
            input:input
        });
        
        let number=1;
        let flag=0;
        r1.on('line',function(line){
            var data = fs.readFileSync(fileName, 'utf8');
            var lines = data.split("\n");
            if(cmd=="-b" && line.length==0){
                console.log("\n");
            }else if(cmd=="-s" && line.length==0){
                if(flag==0){
                    console.log("\n");
                    flag=1;
                }
            }else if(cmd=="-n"){
                flag=0;
                console.log(number,"-",line);
                number++;
            }
            
        });
  
    }else{
        console.log("Not able to read except txt file");
    }
}

module.exports={
    setNumber:setNumber
}