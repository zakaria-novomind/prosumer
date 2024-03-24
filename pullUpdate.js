const express = require('express')
const router = express.Router();
const { exec } = require('child_process');
const Client = require('ssh2').Client;

// Define the Docker command you want to execute
const dockerPullCommand = 'sudo docker-compose pull prosumerapp';
const dockerInstallCommand = 'sudo docker-compose up -d prosumerapp';

// Replace with your server details and private key path
const serverHost = '52.86.213.65';
const username = 'ec2-user';
const privateKeyPath = 'priv-key.txt';

const conn = new Client();

 const counter = 1;
router.get('/', async (req, res) =>
{

    res.sendFile(__dirname + '/html/updatePage.html');


//res.sendFile(path.join(__dirname, 'index.html'));
});

// Routen-Handler für den "Get Update" Button definieren
router.get('/pull',pullUpdate, (req, res) => {
    // Hier kannst du die gewünschten Aktionen ausführen
    
    
    // Beispiel: Ein fiktives Update durchführen
    // setTimeout(() => {
    //     console.log('Update abgeschlossen.');
    //     res.send('Update abgeschlossen!');
    // }, 3000); // Nach 3 Sekunden simuliertem Update abschließen
});

function pullUpdate (req, res, next) {
    console.log('Update wird durchgeführt...');

    // conn.connect({
    //     host: serverHost,
    //     username: username,
    //     privateKey: require('fs').readFileSync(privateKeyPath) // Read private key content
    //   });

    //   conn.on('ready', () => {
    //     console.log('Connected to server');
      
    //     // Execute commands after successful connection (optional)
    //     // You can replace this with your desired commands
    //     conn.exec(dockerPullCommand, (err, stream) => {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
      
    //       stream.on('data', (data) => {
    //         console.log(data.toString());
    //       });
      
    //       stream.on('end', () => {
    //         console.log('Command execution finished.');
    //         conn.end();
    //       });
    //     });
      
      
    //     conn.exec(dockerInstallCommand, (err, stream) => {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
      
    //       stream.on('data', (data) => {
    //         console.log(data.toString());
    //       });
      
    //       stream.on('end', () => {
    //         console.log('Command execution finished.');
    //         conn.end();
    //       });
    //     });
    //   });
      

    counter ++;
    let cmd = 'mkdir dir-'+ counter;
    // Execute the Docker command
exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing Docker command: ${error}`);
        return;
    }

    if (stderr) {
        console.error(`Docker command stderr: ${stderr}`);
        return;
    }

    // Docker command output
    console.log(`Docker command output: ${stdout}`);
});

    // // Execute the Docker command
    // exec(dockerInstallCommand, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`Error executing Docker command: ${error}`);
    //         return;
    //     }
    
    //     if (stderr) {
    //         console.error(`Docker command stderr: ${stderr}`);
    //         return;
    //     }
    
    //     // Docker command output
    //     console.log(`Docker command output: ${stdout}`);
    // });
      setTimeout(() => {
        console.log('Update abgeschlossen.');
        res.send('Update abgeschlossen!');
    }, 3000); // Nach 3 Sekunden simuliertem Update abschließen
    next();
}



module.exports = router;