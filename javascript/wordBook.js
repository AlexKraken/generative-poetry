var wordBook = function(input) {

  var wordList = input.toUpperCase().split(" ")
  var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var contents = []

  var book = new Array(26)
  for(var i = 0; i < book.length; i++) {
    book[i] = []
  }

  for (var i = 0; i < wordList.length; i++) {
    var word = wordList[i]
    var char = word.charAt(0)
    var index = key.indexOf(char)

    if(book[index].indexOf(word) == -1) {
      book[index].push(word)
      if(contents.indexOf(char) == -1) {
        contents.push(char)
      }
    }
  }

  return [book, contents]
}
