var querystring = require('querystring');
var http = require('http');
var randomName = require('random-name');
var moment = require('moment');
var fs = require('fs');

var i = 0;
var c = 0;
var o = 0;
var separators = ["-","_","-","_","-","_","_","|","~","~",".",".",".",".",".",".","","","",""]; //"!#$%&'*+-/=?^_`{|}~..........";
var emailDomains = ["aol.com", "att.net", "comcast.net", "facebook.com", "gmail.com", "gmx.com", "googlemail.com",
  "google.com", "hotmail.com", "hotmail.co.uk", "mac.com", "me.com", "mail.com", "msn.com",  "live.com", "sbcglobal.net",
  "verizon.net", "yahoo.com", "yahoo.co.uk", "email.com", "games.com", "gmx.net", "hush.com", "hushmail.com", "icloud.com",
  "inbox.com", "lavabit.com", "love.com", "outlook.com", "pobox.com", "rocketmail.com", "safe-mail.net", "wow.com", "ygm.com",
  "ymail.com", "zoho.com", "fastmail.fm", "bellsouth.net", "charter.net", "comcast.net", "cox.net", "earthlink.net", "juno.com",
  "btinternet.com", "virginmedia.com", "blueyonder.co.uk", "freeserve.co.uk", "live.co.uk", "ntlworld.com", "o2.co.uk",
  "orange.net", "sky.com", "talktalk.co.uk", "tiscali.co.uk", "virgin.net", "wanadoo.co.uk", "bt.com", "sina.com", "qq.com",
  "naver.com", "hanmail.net", "daum.net", "nate.com", "yahoo.co.jp", "yahoo.co.kr", "yahoo.co.id", "yahoo.co.in", "yahoo.com.sg",
  "yahoo.com.ph", "hotmail.fr", "live.fr", "laposte.net", "yahoo.fr", "wanadoo.fr", "orange.fr", "gmx.fr", "sfr.fr", "neuf.fr",
  "free.fr",  "gmx.de", "hotmail.de", "live.de", "online.de", "t-online.de", "web.de", "yahoo.de", "mail.ru", "rambler.ru",
  "yandex.ru", "ya.ru", "list.ru", "hotmail.be", "live.be", "skynet.be", "voo.be", "tvcablenet.be", "telenet.be", "hotmail.com.ar",
  "live.com.ar", "yahoo.com.ar", "fibertel.com.ar", "speedy.com.ar", "arnet.com.ar", "hotmail.com", "gmail.com", "yahoo.com.mx",
  "live.com.mx", "yahoo.com", "hotmail.es", "live.com", "hotmail.com.mx", "prodigy.net.mx", "msn.com",
  "tvcabo.co.mz", "mcel.co.mz","tvcabo.co.mz", "mcel.co.mz","tvcabo.co.mz", "mcel.co.mz","tvcabo.co.mz", "mcel.co.mz",
  "tvcabo.co.mz", "mcel.co.mz","tvcabo.co.mz", "mcel.co.mz","tvcabo.co.mz", "mcel.co.mz","tvcabo.co.mz", "mcel.co.mz"
];
var ids = [
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
  "563d0d51340b0",      // Chris
//  "5630ee522478b",      // Arthur
//  "5607932d7c149",      // Hon�rio
  "5607932d7c149",      // Hon�rio
  "56346e42e5fab"      // FABRICIO
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PostCode(id, name, email) {
  // post string
  var post_data = querystring.stringify({
    "action": "vote_photo",
    "form[datecreate]": "UTC_TIMESTAMP()",
    "id": id,
    "form[name]": name,
    "form[email]": email,
    "accept": "accepted"
  });
  // indicate where to post to
  var post_options = {
    host: 'mundos20.co.mz',
    port: '80',
    path: '/jquery.php',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data),
      origin: "http://mundos20.co.mz",
      referer: "http://mundos20.co.mz/gallery.php?order=votes&sort=DESC"
    }
  };

  // Set up the request
  var req = http.request(post_options, function(res) {
    var str = "";
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      str += chunk;
//      console.log('Response: ' + str);
    });

    res.on('end', function () {
      if (id === "563d0d51340b0") {
        c++;
        cc = "*" + c.toString();
      } else {
        o++;
        cc = "x" + o.toString();
      }
      var now = moment().utcOffset(120).format("YYYY-MM-DD HH:mm:ss");
      var msg = now + ": " + str + "    " + cc + ": " + name + "(" + email + ")";
      if (i++<15000) {
        var sleep;
//        sleep = getRandomInt(1000,1000*5*getRandomInt(1,getRandomInt(1,getRandomInt(1,getRandomInt(1,1)))));
        sleep = getRandomInt(1000,1000*1*getRandomInt(1,getRandomInt(1,getRandomInt(1,getRandomInt(1,40)))));
        fs.appendFile("./posts.txt", msg + "\r\n", function(err) {
          if(err) {
            return console.log(err);
          }
          console.log(msg);
          console.log("Sleeping for " + moment.duration(sleep/1000, "seconds").humanize());
          setTimeout(post, sleep);
        });
      }
    });

    res.on('error', function () {
      console.log(str);
    });
  });

  // post the data
  req.write(post_data);
  req.end();
}

post = function() {
  var randomFirst = randomName.first();
  var randomLast = randomName.last();
  var name = randomFirst + " " + randomLast;
  var subFirst = randomFirst.substr(0, getRandomInt(1, randomFirst.length-1));  // take random number of characters from randomFirst
  var subLast = randomLast.substr(0, getRandomInt(1, randomLast.length-1));     // take random number of characters from randomLast
  var separator = separators[getRandomInt(0,separators.length-1)];
  var emailDomain = emailDomains[getRandomInt(0,emailDomains.length-1)];
  var id = ids[getRandomInt(0, ids.length-1)];
  var ename;
  switch (getRandomInt(0,3)) {
    case 0:
      ename = subFirst + separator + subLast;
      break;
    case 1:
      ename = subLast + separator + subFirst;
      break;
    case 2:
      ename = subLast;
      break;
    case 3:
      ename = subFirst;
      break;
  }
  var email = (ename + "@" + emailDomain).toLowerCase();
  PostCode(id, name, email);
};

post();
