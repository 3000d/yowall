$(function() {
  var old_color = -1;
  var old_old_color = -1;

  $("#add").on('click', function() {
    var color = generateColorNumber();

    while(color === old_color || color === old_old_color) {
      color = generateColorNumber();
    }

    var $elmt = $('<li/>').addClass('color_' + color).addClass('new').html('markus');
    $("#yo_list").prepend($elmt);

    setTimeout(function() {
      $elmt.removeClass('new');
    }, 100);

    old_old_color = old_color;
    old_color = color;
  });

  function generateColorNumber() {
    return parseInt(Math.random() * 7);
  }
});