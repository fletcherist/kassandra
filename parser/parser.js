/*jshint esversion: 6 */
var request = require('request');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');

const req = (path, delay) => {
  if (!path) {
    path = '';
  }

  if (!delay) {
    delay = 0;
  }
  return new Promise(resolve => {
    setTimeout(() => {
      request(`http://ask.fm/${path}`, (a, b, c, d, e) => {
        var body = b.body;
        resolve(body);
      });
    }, delay);
  });
};

const findLinks = (body) => {
    var link = /<a href="(\/.*)"/ig;
    var result = body.match(link);
    var links = parseLinks(result);
    return links;
};

const parseLink = (link) => {
  var regex = /<a href="(\/.*)">/;
  var string = regex.exec(link);
  if (string && string[1]) {
    string = string[1].toString().substr(1);
  }
  return string;
};

const parseLinks = (links) => {
  var parsedLinks = [];
  links.forEach((link) => {
    var parsedLink = parseLink(link);
    if (parsedLinks) {
      parsedLinks.push(parsedLink);  
    }
    
  });
  return parsedLinks;
};


var getPeopleForAnalyzing = async (delay => {
  var body = await (req());
  var links = findLinks(body);
  // console.log(links);
});

getPeopleForAnalyzing();