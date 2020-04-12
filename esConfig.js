const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'https://site:17b87340c25d6c25c99b28368e4e926e@oin-us-east-1.searchly.com'});
module.exports= client;

//https://site:17b87340c25d6c25c99b28368e4e926e@oin-us-east-1.searchly.com	

//http://localhost:9200