const express = require( "express" );
const bodyParser = require( "body-parser" );
const app = express();
const search = require( "./search" );
const client = require( "./esConfig" );

(()=>{
    search.cityListIndexing();
    console.log("executing")
})();
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( bodyParser.json() );

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get( "/", ( req, res )=>{
    res.send( "App is working!!" )
} );

app.get( "/search", ( req, res )=>{
    search.search( req.query.name, result=>{
        res.json( {statusCode:200, success:true, data:result, message:""} )
    } );
} );

app.get( "*", ( req, res )=>{
    res.send( "Please pass correct arguments" )
} );

client.ping( {
  }, function( error ) {
    if ( error ) {
        console.log( "ES Cluster is down", error ); // eslint-disable-line no-console
    } else {
        console.log( "ES Cluster is up!" ); // eslint-disable-line no-console
    }
} );
const port = process.env.PORT || 3000;
console.log( port, ">>>>", process.env.NODE_ENV);// eslint-disable-line no-console
process.on( "SIGHUP", function() {
    process.kill( process.pid, "SIGHUP" );
    process.exit( 1 );
} );

app.listen( port, ()=>{
  console.log( `listening port ${port}` ); // eslint-disable-line no-console
} );