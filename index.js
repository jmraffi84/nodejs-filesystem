import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
import fs from "fs";



const PORT = 9000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirPath = path.join(__dirname, "timefile")

app.get("/", (req, res) => {
    res.send("Working Good")
})

app.get("/timestamp", (req, res) => {
    console.log('I am Time stamp');
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



// listen a server
app.listen(PORT, () => console.log(`server started in localhost:${PORT}`));
