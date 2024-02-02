const { timeStamp } = require("console");
const express = require("express"); // package
const fs = require("fs") //package
const path = require("path"); //package
const dirPath = path.join(__dirname, "timestamps")
const app = express()
app.use(express.json()) // middleware

// 1. write an api end point which will creat a text file in aparticular folder
// content of the file should be the current time stamp
// the fine name should be the current date-time.txt

// 2. write a api end point to retrive all the text files in a particular folder

app.post("/timestamp", (req, res) => {

    let date = new Date();
    const fileName = 'current-date-time.txt';
    // const folderPath = './timestamps/current-date-time.txt'
    const filePath = path.join(dirPath, fileName);
    const timeStampDate = `Last updated : ${date.toUTCString().slice(0, -3)}`;

    try {
        // Ensure the directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        fs.writeFileSync(filePath, timeStampDate);

        res.sendFile(filePath);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error writing time stamp' });
    }
})

app.get('/list-all', (req, res) => {
    try {
        const files = fs.readdirSync(dirPath).filter(file => path.extname(file) === '.txt');
        // console.log(files);
        const fileData = files.map(file => {
            const filePath = path.join(dirPath, file);
            return {
                fileName: file,
                content: fs.readFileSync(filePath, 'utf-8')
            }
        });
        res.status(201).json({ message: fileData })

    } catch (error) {
        res.status(500).send({ message: 'Error listing files' })
    }
})






// http://localhost:9000/
//  listen and start http server in specific port
app.listen(9000, () => console.log("server started in local host:9000"))