const express = require("express"); 
const cors = require("cors");
const urlRoute = require("./routes/url");
const {connectToMongoDB} = require('./connect')

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://0.0.0.0:27017/shortUrl')
.then(()=>console.log('mongodb connected'));

app.use(cors());
app.use(express.json());
app.use( urlRoute);


app.listen(PORT, ()=>{
    console.log(`Server running successfully on ${PORT}`)
})