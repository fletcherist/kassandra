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
  if (!links) {
    return false;
  }
  var parsedLinks = [];
  links.forEach((link) => {
    var parsedLink = parseLink(link);
    if (parsedLink) {
      parsedLinks.push(parsedLink);  
    }
    
  });
  return parsedLinks;
};


var getPeopleForAnalyzing = async (delay => {
  var body = await (req());
  var links = findLinks(body);
  analyzeOne(links[0]);
});

var analyzeOne = async(name => {
  console.log('analyzer: analyze ' + name);
  var body = await (req(name));
  var questiong = findQuestions(body);
  // var links = findLinks(body);
  // console.log(body);
});

var findQuestions = (body) => {
  var regex = /<h1 class="streamItemContent streamItemContent-question">([\S\s]{0,150})<\/h1>/ig;
  var nonFormatedQuestions = body.match(regex);
  if (!nonFormatedQuestions) {
    return false;
  }

  var questions = [];
  nonFormatedQuestions.forEach(question => {
    var probQuestion = parseQuestion(question);
    if (!probQuestion) {
      return false;
    }
    questions.push(probQuestion);
  });

  console.log(questions);
};

var parseQuestion = (question) => {
  if (!question) {
    return false;
  }

  question = question
    .replace('\n', '')
    .replace('<h1 class="streamItemContent streamItemContent-question">', '')
    .replace('</h1>', '')
    .replace(/^\s{0,}/, '')
    .replace(/\s{0,}$/, '');
  return question;
};

getPeopleForAnalyzing();