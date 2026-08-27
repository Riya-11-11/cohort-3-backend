// We are making our device server...

let http = require("http"); //work as import

let server = http.createServer((req, res) => {
    console.log("hello, I am server.");
    res.end("Okk, I have listened you")
    
});

server.listen(3000, ()=>{
    console.log("Server is running on port 300");    
}); // server ko call ya on krna
