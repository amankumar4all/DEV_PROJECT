let n =require("./commands/addNumberToLine");

let input=process.argv.slice(2);

let value1=input[0];
switch(value1){
    case "-n":
        n.setNumber(input[0],input[1]);
    case "-s":
        n.setNumber(input[0],input[1]);
    case "-b":
        n.setNumber(input[0],input[1]);
    default:
        
        let val=value1.split(".");
        let extension=pathArray[val.length-1];
        if(ext=="txt"){
            
        }
}
