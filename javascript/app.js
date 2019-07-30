/* https://github.com/sindresorhus/screenfull.js/
$('body').on('click', event => {
  if (screenfull.enabled) {
    screenfull.toggle();
  }
});
*/


var newWordBook = wordBook(poem)
var newBook = newWordBook[0]
var newIndex = newWordBook[1]

console.log(newBook)
console.log(newIndex)

var terms = poem.toUpperCase().split(" ")
var randomIndex = Math.floor(Math.random() * terms.length)

var contains = true
var start = terms[randomIndex]
var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

var count = 0;
var scale = 500;

var finished = true

var generate = setInterval(function() {
  if (finished) {
    finished = false
    var choiceIndex = []
    for (var i = 0; i < start.length; i++) {
      var char = start.charAt(i)
      if (newIndex.indexOf(char) != -1) {
        choiceIndex.push(char)
      }
    }

    var randomIndex = Math.floor(Math.random() * choiceIndex.length)
    var pickChoice = choiceIndex[randomIndex]
    var pickList = newBook[key.indexOf(pickChoice)].slice()

    randomIndex = Math.floor(Math.random() * pickList.length)
    var pickWord = pickList[randomIndex]

    while (pickWord == start) {
      pickList.splice(randomIndex, 1)
      randomIndex = Math.floor(Math.random() * pickList.length)
      pickWord = pickList[randomIndex]
    }

    if (pickList[randomIndex] != undefined) {


      //$('<span class="' + start + count + '"></span>').appendTo('body')

      // Limits to four columns as more causes major slow downs
      if (count < 150) {
        $('<span class="' + start + count + '"></span>').appendTo('.container')
      } else if (count < 200) {
        $('<span class="' + start + count + '"></span>').appendTo('.column1')
      } else if (count < 225) {
        $('<span class="' + start + count + '"></span>').appendTo('.column2')
      } else {
        var pick = count % 4
        scale = 300
        $('<span class="' + start + count + '"></span>').appendTo('.p' + pick)
      }

      var decrypted = decryption(start, '.' + start + count)

      var selectFront = start.slice(0, start.indexOf(pickChoice))
      var selectEnd = start.slice(start.indexOf(pickChoice) + 1)

      count++
      start = pickList[randomIndex]

      decrypted.then(function(className) {

        // Need a cleaner solution than this
        // Oscillates the text scale factor
        var shrink = (Math.floor(count / 60) % 2) == 0 ? false : true
        scale = shrink ? scale += 10 : scale -= 10
        var textSize = "style = font-size:" + (scale > 0 ? scale : 5) + "%"

        var highlight = '<span class="decrypted"' + textSize + '>' + " " + selectFront + '</span>' +
          '<span class="highlight"' + textSize + '>' + pickChoice + '</span>' +
          '<span class="decrypted"' + textSize + '>' + selectEnd + " " + '</span>'

        $('.' + className).replaceWith(highlight)
        finished = true;
      }).catch(function() {
        console.log("whoops")
      })
    } else {
      finished = true
    }
    window.scrollBy({
      top: 100,
      left: 0,
      behavior: 'smooth'
    });
    console.log("RUN")
  }
  console.log("setInterval" + count)
}, 500);
