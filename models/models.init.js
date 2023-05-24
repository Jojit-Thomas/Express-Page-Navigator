const fs = require('fs')
fs.readdirSync('./models').forEach((nodeName) => {
  if (nodeName == 'models.init.js') return

  if (nodeName.indexOf('.js') == -1)
    fs.readdirSync(`./models/${nodeName}`).forEach((model) => {
      require(`./${nodeName}/${model}`)
    })
  else require(`./${nodeName}`)
})