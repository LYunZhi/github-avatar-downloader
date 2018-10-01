var request = require('request')
var githubToken = require('./secrets.js')
var fs = require('fs')

var avatarSource = process.argv.slice(2)
var avatarPath = '/avatars'

console.log('Welcome to the GitHub Avatar Downloader!');

if (!fs.existsSync(__dirname + avatarPath)) {
  fs.mkdir(__dirname + avatarPath, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Folder sucessfully created!')
    }
  })
}

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
  request.get(url)
  .on('err', function(err) {
    throw err
  })
  .pipe(fs.createWriteStream(filePath))
}

if (!avatarSource[0] || !avatarSource[1]) {
  console.log('Please input both a owner and repo...')
} else {
  getRepoContributors(avatarSource[0], avatarSource[1], function(err, result) {
    if (err) {
      console.log("Errors:", err);
    }
    for (var i = 0; i < result.length; i++) {
      downloadImageByURL(result[i].avatar_url, 'avatars/' + result[i].login + '.png')
    }
    console.log('Program finished!')
  });
}


