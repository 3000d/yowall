$(function() {
  var socket = io.connect();

  var old_color = -1;
  var old_old_color = -1;

  setInterval(function() {
    updateTime();
  }, 10000);

//  dev: press 'a' to simulate a yo
//  $(document).on('keyup', function (e) {
//    if(e.which === 65) {
//      addYo(Math.random().toString(36).substring(7));
//    }
//  });

  socket.on('yo', function (data) {
    addYo(data.username);
  });

  function addYo(username) {
    var color = generateColorNumber();

    while(color === old_color || color === old_old_color) {
      color = generateColorNumber();
    }

    var $small = $("<small/>").attr('data-timestamp', moment().unix()).html(moment().fromNow());
    var $span = $("<span/>").html(username);
    var $elmt = $('<li/>').addClass('color_' + color).addClass('new').append($span).append(" ").append($small);
    $("#yo_list").prepend($elmt);

    setTimeout(function() {
      $elmt.removeClass('new');
    }, 100);

    old_old_color = old_color;
    old_color = color;
  }

  function updateTime() {
    $("#yo_list").find("li small").each(function() {
      var timestamp = $(this).attr('data-timestamp');
      var ago = moment.unix(parseInt(timestamp)).fromNow();
      if($(this).html() !== ago) {
        $(this).html(ago);
      }
    });
  }

  function generateColorNumber() {
    return parseInt(Math.random() * 7);
  }
});