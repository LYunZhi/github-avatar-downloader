var request = require('request')
var githubToken = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': githubToken
    }
  }

  request(options, function(err, res, body) {
    var object = JSON.parse(body)
    cb(err, object)
  })
}

function downloadImageByURL(url, filePath) {
  // ...
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (var i = 0; i < result.length; i++) {
    console.log(result[i].avatar_url)
  }
});
