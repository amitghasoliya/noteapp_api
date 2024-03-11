const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./src/routes/userRoute");
const noteRoute = require("./src/routes/noteRoute");
const dotenv = require("dotenv");
const app = express()
const cors = require("cors");

dotenv.config();

app.use(cors());

app.use(express.json());
app.use("/users", userRoute);
app.use("/note", noteRoute);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('database is connected')

})
.catch((error)=>{
    console.log(error);
})

const PORT = process.env.PORT || 5000;
app.listen(5000, ()=>{
    console.log("Server started on port no."+PORT)
})