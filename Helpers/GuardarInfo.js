const fs=require('fs');

const ubicacion='./Db/Data.json'
 const guardarDb=(data)=>{
    fs.writeFileSync(ubicacion,JSON.stringify(data));
}
const leerDb=()=>{
    if(!fs.existsSync(ubicacion)){
        return null;
    }
    const info=fs.readFileSync(ubicacion,{encoding:'utf8'});
    const data=JSON.parse(info);
    return data;
}
module.exports={
    guardarDb,
    leerDb
}