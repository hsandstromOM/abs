var http = require('http')
var HttpCors = require('http-cors')
var cors = new HttpCors()
var HttpHashRouter = require('http-hash-router')
var router = HttpHashRouter()
var prerender = require('prerender-node');
var redirect = require('express-redirect');
redirect('server');

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


// load inprocess service
var ee = require('./services')()


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
      //console.log(body)
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
router.set('/fonts/*', ecstatic({ root: __dirname + '/www',  handleError: false}))
router.set('/img/*', ecstatic({ root: __dirname + '/www',  handleError: false}))
router.set('/browser.js', ecstatic({ root: __dirname + '/www',  handleError: false}))
router.set('/main.css', ecstatic({ root: __dirname + '/www',  handleError: false}))

// 301 Redirects
//Home
// app.redirect('/pages/page.asp?page_id=282699', '/', 301);
//Who We Are
// app.redirect('/pages/page.asp?page_id=289313', '/', 301);
//Team
// app.redirect('/pages/page.asp?page_id=289315', '/team', 301);
//CV PDF
// app.redirect('/uploads/abs_paul_kennedy_cv_672014.pdf', '/team', 301);
server.redirect('/uploads/Alan_Campbell_Roof_Consult_cv.pdf', '/team', 301);
// app.redirect('/uploads/Alan_Campbell_Life_safety_cv.pdf', '/team', 301);
// app.redirect('/uploads/abs_jason_gregorie_cv_May_2015.pdf', '/team', 301);
// app.redirect('/uploads/abs_bobby_funcik_cv_2016.pdf', '/team', 301);
// app.redirect('/uploads/abs_john_greenan_cv(1).pdf', '/team', 301);
// app.redirect('/uploads/abs_luis_mariaca_cv(1).pdf', '/team', 301);
// app.redirect('/uploads/Steve_Moore_CV_04152016.pdf', '/team', 301);
// app.redirect('/uploads/abs_edward_polk_cv(1).pdf', '/team', 301);
// app.redirect('/uploads/RESUME_AJS_2_4_2016.pdf', '/team', 301);
// app.redirect('/uploads/abs_joe_shahid_cv(1).pdf', '/team', 301);
// app.redirect('/uploads/Parker_Shields_cv.pdf', '/team', 301);
// app.redirect('/uploads/abs_stephanie_w_borzendowski_cv.pdf', '/team', 301);
// app.redirect('/uploads/abs_lee_capell_cv.pdf', '/team', 301);
// app.redirect('/uploads/RKD_CV_52016.pdf', '/team', 301);
// app.redirect('/uploads/abs_wayne_butler_cv(1).pdf', '/team', 301);
// app.redirect('/uploads/abs_scott_harvey_cv(1).pdf', '/team', 301);
// app.redirect('/uploads/abs_whitney_okon_cv_2014.pdf', '/team', 301);
//In The News
// app.redirect('/pages/page.asp?page_id=304912', '/', 301);
//Services
// app.redirect('/pages/page.asp?page_id=285535', '/services', 301);
//Building Enclosure
// app.redirect('/pages/page.asp?page_id=289324', '/services', 301);
//Structural Engineering
// app.redirect('/structural', '/services', 301);
// app.redirect('/pages/page.asp?page_id=290920', '/services', 301);
//Civil Engineering
// app.redirect('/pages/page.asp?page_id=285531', '/services', 301);
//Architecture
// app.redirect('/pages/page.asp?page_id=284943', '/services', 301);
//Environmental
// app.redirect('/pages/page.asp?page_id=285528', '/services', 301);
//Training & Contuing Education
// app.redirect('/pages/page.asp?page_id=285532', '/services', 301);
// app.redirect('/uploads/2016_Asbestos_Course_Schedule(2).pdf', '/services', 301);
// app.redirect('/uploads/2016_Lead_Course_Schedule_revised.pdf', '/services', 301);
// app.redirect('/pages/page.asp?page_id=296287', '/services', 301);
// app.redirect('/pages/page.asp?page_id=296288', '/services', 301);
//Contact
// app.redirect('/pages/page.asp?page_id=289319', '/contact', 301);
//Search
// app.redirect('/search.asp', '/', 301);
//Sitemap
// app.redirect('/sitemap', '/', 301);



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

  //res.writeHead(200, {'Content-Type': 'text/html'});
  sendHtml(req, res, ejs.render(layout, {
    nav: nav,
    body: template,
    footer: footer
  }))
}
