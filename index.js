const fs = require('fs')
const home = require('os').homedir()

const leptonrcFile = home + '/.leptonrc'
let version = 'GitHub'
if (fs.existsSync(leptonrcFile)) {
  const content = fs.readFileSync(leptonrcFile)
  const config = JSON.parse(content)
  if (config.enterprise) {
    if (config.enterprise.enable) {
      console.log('----> Switching to Lepton for GitHub...')
      config.enterprise.enable = false
    } else {
      console.log('----> Switching to Lepton for GitHub Enterprise...')
      config.enterprise.enable = true
      version += ' Enterprise'
    }
  } else {
    console.log('----> Please enable Lepton for GitHub Enterprise manually for the first time.')
  }
  fs.writeFileSync(leptonrcFile, JSON.stringify(config, null, 2), 'utf8')
  console.log(`----> Congrats!! Lepton for ${version} is enabled. Restart Lepton to see the changes.`)
}