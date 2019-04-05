$(".ah2").on({
   mouseenter: function(){
    $('.pe-7s-call').addClass('swing');
  },
  mouseleave: function(){
  	$('.pe-7s-call').removeClass('swing');
  }
});
$(".ah1").on({
   mouseenter: function(){
    $('.pe-7s-phone').addClass('swing');
  },
  mouseleave: function(){
  	$('.pe-7s-phone').removeClass('swing');
  }
});
$(".ah3").on({
   mouseenter: function(){
    $('.pe-7s-mail').addClass('swing');
  },
  mouseleave: function(){
  	$('.pe-7s-mail').removeClass('swing');
  }
});


$('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 25000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});

$('.vc_is-hover').mouseover(function(){
  $(this).css('transition','0.4s all');
  $(this).css();
  console.log('aa');
});


// $(".dang-ky-bao-gia").on({
//    mouseenter: function(){
//     $('.btn-dang-hide').css('display','block');
//     $('.btn-dang-hide').addClass('btn-hien');
//   },
//   mouseleave: function(){
//     $('.btn-dang-hide').css('display','none');
//     $('.btn-dang-hide').removeClass('btn-hien');
//   }
// });

$('#y-kien-kh1').on('click', function() {
    $('.y-kien-kh1').css('display','block');
    $('.y-kien-kh2').css('display','none');
    $('.y-kien-kh3').css('display','none');
    $('#y-kien').css('background-image','url(http://cybercore.vn/wp-content/uploads/2018/07/IMG_0957-1.png)');
});
$('#y-kien-kh2').on('click', function() {
    $('.y-kien-kh1').css('display','none');
    $('.y-kien-kh2').css('display','block');
    $('.y-kien-kh3').css('display','none');
    $('#y-kien').css('background-image','url(http://cybercore.vn/wp-content/uploads/2018/07/IMG_0957-3.png)');
});
$('#y-kien-kh3').on('click', function() {
    $('.y-kien-kh1').css('display','none');
    $('.y-kien-kh2').css('display','none');
    $('.y-kien-kh3').css('display','block');
    $('#y-kien').css('background-image','url(http://cybercore.vn/wp-content/uploads/2018/07/IMG_0970-1.png)');
});

$(".hover-white").on({
   mouseenter: function(){
     $('.hover-white img').attr('src','https://cybercore.vn/wp-content/themes/cybercore/images/btn-dang-ky-phong-game-hover.png');
  },
  mouseleave: function(){
     $('.hover-white img').attr('src','https://cybercore.vn/wp-content/uploads/2018/07/btn-dang-ky-phong-game.png');
  }
});

// $(".float-right-slide").on({
//    mouseenter: function(){
//      $('.popmake-1900.float-right-slide img').attr('src','https://cybercore.vn/wp-content/themes/cybercore/images/btn-dang-ky-phong-game-hover.png');
//   },
//   mouseleave: function(){
//      $('.popmake-1900.float-right-slide img').attr('src','https://cybercore.vn/wp-content/uploads/2018/07/btn-dang-ky-phong-game.png');
//   }
// });

// $("#y-kien-kh2").on({
//    mouseenter: function(){
//     $('.y-kien-kh1').css('display','none');
//     $('.y-kien-kh2').css('display','block');
//     $('.y-kien-kh3').css('display','none');
//     $('#y-kien').css('background-image','url(http://cybercore.vn/wp-content/uploads/2018/07/IMG_0970-1.png)');
//   },
//   mouseleave: function(){
//     $('.y-kien-kh1').css('display','block');
//     $('.y-kien-kh2').css('display','none');
//     $('.y-kien-kh3').css('display','none');
//     $('#y-kien').css('background-image','url(http://cybercore.vn/wp-content/uploads/2018/07/GPM_2991.png)');
//   }
// });

// $("#y-kien-kh3").on({
//    mouseenter: function(){
//     $('.y-kien-kh1').css('display','none');
//     $('.y-kien-kh2').css('display','none');
//     $('.y-kien-kh3').css('display','block');
//     $('#y-kien').css('background-image','url(http://cybercore.vn/wp-content/uploads/2018/07/IMG_0957-1.png)');
//   },
//   mouseleave: function(){
//     $('.y-kien-kh1').css('display','block');
//     $('.y-kien-kh2').css('display','none');
//     $('.y-kien-kh3').css('display','none');
//     $('#y-kien').css('background-image','url(http://cybercore.vn/wp-content/uploads/2018/07/GPM_2991.png)');
//   }
// });