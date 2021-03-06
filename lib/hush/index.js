 function Config (conffile) {
  conffile     = conffile || 'hush.conf'
  const fs     = require('fs');
  var platform = require('os').platform()
  var homedir  = require('os').homedir()
  var path     = homedir + '/.hush/'
  var mac_path = homedir + "/Library/Application Support/Hush/"

  if (fs.existsSync(path)) {
    conffile = path + conffile
  }
  else if (platform == "win32") {
    // should we be auto-creating here?
    if (!fs.existsSync(process.env.APPDATA + '\\Hush')) {
      fs.mkdirSync(process.env.APPDATA + '\\Hush')
    }
    var path = process.env.APPDATA + '\\Hush\\'
    conffile = path + conffile
  }
  else if (fs.existsSync(mac_path)) {
    path     = mac_path
  }
  else {
    // TODO
    throw "Unsupported OS"
  }
  // Read all lines from config file, remove commented lines and empty lines.
  self.filteredlines = require('fs').readFileSync(conffile, 'utf-8').split('\n').filter(line => line.trim() && !line.trim().startsWith('#'))
  // Create a dictionary from keys and values
  self.keysvalues = self.filteredlines.reduce(function(map, line) {
    var sp = line.split('=', 2)
    if (sp.length == 2) {
        map[sp[0].trim()] = sp[1].trim();
    }
    return map;
  }, {});
}

Config.prototype.get = function (name) {
  return self.keysvalues[name]
};
Config.prototype.rpcuser = function (name) {
  return self.keysvalues['rpcuser']
};
Config.prototype.rpcpassword = function (name) {
  return self.keysvalues['rpcpassword']
};
Config.prototype.rpcport = function (name) {
  return this.get('testnet') == 1 ? 18822 : 8822
};

module.exports =   {
   Config:Config  
}

