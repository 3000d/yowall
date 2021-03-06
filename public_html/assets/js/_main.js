$(function() {
  var socket = io.connect();

  var old_color = -1;
  var old_old_color = -1;

  var mute = false;

  setInterval(function() {
    updateTime();
  }, 10000);

//  dev: press 'a' to simulate a yo
//  $(document).on('keyup', function (e) {
//    if(e.which === 65) {
//      playYoSound();
//      addYo(Math.random().toString(36).substring(7));
//    }
//  });

  $('#mute').on('click', function(e) {
    mute = !mute;
    var $icon = $(this).find('i');
    if(mute) {
      $icon.removeClass('fa-volume-up').addClass('fa-volume-off');
    } else {
      $icon.removeClass('fa-volume-off').addClass('fa-volume-up');
    }
  });

//  $('#fullscreen').on('click', function() {
//    if(BigScreen.enabled) {
//      BigScreen.toggle();
//    } else {
//      alert('Sorry, only for decent browsers.');
//    }
//  });

  socket.on('yo', function (data) {
    playYoSound();
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

  function playYoSound() {
    if(!mute) {
      var yosound = new Audio('assets/mp3/yo.mp3');
      yosound.play();
    }
  }

  function generateColorNumber() {
    return parseInt(Math.random() * 7);
  }
});