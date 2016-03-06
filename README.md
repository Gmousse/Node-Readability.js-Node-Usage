# makeHTMLFileReadable.js

A simple example on how to use Mozilla Readability.js under Node.js to parse HTML files. 

You can find the mozilla repository here : https://github.com/mozilla/readability

In this repository you can find an example of Readability.js usage under node.js in order to parse .html file.

First, install node dependencies and Readability.js (it's not available under npm, then use github under npm to get it):

````
npm install --save-dev jsdom github:mozilla/readability
````

These dependencies are also available in my package.json.

Then, use the script in command line:

````
node makeHTMLFileReadable.js /path/to/yourfile.html /path/to/yourparsedfile.html
````

To understand how it works, look at the script.
