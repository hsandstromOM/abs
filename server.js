var express    = require('express')    // call express
var app        = express()             // define our app using express
var compression = require('compression')
app.use(compression(`${__dirname}/www`))
var http = require('http')
var HttpCors = require('http-cors')
var cors = new HttpCors()
var HttpHashRouter = require('http-hash-router')
var router = HttpHashRouter()
var prerender = require('prerender-node')

var bodyJSON = require('body/json')
var sendJSON = require('send-data/json')
var sendError = require('send-data/error')
var sendHtml = require('send-data/html')

var fs = require('fs')
var ejs = require('ejs')
var ecstatic = require('ecstatic')

var fetchConfig = require('zero-config')
var config = fetchConfig(__dirname, { dcValue: 'us-east-1'})

var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')
var mandrillTransport = require('nodemailer-mandrill-transport')

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'png', 'jpg', 'jpeg', 'svg', 'gif', 'js', 'css', 'url'],
  maxAge: '1w',
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.static(`${__dirname}/www`, options));

// load inprocess service
var ee = require('./services')()

// app.use(require('prerender-node').set('prerenderToken', 'bCDSypXLkVdEzThyUTfR'))

router.set('/api/info', {
  POST: function (req, res) {
    bodyJSON(req, res, function (err, body) {
      // verify token
      var dbname = body.name.replace('@','_').replace('.','_')
      //var url = [config.get('dbServer.url'), dbname].join('/')
      sendJSON(req, res, dbname)
    })
  }
})

router.set('/api', {
  POST: function(req, res) {
    bodyJSON(req, res, function(err, body) {
      var timeoutFired = false
      var to = setTimeout(function () {
        timeoutFired = true
        sendError(req, res, { body: 'Timeout Occured on Event: ' + body.subject})
      }, 2000)
      ee.once(body.from, function (e) {
        clearTimeout(to)
        if (!timeoutFired) sendJSON(req, res, e)
      })
      ee.emit('send', body)
    })
  }
})

// templates
router.set('/home', handleTemplatePage)

router.set('/app', handleAppTemplate)

router.set('/', handleTemplatePage)


// static assets
// explicitly set routes
router.set('/fonts/*', ecstatic({ root: __dirname + '/www', handleError: false}))
router.set('/blocs.min.css', ecstatic({ root: __dirname + '/www',  handleError: false}))
router.set('/img/*', ecstatic({ root: __dirname + '/www', handleError: false}))
router.set('/browser.min.js', ecstatic({ root: __dirname + '/www', handleError: false}))
router.set('/main.min.css', ecstatic({ root: __dirname + '/www', handleError: false}))


var server = http.createServer(function (req, res) {
  if (cors.apply(req, res)) return res.end()

  router(req, res, {}, onError)
  // handle Error
  function onError (err) {
    //sendError(req, res, {body: err})
    handleTemplatePage(req, res)
  }
})



server.listen(process.env.PORT || 3001);

// support methods
function handleAppTemplate (req, res) {
  var page = fs.readFileSync(__dirname + '/templates${req.url}.html', 'utf-8')
  renderApp(req, res, page)
}

function handleTemplatePage (req, res) {
  if (req.url === '/') req.url = '/layout.html'
  var page = fs.readFileSync(__dirname + '/templates/app.html', 'utf-8')
  render(req, res, page)
}

function renderApp (req, res, template) {
  var layout = fs.readFileSync(__dirname + '/templates/layout.html', 'utf-8');
  //var nav = fs.readFileSync(__dirname + '/templates/nav.html', 'utf-8')
  var footer = fs.readFileSync(__dirname + '/templates/footer.html', 'utf-8');
  sendHtml(req, res, ejs.render(layout, {
    nav: '',
    body: template,
    footer: '',
  }))
}

function render (req, res, template) {
  var layout = fs.readFileSync(__dirname + '/templates/layout.html', 'utf-8');
  var nav = fs.readFileSync(__dirname + '/templates/nav.html', 'utf-8');
  var footer = fs.readFileSync(__dirname + '/templates/footer.html', 'utf-8');

  // res.writeHead(200, {'Content-Type': 'text/html'});
  sendHtml(req, res, ejs.render(layout, {
    nav: nav,
    body: template,
    footer: footer
  }))
}
app.use(prerender).set('prerenderServiceUrl', 'http://www.appliedbuildingsciences.com/').set('prerenderToken', 'bCDSypXLkVdEzThyUTfR');
