const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const search = require('./search');
const client = require('./esConfig');

search.cityListIndexing();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res,next)=>{
    res.send("App is working!!")
});

app.get('/search',(req,res,next)=>{
    search.search(req.query.name,(result)=>{
        
        res.json({statusCode:200,success:true,data:result,message:""})
    });
});

app.get('*',(req,res,next)=>{
    res.send("Please pass correct arguments")
});

client.ping({
  }, function(error) {
    if (error) {
        console.log('ES Cluster is down', error);
    } else {
        console.log('ES Cluster is up!');
    }
});
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`listening port ${port}`);
} );