const express = require('express')
const router = express.Router();
const { exec } = require('child_process');

// Define the Docker command you want to execute
const dockerPullCommand = 'sudo docker-compose pull prosumerapp';
const dockerInstallCommand = 'sudo docker-compose up -d prosumerapp';

 
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



    // Execute the Docker command
exec(dockerPullCommand, (error, stdout, stderr) => {
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
      setTimeout(() => {
        console.log('Update abgeschlossen.');
        res.send('Update abgeschlossen!');
    }, 3000); // Nach 3 Sekunden simuliertem Update abschließen
    next();
}



module.exports = router;