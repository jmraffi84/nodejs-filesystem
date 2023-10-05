const fs = require("fs")
const express = require("express")
const path = require("path")
const { timeStamp } = require("console")
const dirPath = path.join(__dirname, "timefile")
const app = express()
app.use(express.json()) // middleware
// console.log(dirPath);



app.get("/timestamp", (req, res) => {

    let date = new Date();
    const timeStampDate = `Your Local Time : ${date.toLocaleTimeString().slice(0, -3)}`
    let content = timeStampDate;
    fs.writeFileSync(`${dirPath}/current-date-time.txt`, content, (err) => {
        if (err) {
            res.send({ message: "Error in Writing Current Time Stamp" })
        }
    })
    res.sendFile(path.join(dirPath, "current-date-time.txt"))
})


// listen and start a http server in specific port
app.listen(9000, () => console.log("I started on port 9000"));


//  API documentation in post man docs

// Created a collection named a Current time Stamp
// then created get request in name of timestamp
//  End Point : http://localhost:9000/timestamp
//  Result : Your Local Time : 10:49:14