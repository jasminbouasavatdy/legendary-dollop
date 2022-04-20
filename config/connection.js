const {
  connect,
  connection
} = require('mongoose');

// creates database or uses database if already existing 
connect('mongodb://localhost/legendary-dollop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;