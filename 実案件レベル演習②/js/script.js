//hamburgerメニュー
jQuery(function ($) {
  $('.js-hamburger').on('click', function() {
    if($(this).hasClass('open')) {
      $('.js-drawer').fadeOut();
      $(this).removeClass('open');
      $('.mv').removeClass('open');
      $('html').removeClass('fixed');
      //.js-hamburgerが閉じている時、.header__logo imgをblackのデータに
      $('.header__logo a').children('img').attr('src', './img/common/img_logo_black.svg');
    }else {
      $('.js-drawer').fadeIn();
      $(this).addClass('open');
      $('.mv').addClass('open');
      $('html').addClass('fixed');
      //.js-hamburgerが開いている時、.header__logo imgをwhiteのデータに
      $('.header__logo a').children('img').attr('src', './img/common/konlogo_white.svg');
    }
  });
});


//header
jQuery(function ($) {
  var _window = $(window),
      _header = $('.header'),
      mvBottom;

  _window.on('scroll', function() {
      mvBottom = $('.mv').height();
      if(_window.scrollTop() > mvBottom) {
          _header.addClass('transform');
      }else {
          _header.removeClass('transform');
      }
  });

  _window.trigger('scroll');
});

//menu-slider(複数枚を横に断続的にスライドさせる)
jQuery(function ($) {
  $('.slider-items').not('.slick-initialized').slick({
    arrows: false,//左右の矢印なし
    autoplay: true,//自動的に動き出す
    autoplaySpeed: 0,//自動的に動き出す待ち時間
    speed: 5000,//スライドのスピード
    infinite: true,//スライドをループ
    pauseOnHover: false,//オンマウスでスライドを一時停止させない
    pauseOnFocus: false,//フォーカスした際にスライドを一時停止させない
    cssEase: 'linear',//スムースな動きで見せたいのでlinear
    slidesToShow: 4,//スライドを画面に4枚見せる
    slidesToScroll: 1,//1回のスライドで動かす要素数
    responsive: [
      {
        breakpoint: 769,//横幅が769px以下
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });
});

//お品書きのsp幅のみslider
jQuery(function($) {
  function switchByWidth(){
    if (window.matchMedia('(max-width: 767px)').matches) {
        $('.menus-slider').not('.slick-initialized').slick({
          arrows: false,
          autoplay: true,
          autoplaySpeed: 0,
          speed: 5000,
          infinite: true,
          pauseOnHover: false,
          pauseOnFocus: false,
          cssEase: 'linear',
          slidesToShow: 2.2,
          slidesToScroll: 1,
        });
    } else if (window.matchMedia('(min-width:768px)').matches) {
        $('.menus-slider.slick-initialized').slick('unslick');//768px以上の時はslickを解除
    }
}

//ロードとリサイズの両方で同じ処理を付与する
window.onload = switchByWidth;
window.onresize = switchByWidth;
});


//accordion
jQuery(function ($) {
  $('.js-accordion-title').on('click', function() {
    //クリックしたjs-accordion-title以外の全てのopenを取る
    $('.js-accordion-title').not(this).removeClass('open');
    //クリックされたjs-accordion-title以外のcontentを閉じる
    $('.js-accordion-title').not(this).next().slideUp(300);
    $(this).toggleClass('open');
    //thisのcontentを展開、開いていれば閉じる
    $(this).next().slideToggle(300);
  });
})


//accordionの文字の省略
jQuery(function($) {
  $('.accordion-title').each(function() {
    var $target = $(this);
    // オリジナルの文章を取得する
    var html = $target.html();
    // 対象の要素を、高さにautoを指定し非表示で複製する
    var $clone = $target.clone();
    $clone
        .css({
          display: 'none',
          position: 'absolute',
          overflow: 'visible'
        })
        .width($target.width())
        .height('auto');

    // DOMを一旦追加
		$target.after($clone);

    // 指定した高さになるまで、1文字ずつ消去していく
    while((html.length > 0) && ($clone.height() > $target.height())) {
      html = html.substr(0, html.length - 1);
      $clone.html(html + '...');
    }

    // 文章を入れ替えて、複製した要素を削除する
		$target.html($clone.html());
		$clone.remove();
  })
})