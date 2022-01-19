const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
const port = 3000;



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
//app.use(express.json());
app.use(cors());



const authRouter = require("./routes/v1/authRoutes");
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {

})
