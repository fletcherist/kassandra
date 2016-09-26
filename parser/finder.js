const async = require('asyncawait/async')
const await = require('asyncawait/await')
const Promise = require('bluebird')

const Requester = require('./requester')
const Parser = require('./parser')

const findPeople = async (delay => {
  var body = await (Requester.makeRequest())
  var links = Parser.findLinks(body)
  if (!links) {
    console.log('there is no people for analyzing')
    return false
  }
  links.forEach(link => {
    findUserByAlias(link)
    await (Promise.delay(300))
  })
})

const findUserByAlias = async(name => {
  console.log('analyzer: analyze ' + name)
  var body = await (Requester.makeRequest(name))


  var questions = Parser.findQuestions(body)
  var VKLink = Parser.findVKLink(body)
  if (VKLink) {
  	console.log(questions)
  	console.log(VKLink)
  }
  // var links = findLinks(body)
  // console.log(body)
})


exports.findPeople = findPeople
exports.findUserByAlias = findUserByAlias