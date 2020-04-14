const {Client} = require( "@elastic/elasticsearch" );

module.exports = ( ()=>{
    let elastic_link = "http://localhost:9200";
    if( process.env.NODE_ENV === "production" )
    {
        elastic_link = "https://site:17b87340c25d6c25c99b28368e4e926e@oin-us-east-1.searchly.com";
    }
    return new Client( {
        node: elastic_link
    } );
} )();
