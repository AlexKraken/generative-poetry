var decryption = function(word, location) {

  var count = 0 // Number of letters 'decrypted'
  var cycles = 1 // Number of times setInterval has looped
  var period = 2 // Number of cycles for each letter to decrypt
  var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  var beginning = "" // LHS
  var end = word.toUpperCase() // RHS
  var date = new Date().getTime()
  $('<span class="' + word + date + ' decrypt"></span>').appendTo(location) // LHS
  $('<span class="' + word + date + ' encrypt"></span>').appendTo(location) // RHS

  return new Promise(
    (resolve, reject) => {

      setInterval(function() {

        var encrypt = ""
        for (var i = 0; i < end.length; i++) {
          encrypt += key.charAt((key.indexOf(end.charAt(i)) + 1) % 26)
        }
        end = encrypt

        if (cycles % period == 0) {
          beginning = word.substring(0, cycles / period)
          end = end.substring(1)
          count++
        }

        cycles++

        $("." + word + date + ".decrypt").html(beginning)
        $("." + word + date + ".encrypt").html(end + " ")

        // Cancels loop after finishing decryption
        if (count >= word.length) {
          $("." + word + date + ".decrypt").html(beginning + " ")
          $("." + word + date + ".decrypt").addClass('decrypted')
          $("." + word + date + ".decrypt").removeClass('decrypt')
          $("." + word + date + ".encrypt").remove()
          resolve(word+date)
        }
      }, 100);
    });
}
