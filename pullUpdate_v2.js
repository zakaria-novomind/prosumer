const Client = require('ssh2').Client;

// Replace with your server details and private key path
const serverHost = '52.86.213.65';
const username = 'ec2-user';
const privateKeyPath = 'priv-key.txt';

const conn = new Client();

conn.on('ready', () => {
  console.log('Connected to server');

  // Execute commands after successful connection (optional)
  // You can replace this with your desired commands
  conn.exec('sudo touch filee', (err, stream) => {
    if (err) {
      console.error(err);
      return;
    }

    stream.on('data', (data) => {
      console.log(data.toString());
    });

    stream.on('end', () => {
      console.log('Command execution finished.');
      conn.end();
    });
  });
});

conn.connect({
  host: serverHost,
  username: username,
  privateKey: require('fs').readFileSync(privateKeyPath) // Read private key content
});
