const moment = require('moment');

function formatMessage(username, text) {
  const data = {
    username,
    text,
    time: moment().format('h:mm a')
  }
  console.log("Data Sent: ", data)
  return data
}

module.exports = formatMessage;
