const path = require('path');
const express = require('express');
const cors = require('cors');           // used for local testing
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();                // used for handling multi-part responses from FormData
const mysql = require('mysql');

// Configuration for sql
const isLocal = !( process.env.SERVER === 'true' );
const connectCfg = isLocal ? require('./private/local_sql.js') : require('./private/server_sql.js');


// Express config
const app = express();
const port = process.env.NCPORT || 3000;

app.use(bodyParser.json());                             // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));     // support encoded bodies


// CORS - ONLY WITH LOCAL
if( isLocal ){
    app.use( cors() );
    app.options('*', cors());
    console.log('using cors');
}


// Establish an SQL connection
var connection = ( function setConnection(){
    connection = mysql.createConnection( connectCfg );
    connection.connect();

    // Restart a connection with failures
    connection.on('error', function (err) {
        if( err instanceof Error ) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                setConnection(connection.config);
            } else if (err.fatal) {
                console.error( err );
                throw 'System down.';
            }
        }
    });

    return connection;
})();

// Stores results posted to site
function saveResults( name, email, message, onQueryDone ){

    // Make sure this is a valid response
    if( typeof name !== 'string' 
        || typeof email !== 'string' 
        || typeof message !== 'string'
        || name.trim().length === 0
        || email.trim().length === 0
        || message.trim().length === 0 ){
        onQueryDone( `Invalid response: (name:${name} email:${email} msg:${message})` );
        return;
    }

    // The query
    const insertQuery = `
        INSERT INTO comments (name, email, message) VALUES ('${name}', '${email}', '${message}')
    `.trim();

    connection.query( insertQuery , function (error, results, fields) {
        onQueryDone( error, results, fields );
    });
};


// Local form sending
if( isLocal ){
    app.get('/', (req, res) => res.sendFile( path.join(__dirname, 'public', 'form.html') ) );
}

// parameters sent with 
app.post('/serve/response', upload.none(), (req, res) => {
    const { contact_name, contact_email, contact_message } = req.body;

    saveResults(  contact_name, contact_email, contact_message, ( err, results, fields )=>{
        let status;
        if( err ) { 
            console.error(err); 
            status = 418;
        }
        else{ 
            console.log( 'on insert: ',  results, fields );
            status = 202;
        }

        let info = null;
        if (process.env.NODE_ENV === 'development') {
            info = {
                debug: "true"
            };
        } 
        
        res.status( status ).send( info );
    } );
});

if (process.env.NODE_ENV === 'development') {
    app.get('/serve/response', upload.none(), (req, res) => {
        res.send("-development mode-");
    });
}

app.listen(port, () => console.log(`listening on port ${port}!`));

console.log( process.env.NODE_ENV );