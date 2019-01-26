const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT || 80;

var app=express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err)=>
{
  if(err){
    console.log("Unable To append Server.log");
  }
});
  console.log(log);
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenence.hbs');
// });
app.use(express.static(__dirname+'/public'));//MiddleWare




hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:"About Page"
  });
});


app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:"Home Page",
    welcomeMessage:"Welcome To Website"
  })
})

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:"Projects"
  })
})

app.get('/bad',(req,res)=>
{
  res.send({
    errorMessage:"Unable To Handle Request"
  }
);
});
app.listen(port,()=>
{
  console.log(`Server is Up on Port ${port}`);
});
