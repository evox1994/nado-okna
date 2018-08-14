'use strict';

$(function () {

  var is_device_a_tablet = $.restive.isTablet(),
    is_device_a_phone = $.restive.isPhone();

  var swipe = is_device_a_phone || is_device_a_tablet;
  var preloader = $('#page-preloader');
  var bar = $('.load-bar_back');

  $("input[name='tel']").mask("+7(999) 999 99 99", {placeholder: "_"});

  $("input[name='count']").styler();

  $('form').each(function () {
    var $form = $(this);
    $(this).validate({
      submitHandler: function (form) {
        var
          properties = {
            form: $form.attr('id'),
            name: $form.find('[name=name]').val(),
            tel: $form.find('[name=tel]').val(),
            time: $form.find('[name=time]').val(),
            description: $form.find('[name=description]').val()
          },
          post_data = {};
        for (var key in properties) {
          if (properties[key] !== undefined) {
            post_data[key] = properties[key];
          }
        }

        $.post("/partner/send.php", post_data)
          .done(function (data) {
            form.reset();
            window.location = absPath('thank.html');
          });
        return false;
      }
    })
  });

  $('.slick__slider').slick();

  $('.fancybox').fancybox({
    autoScale: false,
    padding: 0,
    speedIn: 2000,
    speedOut: 2000,
    loop: true,
    helpers: {
      overlay: {
        locked: false,
        css: {
          'background': 'rgba(0, 0, 0, 0.25)'
        }
      }
    }
  });

  $('.nav__button').on('click', function (e) {
    e.preventDefault();
    var button = $(this),
      nav = $('.nav__holder');
    nav.addClass('active');
  });

  $('.nav__close').on('click', function (e) {
    e.preventDefault();
    var button = $(this),
      nav = $('.nav__holder');
    nav.removeClass('active');
  });

  $('.nav__arrow').on('click', function (e) {
    e.preventDefault();
    if (window.matchMedia("(max-width: 1279px)").matches) {
      var arrow = $(this),
        link = arrow.parents('a'),
        item = link.parents('li'),
        items = $('.nav__block a'),
        navs = $('.nav__inner'),
        nav = link.siblings('.nav__inner');
      if(!link.hasClass('active')){
        items.removeClass('active');
        navs.slideUp();
        item.addClass('open');
        link.addClass('active');
        nav.slideDown();
      }
      else{
        item.removeClass('open');
        link.removeClass('active');
        nav.slideUp();
      }
    }
  });

  var
    parallaxScroll = function () {
      var scroll = $(window).scrollTop();

      if (!swipe) {
        $('.parallax__wrap').each(function () {
          var block = $(this),
            offset = block.offset().top;
          if (scroll > offset) {
            var bg = offset - scroll;
            block.css({
              '-webkit-transform': 'translateY(' + (-(bg * .35)) + 'px)',
              '-moz-transform': 'translateY(' + (-(bg * .35)) + 'px)',
              '-ms-transform': 'translateY(' + (-(bg * .35)) + 'px)',
              '-o-transform': 'translateY(' + (-(bg * .35)) + 'px)',
              'transform': 'translateY(' + (-(bg * .35)) + 'px)'
            });
          }
          else {
            block.css({
              '-webkit-transform': 'translateY(0)',
              '-moz-transform': 'translateY(0)',
              '-ms-transform': 'translateY(0)',
              '-o-transform': 'translateY(0)',
              'transform': 'translateY(0)'
            });
          }
        });
      }
    },
    equal = function () {
      $('.benefits__title').css('height', 'auto').equalheight();
      $('.footer__links-title').css('height', 'auto').equalheight();
    },
    absPath = function (url) {
      var Loc = location.href;
      Loc = Loc.substring(0, Loc.lastIndexOf('/'));
      while (/^\.\./.test(url)) {
        Loc = Loc.substring(0, Loc.lastIndexOf('/'));
        url = url.substring(3);
      }
      return Loc + '/' + url;
    },
    fix = function () {
      var block = $('.header__holder'),
        top = $(window).scrollTop(),
        checkpoint = $('.header').innerHeight();
      if (top > checkpoint) {
        block.addClass('fixed');
      }
      else {
        block.removeClass('fixed');
      }
    };

  $.fn.equalheight = function () {
    Array.max = function (array) {
      return Math.max.apply(Math, array);
    };
    var heights = this.map(function () {
      return $(this).innerHeight();
    }).get();
    return this.innerHeight(Array.max(heights));
  };

// footer
//-----------------------------------------------------------------------------
  var
    $pageWrapper = $('#pageWrapper'),
    footer = {
      $element: $('#footer'),
      height: null,
      place: function () {
        var self = this;
        self.height = self.$element.outerHeight();
        $pageWrapper.css({paddingBottom: self.height});
        self.$element.css({marginTop: -self.height});
      }
    };

  $(window).on({
    load: function () {
      var $grid = $('.isotope__grid').isotope({
        itemSelector: '.isotope__item',
        layoutMode: 'fitRows',
        getSortData: {
          name: '.name',
          symbol: '.symbol',
          number: '.number parseInt',
          category: '[data-category]',
          weight: function( itemElem ) {
            var weight = $( itemElem ).find('.weight').text();
            return parseFloat( weight.replace( /[\(\)]/g, '') );
          }
        }
      });

      $('#filters').on( 'click', 'a', function(e) {
        e.preventDefault();
        var filterValue = $(this).attr('data-filter'),
          item = $(this).parents('li'),
          items = $(this).parents('ul').find('li');
        items.removeClass('active');
        item.addClass('active');
        $grid.isotope({ filter: filterValue });
      });

      fix();

      equal();
      footer.place();

      initFilters();
    },
    resize: function () {
      equal();
      footer.place();
    },
    scroll: function () {
      parallaxScroll();
      fix();
    }
  });

// placeholder
//-----------------------------------------------------------------------------
  $('input[placeholder], textarea[placeholder]').placeholder();



  function initFilters() {
    var $container1 = $('.load-1');

    function loadPage(container1, container2, url) {
      container1.animate({opacity: 0.5}, 250);
      container1.load(url + ' ' + container2 + ' > *', function () {
        container1.animate({opacity: 1}, 250);
        var delta = 42;
        $('html, body').animate({
          scrollTop: $('#price__section').offset().top - delta + 1
        }, 400);
      });
    }


    $(document).on('click', '.price__tabs-buttons a', function (event) {
      if ($(this).parents('li').hasClass('active')) {
        return false;
      } else {
        History.pushState(null, document.title, $(this).attr('href'));
        loadPage($container1, '.load-container-1', $(this).attr('href'));
        return false;
      }
    });

    History.Adapter.bind(window, 'statechange', function (e) {
      var State = History.getState();
      loadPage($container1, '.load-container-1', State.url);
    });
  }

});