const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const search = require('./search');
const client = require('./esConfig');

search.cityListIndexing();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/search',(req,res,next)=>{
    search.search(req.query.name,(result)=>{
        
        res.json({statusCode:200,success:true,data:result,message:""})
    });
});

app.set('port', process.env.APP_PORT || 3000);

client.ping({
  }, function(error) {
    if (error) {
        console.log('ES Cluster is down', error);
    } else {
        console.log('ES Cluster is up!');
    }
});

app.listen(app.get('port'), ()=>{
  console.log(`Express server listening on port, ${app.get('port')}`);
} );