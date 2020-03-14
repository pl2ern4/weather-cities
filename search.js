const fs = require('fs');
const client = require('./esConfig');
const data = JSON.parse(fs.readFileSync(__dirname+'/city_list.json'));

const index='weather';
const type="cities";

async function writeToEs(index, data){
    const bulkArray=[];
    for(let i=0;i<=data.length;i++){
        bulkArray.push({
            index:{
                _index:index,_type:type,_id:i
            }
        });
        if(typeof data[i]!=='undefined'){ 
            bulkArray.push({id:data[i]["city"]["id"]['$numberLong'],
                            name:data[i]["city"]["name"],
                            findName:data[i]["city"]["findName"],
                            country:data[i]["city"]["country"]});
        }
    }
    client.bulk({body:bulkArray})
    .then(response=>response)
    .catch(e=>{
        console.log(e,"e");
    });
    
}

async function createMapping(index){
    const cityScehema={
        "name":"String",
        "findName":"String",
        "country":"String",
        "id":"long"
    }
    return client.indices.putMapping({index:index,body:{properties:cityScehema}});
}

module.exports = {

    async search(param,callback){
        const resultArray=[];
        const {body} = await client.search({
            index:index,
            body:{
                query:{
                    wildcard:{
                        name:`*${param}*`
                    }
                }
            }
        });
        for(let j=0;j<body.hits.hits.length;j++){
            resultArray.push(body.hits.hits[j]['_source']);
        }
        callback(resultArray);
    },

    async cityListIndexing(){ 
        if(client.indices.exists({index:index})){
            client.indices.delete({index: index});
        } 
        await client.indices.create({index});
        createMapping(client,index);
        writeToEs(index,data);
    }
}
