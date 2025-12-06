const { execSync } = require('child_process');
const fs = require('fs');

// Create a log file to see what is happening
const logFile = 'install_debug.log';

function log(message) {
    const timestamp = new Date().toISOString();
    const msg = `${timestamp}: ${message}\n`;
    try {
        fs.appendFileSync(logFile, msg);
    } catch (e) {
        console.error("Cannot write to log file");
    }
    console.log(msg);
}

log("--- STARTING CUSTOM INSTALLER SCRIPT ---");
log(`Current Directory: ${process.cwd()}`);
log(`Node Version: ${process.version}`);

try {
    // 1. Check if node_modules exists
    if (fs.existsSync('node_modules')) {
        log("node_modules folder FOUND. Skipping installation.");
    } else {
        log("node_modules folder MISSING. Attempting to run npm install...");
        
        // 2. Run npm install synchronously (wait for it to finish)
        try {
            log("Executing command: npm install --legacy-peer-deps");
            
            // We increase the buffer size to handle large output
            const output = execSync('npm install --legacy-peer-deps', { 
                encoding: 'utf8',
                maxBuffer: 1024 * 1024 * 10 // 10MB buffer
            });
            
            log("NPM Install Output:\n" + output);
            log("Installation SUCCESSFUL.");
        } catch (installError) {
            log("!!! NPM INSTALL FAILED !!!");
            log("Error Message: " + installError.message);
            if (installError.stdout) log("Stdout: " + installError.stdout.toString());
            if (installError.stderr) log("Stderr: " + installError.stderr.toString());
            
            // We don't exit here, we try to start anyway just in case, 
            // or we let it crash so the log is saved.
        }
    }

    // 3. Start the actual server
    log("Attempting to start server.js...");
    
    if (fs.existsSync('./server.js')) {
        require('./server.js');
        log("server.js required successfully.");
    } else {
        log("CRITICAL: server.js not found in this directory!");
    }

} catch (err) {
    log("CRITICAL SCRIPT ERROR: " + err.message);
    log(err.stack);
}
