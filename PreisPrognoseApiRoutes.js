const express = require('express')
const redis = require("redis");
const router = express.Router();

//import fetch from "node-fetch";
const fetch = require('node-fetch');
const axios = require('axios');
require('dotenv').config();
// read.js
const fs = require('fs');
const readline = require('readline')

const routes1_module = require('./WetterApiRoutes')

const prom_client = require('prom-client')

let lock = 0;

const options = {
    method: 'GET',
    url: 'https://marktdaten-deutschland.p.rapidapi.com/marketdata',
    params: {zip: '10963'},
    headers: {
      'X-RapidAPI-Key': process.env.PREISE_API_KEY,
      'X-RapidAPI-Host': 'marktdaten-deutschland.p.rapidapi.com'
    }
  };
// let responceCach = await axios.request(options);
let responceCachfunc = async () => {
    const result = await axios.request(options);
    return result
  }
let responceCach = null;
  setInterval(async () =>  {
    responceCach =  null;
 }, 14400000);


const register = routes1_module.wetter_register;
  const stromMarketPreisGauge = new prom_client.Gauge({
    name: 'strom_market_preis_metric', // The name of the metric
    help: 'gauge metric', // Help text describing the metric
 //   labelNames: ['label1', 'label2'], // (Optional) Specify label names if your metric requires labels
    registers: [register], // (Optional) Register the metric with the custom registry (default is the default registry)
  });
 

router.get("/preis", async (req, res) => {

    let list=[];
    let [tag,std,min] = getCurrentTimeCustom(); 
   // tag=tag+1;

try {

    let response = responceCach == null ? await axios.request(options): responceCach;
    responceCach = response;
    let value = responceCach.data.data;

    

    value.forEach(element => {


        let marketPreis =element.marketprice;
        let localPreis = element.localprice;
      //  const date1 = new Date(1691308800000);

        const date1 = new Date(element.start_timestamp);
        const date2 = new Date(element.end_timestamp);
     
        const config =  { year: '2-digit' ,day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'};
        let startTime = new Intl.DateTimeFormat('de-DE', config).format(date1);
        let endTime = new Intl.DateTimeFormat('de-DE', config).format(date2);

        if(tag+'-'+std+'-'+min == date1.getDate()+'-'+date1.getHours()+'-'+date1.getMinutes())
        {    
            list.push({"marketPreis":marketPreis/10,"localPreis":localPreis/10,"startTime":startTime,"endTime":endTime});
 
        }

        
    });

   
res.json({"value":list[0].localPreis})
} catch (error) {
    console.log('marktdaten-deutschland API Außer betrieb - Daten aus der lokalen Datei holen ... ')
    getPreiseTolerance(req,res);
}




});


// aufgerufen wenn die API keine Antwort liefert 
router.get("/preisOld", getPreiseOld, (req, res) => {


})



function getPreiseOld(req, res, next) {
    let counter = 0;
    let value = 0;
    let [m,t,s] = getCurrentTime();


    const readStream = fs.createReadStream('daten/preise.csv', 'utf-8');
    let rl = readline.createInterface({ input: readStream });
    rl.on('line', (line) => {
        counter++;


        let tag = line.split(',')[0].split('.')[0];
        let monat = line.split(',')[0].split('.')[1];
        let stunde = line.split(',')[1].split(':')[0];
        let preis = line.split(',')[2];

       
        m= '05' //MAi
        t= 14 //Tag
        
  

        if (monat == m && tag == t && stunde == s) {
            value = parseFloat((preis/1000).toFixed(5));
        }


    });
    rl.on('close', () => {
        console.log('Data parsing Preisdaten completed');
    });

    readStream.on('error', (error) => console.log(error.message));
    readStream.on('data', (chunk) => {

        // console.log(chunk)
    });
    readStream.on('end', () => {

        res.json({"value":value*100}); //preis pro kWh
        console.log('Reading Preisdaten complete')
        next();

    });
};
function getPreiseTolerance(req, res) {
    let counter = 0;
    let value = 0;
    let [m,t,s] = getCurrentTime();


    const readStream = fs.createReadStream('daten/preise.csv', 'utf-8');
    let rl = readline.createInterface({ input: readStream });
    rl.on('line', (line) => {
        counter++;


        let tag = line.split(',')[0].split('.')[0];
        let monat = line.split(',')[0].split('.')[1];
        let stunde = line.split(',')[1].split(':')[0];
        let preis = line.split(',')[2];

       
        m= '05' //MAi
        t= 14 //Tag
        
  

        if (monat == m && tag == t && stunde == s) {
            value = parseFloat((preis/1000).toFixed(5));
        }


    });
    rl.on('close', () => {
        console.log('Data parsing Preisdaten completed');
    });

    readStream.on('error', (error) => console.log(error.message));
    readStream.on('data', (chunk) => {

        // console.log(chunk)
    });
    readStream.on('end', () => {

        res.json({"value":value*100}); //preis pro kWh
        console.log('Reading Preisdaten complete')
        

    });
};
function getCurrentTime() {


    let jetzt = new Date();
    let monat = jetzt.getMonth() + 1; // Januar ist 0, daher muss 1 hinzugefügt werden
    let tag = jetzt.getDate();
    let stunde = jetzt.getHours();


    return [monat, tag, stunde];

}
function getStd() {


    let jetzt = new Date();
    let stunde = jetzt.getHours();
    


    return stunde;

}

function getCurrentTimeCustom() {


    let jetzt = new Date();
    let tag = jetzt.getDate();
    let stunde = jetzt.getHours();
    let minute = jetzt.getMinutes();

    minute = Math.floor(minute / 15) * 15;

   // if(minute=='0') minute='00'


    return [tag,stunde,minute];

}
module.exports = router;
