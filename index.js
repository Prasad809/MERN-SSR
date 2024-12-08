//imports
let express=require("express")
let path=require("path")
// let hbs=require("hbs")
let port=4321
let collection=require('./mongo.js')
//middlewares
let app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
let tamplatePaths=path.join(__dirname,'tamplate')
app.set('view engine','hbs')
app.set('views',tamplatePaths)


//creating renders
//get the login page
app.get('/',function(req,res){
    res.render("login")
})
//get the SingUp page
app.get('/signUp',function(req,res){
    res.render("signUp")
})
//creating post details
//signUp details posts
app.post('/singUp',async function(req,res){
    let data={
        name:req.body.name,
        password:req.body.password
    }
    await collection.insertMany([data])
    res.send('<h1>Thank you for SignUp</h1>')
})
//login details Posts
app.post('/login',async (req,res)=>{
    try{
        let check=await collection.findOne({name:req.body.name})
        if(check.password === req.body.password){
            res.render('index')
        }else{
            res.send('<h1>Password Wrong</h1>')
        }
    }catch(e){
        res.send('<h1>Enter the Worng Details</h1>')
    }
})
//creating port
app.listen(port,function(err){
    if(err) throw err;
    console.log(`port started ${port}`);
})