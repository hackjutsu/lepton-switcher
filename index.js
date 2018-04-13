const fs = require('fs')
const home = require('os').homedir()
const consola = require('consola')

const leptonrcFile = home + '/.leptonrc'
if (!fs.existsSync(leptonrcFile)) {
  consola.warn('   ~/.leptonrc not found.')
  process.exit(-1)
}

let version = 'GitHub'
const content = fs.readFileSync(leptonrcFile)
const config = JSON.parse(content)

if (!config.enterprise) {
  consola.warn('   Please enable Lepton for GitHub Enterprise manually for the first time.')
  process.exit(-1)
}

if (config.enterprise.enable) {
  consola.start('  Switching Lepton to GitHub...')
  config.enterprise.enable = false
} else {
  consola.start('  Switching Lepton to GitHub Enterprise...')
  config.enterprise.enable = true
  version += ' Enterprise'
}

fs.writeFileSync(leptonrcFile, JSON.stringify(config, null, 2), 'utf8')
consola.success(`Congrats! Lepton for ${version} is enabled. Restart Lepton to see the changes.`)