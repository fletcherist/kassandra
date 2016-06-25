var fs = require('fs');
var parser = require('./parser/parser');
var dbName = 'db.json';

parser.getPeopleForAnalyzing();


const messageToObject = (message) => {
  var phrase = {
    type: 0,
    message: '',
    approved: false,
    createdAt: new Date()
  }
  return phrase;
}

const objectToString = (obj) => {
  return JSON.stringify(obj);
}

const generatePhrase = (message) => {
  var object = messageToObject(message);
  var string = objectToString(object);
  return string;
}

const updateDB =  (dbName, toSave) => {
  fs.writeFile(dbName, toSave);
}

const parseJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    throw new Error ('Failed to parse db json ' + e);
  }
}

const truncateDB = (dbName) => {
  if (!dbName) {
    throw new Error('No database name provided');
  }
  updateDB(dbName, '{}')
}

// var data = fs.readFileSync(dbName, 'utf-8');
// var json = parseJson(data);
// json.push(generatePhrase('/hello kittie'));
// var save = objectToString(json);
// updateDB(dbName, save);
