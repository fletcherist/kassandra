var request = require('request')
var async = require('asyncawait/async')
var await = require('asyncawait/await')
var Promise = require('bluebird')

const Filters = require('./filters')
const Requester = require('./requester')

const makeRequest = Requester.makeRequest

const findLinks = (body) => {
    var link = /<a href="(\/.*)"/ig
    var result = body.match(link)
    var links = parseLinks(result)
    return links
}

const parseLink = (link) => {
  var regex = /<a href="(\/.*)">/
  var string = regex.exec(link)
  if (string && string[1]) {
    string = string[1].toString().substr(1)
  }
  return string
}

const parseLinks = (links) => {
  if (!links) {
    return false
  }
  var parsedLinks = []
  links.forEach((link) => {
    var parsedLink = parseLink(link)
    if (parsedLink) {
      parsedLinks.push(parsedLink)  
    }
    
  })
  return parsedLinks
}



var findQuestions = (body) => {
  var regex = /<h1 class="streamItemContent streamItemContent-question">([\S\s]{0,150})<\/h1>/ig
  var nonFormatedQuestions = body.match(regex)
  if (!nonFormatedQuestions) {
    return false
  }

  var questions = []
  nonFormatedQuestions.forEach(question => {
    var probQuestion = Filters.filterQuestion(question)
    if (!probQuestion) {
      return false
    }
    questions.push(probQuestion)
  })

  return questions
}

const findVKLink = (body) => {
  var regex = 
    /<div class="aboutMore more expanded">([\S\s]{0,300})<\/div>/ig
  var link = body.match(regex)
  if (link) {
    link = link[0]
    var linkExpand = /(^https?:\/\/)?.{0,10}vk\.com\/(.{0,100})/ig
    link = link.match(linkExpand)

    if (link) {
      link = link[0]
        .toString()
        .trim()
        .replace('<p>', '')
        .replace('</p>', '')
        .replace('</a>', '')
        .replace('=">', '')
        .replace('">', '')
    }
    return link
  }

  return false
}

exports.findLinks = findLinks
exports.findQuestions = findQuestions
exports.findVKLink = findVKLink