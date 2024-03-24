const express = require('express')
const router = express.Router();
const { exec } = require('child_process');
const Client = require('ssh2').Client;
const Docker = require('dockerode');

// Define the Docker command you want to execute
const dockerPullCommand = 'sudo docker-compose pull prosumerapp';
const dockerInstallCommand = 'sudo docker-compose up -d prosumerapp';

// Replace with your server details and private key path
//const serverHost = '52.86.213.65';
const username = 'ec2-user';
const privateKeyPath = 'priv-key.txt';

const connPull = new Client();
const connInstall = new Client();

 
router.get('/', async (req, res) =>
{

    res.sendFile(__dirname + '/html/updatePage.html');
});

// Routen-Handler für den "Get Update" Button definieren
 router.get('/pull', async (req, res) => {
    // Hier kannst du die gewünschten Aktionen ausführen
    let serverHost = req.query.ip;

   pullUpdate (serverHost);
   await sleep(15000);
   installUpdate(serverHost);

   res.send('update abgeschlossen.')
    
    
});

function pullUpdate (ip) {
    console.log('pulling image ...');

    connPull.on('ready', () => {
        console.log('Connected to server for pulling');
      
        // Execute commands after successful connection (optional)
        // You can replace this with your desired commands
        connPull.exec(dockerPullCommand, (err, stream) => {
          if (err) {
            console.error(err);
            return;
          }
      
          stream.on('data', (data) => {
            console.log(data.toString());
          });
      
          stream.on('end', () => {
            console.log('pull execution finished.');
            connPull.end();
          });
        });
    
      });
      
      connPull.connect({
        host: ip,
        username: username,
        privateKey: require('fs').readFileSync(privateKeyPath) // Read private key content
      });
}

 function installUpdate (ip) {
    console.log('restart service...');
    connInstall.on('ready', () => {
        console.log('Connected to server to restart a service');
           
        connInstall.exec(dockerInstallCommand, (err, stream) => {
          if (err) {
            console.error(err);
            return;
          }
      
          stream.on('data', (data) => {
            console.log(data.toString());
          });
      
          stream.on('end', () => {
            console.log('service restarted.');
            connInstall.end();
          });
        });
      });
      
      connInstall.connect({
        host: ip,
        username: username,
        privateKey: require('fs').readFileSync(privateKeyPath) // Read private key content
      });
      
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }




module.exports = router;