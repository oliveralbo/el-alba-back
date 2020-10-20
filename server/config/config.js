/**************PUERTO******************* */
process.env.PORT = process.env.PORT || 3000



/****************vencimiento del token *****************/
//60 seg * 60 min * nHS * nDias
process.env.VENC_TOKEN = Math.floor(Date.now() / 1000) + (60 * 60);


/****************secret token *****************/
process.env.SEED = process.env.SEED || "semilla de desarrollo"
//crear seed de produccion conn variable de entorno en el servidor para el seed



// entorno
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//bbdd
let urlDB;
if(process.env.NODE_ENV === "dev"){
    urlDB = 'mongodb://localhost:27017/myDataBase';
}else{     
    urlDB = 'acá va la url de la bbdd productiva con su pass de usuario. ej: mlab, atlas';
}


process.env.URLDB = urlDB;