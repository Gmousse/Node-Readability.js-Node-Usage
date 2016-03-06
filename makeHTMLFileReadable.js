'use strict';
const fs = require('fs');
const jsdom = require('jsdom').jsdom;
const Readability = require('readability').Readability;

function readFile(path) {
    return fs.readFileSync(path, {encoding: 'utf-8'}).trim();
}

const file = readFile(process.argv[2]);
const doc = jsdom(file, {
    features: {
        FetchExternalResources: ['link'],
    },
});

const location = doc.location;
const uri = {
    spec: location.href,
    host: location.host,
    prePath: location.protocol + '//' + location.host,
    scheme: location.protocol.substr(0, location.protocol.indexOf(':')),
    pathBase: location.protocol + '//' + location.host + location.pathname.substr(0, location.pathname.lastIndexOf('/') + 1),
};

let article = new Readability(uri, doc).parse();
article = `
<header>
  <meta content="text/html; charset=UTF-8" http-equiv="content-type">
  <meta name="viewport" content="width=device-width; user-scalable=0">
  <link rel="stylesheet" href="chrome://global/skin/aboutReader.css" type="text/css">
  <title>${article.title}</title>
</header>
<body>
</body>
  <div id="container" class="container font-size5">
    <div style="display: block;" id="reader-header" class="header">
      <style scoped="">
        @import url("chrome://global/skin/aboutReaderControls.css");
      </style>
      <a href=${article.dir} id="reader-domain" class="domain">${article.uri.host}</a>
      <div class="domain-border"></div>
      <h1 id="reader-title">${article.title}</h1>
      <div id="reader-credits" class="credits">${article.byline}</div>
    </div>
    <div class="content">
      <style scoped="">
        @import url("chrome://global/skin/aboutReaderContent.css");
      </style>
      <div style="display: block;" id="moz-reader-content">${article.content}</div>
    </div>
</body>
 `;

fs.writeFile(process.argv[3], article, 'utf-8');
