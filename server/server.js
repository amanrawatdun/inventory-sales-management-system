const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRoutes')
const productRouter = require('./routes/productRoutes');
const saleRouter = require('./routes/saleRoutes')
const dashboardRouter = require('./routes/dashboardRoutes');

dotenv.config();
connectDB();


const app = express();
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/uploads' , express.static('uploads'));


const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send("hello world")
})
app.use('/api' , authRouter);
app.use('/api/product' , productRouter );
app.use('/api/sales' ,  saleRouter)
app.use('/api/dashboard' ,  dashboardRouter)

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))