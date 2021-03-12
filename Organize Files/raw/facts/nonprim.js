///json
let obj={
    name:"steve",
    lastName:"Rogers",
    address:{
        city:"Manhatten",
        state:"Newyork"
    },
    iaAvenger:false,
    age:35,
    movies:["civil war","first avenger","age if ultron"],
    sayhi:function(param){
        console.log("cap say's hi",param);
        return "return blessings";
    }
}
//loop
for(let itr in obj){
    console.log("key :",itr,"| value :",obj[itr]);
}
console.log(obj.abc);
//get
let key=address;
console.log("address object",obj[key]);
console.log("address object",obj.address);
console.log("address object",obj.address.state);
console.log("Movies",obj.movies[1]);
console.log("function is nside an object",obj.sayhi("i am a param"));
// set-> update
console.log(obj);

obj.friend=['ram','shyam'];
obj.age=22;
obj[key]["state"]="delhi";
//delete
delete obj.movies;
console.log(obj);


function sayhi(){

    return 30;
}
let a=10+sayhi();
console.log(a);
console.log("hello",sayhi());
process.stdout.write();
