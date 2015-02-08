var express = require('express'),
    exphbs  = require('express-handlebars');
 
var app = express(),
    bodyParser = require('body-parser'),
    phantom = require('phantom'),
    fs   = require('fs'),
    marked = require('marked'),
    htmlparser = require("htmlparser"),
    _ = require('underscore');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'handlebars');

// main index, allows you to drop in your file  
app.get('/', function (req, res) {
  res.render('home', {
    layout: 'app'
  });
});

// Post to /convert with your file so that we can
// and let the magic happen
app.post('/convert', function (req, res) {
  console.log('converting the file');
  var savePath = 'tmp/tmpFile.handlebars';
  var content = marked(req.body.content);
  var meta = findMetaInfo(content);
  createTempFile(content, savePath, meta);

  res.render('download', {
    layout: 'app',
    fileName: meta.title || 'File',
    fileLayout: meta.layout
  });
});

// take the html output by marked and drop it into the 
// layout that the file specifies. 
app.get('/generated/tmpFile', function (req, res) {
  console.log('rendering generated');
  res.render('../tmp/tmpFile', {
    layout: req.query.layout,
    title: 'hi',
    content: fs.readFile('/tmp/tmpFile.handlebars', function(){})
  });
});

// send the file to the user
app.get('/download/tmpFile', function (req, res) {
  console.log('send file to user');
  res.download('tmp/tmpFile.pdf');
});

var findMetaInfo = function (content) {
  var handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error){ console.log(error); }
  });
  
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(content);
  
  var frontMatter = handler.dom[0].data;

  var defaults = {
    title: null,
    layout: 'skeleton',
    pageWidth: '8.5in',
    pageHeight: '11in',
    pageMargin: '.5in'
  }

  var file = {}

  _.each(defaults, function (value, key){
    var re = new RegExp(key + ': (.*)');
    var match = re.exec(frontMatter);
    file[key] = (match && match[1]) || value;
  });

  file['layoutPath'] = 'themes/' + file.layout;
  return file;
}

var createTempFile = function (content, savePath, meta) {
  fs.writeFile(savePath, content, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
      renderPDF(meta);
    }
  });
}

var renderPDF = function (meta, options) {
  phantom.create(function (ph) {
    ph.createPage(function (page) {
      page.open('https://pulper.herokuapp.com/generated/tmpFile?layout=' + meta.layoutPath, function (status) {
        page.set('paperSize', {
          width: meta.pageWidth,
          height: meta.pageHeight,
          margin: meta.pageMargin
        });
        page.render('tmp/tmpFile.pdf');
      });
    });
  });
}


// Allow public directory to be used for static files
app.use(express.static(__dirname + '/public'));

// Start me up on 3000 locally, or wherever heroku wants
app.listen(process.env.PORT || 3000);

