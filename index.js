const express = require("express")
const mongoose =require("mongoose")
const Router = require("./router.js")
const path = require("path")
const app = express()


app.use(express.static(path.join(__dirname, 'views')))
app.set('views', )
app.set('view engine', 'ejs')
app.use('/login', express.static(path.join(__dirname ,'public/login')));


const {adminBro, router} = require("./admin-panel-config.js")
app.use(adminBro.options.rootPath, router)


app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/", Router)

app.get("/admin1", (req, res) => {
    res.send("hii")
})


const start = async () => {
    try{
        const port = process.env.PORT || 5000
        app.listen(port, () => console.log(`\n[+] server started on port ${port}`))        
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        console.log('[+] mongobd database connected')
    } catch(e){
        console.log(e)
    }
}

start()