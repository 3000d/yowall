$(function() {
  var socket = io.connect();

  var old_color = -1;
  var old_old_color = -1;

  $("#add").on('click', function () {
    addYo(Math.random().toString(36).substring(7));
  });

  socket.on('yo', function (data) {
    addYo(data.username);
  });

  function addYo(username) {
    var color = generateColorNumber();

    while(color === old_color || color === old_old_color) {
      color = generateColorNumber();
    }

    var $elmt = $('<li/>').addClass('color_' + color).addClass('new').html(username);
    $("#yo_list").prepend($elmt);

    setTimeout(function() {
      $elmt.removeClass('new');
    }, 100);

    old_old_color = old_color;
    old_color = color;
  }

  function generateColorNumber() {
    return parseInt(Math.random() * 7);
  }
});