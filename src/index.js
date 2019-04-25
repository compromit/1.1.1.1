const connectBtn = document.getElementById("startstop")
const shell = require('electron').shell
const exec = require('child_process').exec
const BrowserWindow = require('electron').remote.getCurrentWindow()
const { ipcRenderer } = require('electron')

// Used for executing shell commands
function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
};

var checkedInit = document.getElementById("startstop").checked;
var connectionStatusInfo = document.getElementById("connection-status");
var connectionDetailsInfo = document.getElementById("connection-details");

function dnsSetON() {
  document.getElementById("startstop").checked = true;
  connectionStatusInfo.innerHTML = "CONNECTED";
  connectionStatusInfo.classList = "sub-text connected yes";
  connectionDetailsInfo.innerHTML = "Your DNS queries are now <b>private</b> and <b>faster</b>.";
}

function dnsSetOFF() {
  document.getElementById("startstop").checked = false;
  connectionStatusInfo.innerHTML = "DISCONNECTED";
  connectionStatusInfo.classList = "sub-text connected no";
  connectionDetailsInfo.innerHTML = "Your DNS queries are <b>not private</b>.";
}

function initAdmin() {
  var admin = false;

  if (checkedInit) {
    execute('wmic nicconfig where (IPEnabled=TRUE) call SetDNSServerSearchOrder ("1.1.1.1", "1.0.0.1")', (output) => {
      if (output.indexOf("ReturnValue = 0") > -1) {
        var admin = true;
      }

      if (output.indexOf("ReturnValue = 91") > -1) {
        var admin = false;
      }
    });
  }
}

require('electron').ipcRenderer.on('dnsSetONinit', (event, message) => {
  dnsSetON();
})
require('electron').ipcRenderer.on('dnsSetOFFinit', (event, message) => {
  dnsSetOFF();
})

// call the function
connectBtn.addEventListener('click', function(event) {
  var checked = document.getElementById("startstop").checked;
  execute('netsh interface show interface', (output) => {
      console.log(output);
  });

  if (checked) {
    // Enabling 1.1.1.1 & 1.0.0.1
    execute('wmic nicconfig where (IPEnabled=TRUE) call SetDNSServerSearchOrder ("1.1.1.1", "1.0.0.1")', (output) => {
        if (output.indexOf("ReturnValue = 0") > -1) {
          dnsSetON();
        }

        if (output.indexOf("ReturnValue = 91") > -1) {
          currentWindow.webContents.send('dnsOFF', true);
          dnsSetOFF();
        }
    });
  } else {
    // Resetting DNS values back to default
    execute('wmic nicconfig where (IPEnabled=TRUE) call SetDNSServerSearchOrder ()', (output) => {
        console.log(output);
        if (output.indexOf("ReturnValue = 0") > -1) {
          dnsSetOFF();
        } else if (output.indexOf("ReturnValue = 91") > -1) {
          dnsSetON();
        }
    });
  }
});
