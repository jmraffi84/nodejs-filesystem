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

    let date = new Date();
    const timeStampDate = `Your Local Date and Time : ${date.toLocaleString()}`
    let content = timeStampDate;
    fs.writeFileSync(`${dirPath}/current-date-time.txt`, content, (err) => {
        if (err) {
            res.send({ message: "Error in Writing Current Time Stamp" })
        }
    })
    res.sendFile(path.join(dirPath, "current-date-time.txt"))
})

app.get("/text-files", (req, res) => {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }

        const textFiles = files.filter(file => file.endsWith('.txt'));
        res.json({ FilesData: textFiles });
    });
});


// listen a server
app.listen(PORT, () => console.log(`server started in localhost:${PORT}`));
