<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js'></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

<script src="{{URL::asset('frontEnd/js/bootstrap.min.js')}}"></script>
<script src="{{URL::asset('frontEnd/js/bootstrap.bundle.min.js')}}"></script>
<script src="{{URL::asset('frontEnd/js/mail.js')}}"></script>
<script src="{{URL::asset('frontEnd/js/migration.js')}}"></script>
<script src="{{URL::asset('frontEnd/js/cloudcarousel.js')}}"></script>
<script src="{{URL::asset('frontEnd/js/dot.js')}}"></script>
<script src="{{URL::asset('frontEnd/js/gmap.js')}}"></script>
<script src="{{URL::asset('frontEnd/css/slick.js')}}"></script>
<script src="{{URL::asset('frontEnd/css/custom.js')}}"></script>
<script src="{{URL::asset('frontEnd/js/scrollspy.js')}}"></script>
<script src="{{URL::asset('frontEnd/js/jquery.ck.min.js')}}"></script>
<script src="{{URL::asset('frontEnd/js/ninjapopups.min.js')}}"></script>
<script src="{{URL::asset('frontEnd/js/owl.carousel.min.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.js"></script>

<script>
    $(document).ready(function() {
        $('.customer-logos').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false,
            dots: false,
            pauseOnHover: false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }, {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    });
</script>
<!-- 
<script src="{{URL::asset('frontEnd/js/js_composer/assets/js/dist/js_composer_front.min3c21.js?ver=5.1.1')}}"></script>
<script src="{{URL::asset('frontEnd/js/js_composer/assets/lib/waypoints/waypoints.min3c21.js?ver=5.1.1')}}"></script>
<script src="{{URL::asset('frontEnd/js/js_composer/assets/lib/prettyphoto/js/jquery.prettyPhoto.min3c21.js?ver=5.1.1')}}"></script>
<script src="{{URL::asset('frontEnd/js/js_composer/assets/lib/bower/twbs-pagination/jquery.twbsPagination.min3c21.js?ver=5.1.1')}}"></script>
<script src="{{URL::asset('frontEnd/js/js_composer/assets/lib/owl-carousel2-dist/owl.carousel.min3c21.js?ver=5.1.1')}}"></script>
<script src="{{URL::asset('frontEnd/js/js_composer/assets/lib/bower/imagesloaded/imagesloaded.pkgd.min6959.js?ver=4.9.3')}}"></script>
<script src="{{URL::asset('frontEnd/js/js_composer/assets/js/dist/vc_grid.min3c21.js?ver=5.1.1')}}"></script> -->



<script type="text/javascript">
    var slideshowDuration = 4000;
    var slideshow = $('.main-content .slideshow');

    function slideshowSwitch(slideshow, index, auto) {
        if (slideshow.data('wait')) return;

        var slides = slideshow.find('.slide');
        var pages = slideshow.find('.pagination');
        var activeSlide = slides.filter('.is-active');
        var activeSlideImage = activeSlide.find('.image-container');
        var newSlide = slides.eq(index);
        var newSlideImage = newSlide.find('.image-container');
        var newSlideContent = newSlide.find('.slide-content');
        var newSlideElements = newSlide.find('.caption > *');
        if (newSlide.is(activeSlide)) return;

        newSlide.addClass('is-new');
        var timeout = slideshow.data('timeout');
        clearTimeout(timeout);
        slideshow.data('wait', true);
        var transition = slideshow.attr('data-transition');
        if (transition == 'fade') {
            newSlide.css({
                display: 'block',
                zIndex: 2
            });
            newSlideImage.css({
                opacity: 0
            });

            TweenMax.to(newSlideImage, 1, {
                alpha: 1,
                onComplete: function() {
                    newSlide.addClass('is-active').removeClass('is-new');
                    activeSlide.removeClass('is-active');
                    newSlide.css({
                        display: '',
                        zIndex: ''
                    });
                    newSlideImage.css({
                        opacity: ''
                    });
                    slideshow.find('.pagination').trigger('check');
                    slideshow.data('wait', false);
                    if (auto) {
                        timeout = setTimeout(function() {
                            slideshowNext(slideshow, false, true);
                        }, slideshowDuration);
                        slideshow.data('timeout', timeout);
                    }
                }
            });
        } else {
            if (newSlide.index() > activeSlide.index()) {
                var newSlideRight = 0;
                var newSlideLeft = 'auto';
                var newSlideImageRight = -slideshow.width() / 8;
                var newSlideImageLeft = 'auto';
                var newSlideImageToRight = 0;
                var newSlideImageToLeft = 'auto';
                var newSlideContentLeft = 'auto';
                var newSlideContentRight = 0;
                var activeSlideImageLeft = -slideshow.width() / 4;
            } else {
                var newSlideRight = '';
                var newSlideLeft = 0;
                var newSlideImageRight = 'auto';
                var newSlideImageLeft = -slideshow.width() / 8;
                var newSlideImageToRight = '';
                var newSlideImageToLeft = 0;
                var newSlideContentLeft = 0;
                var newSlideContentRight = 'auto';
                var activeSlideImageLeft = slideshow.width() / 4;
            }

            newSlide.css({
                display: 'block',
                width: 0,
                right: newSlideRight,
                left: newSlideLeft,
                zIndex: 2
            });

            newSlideImage.css({
                width: slideshow.width(),
                right: newSlideImageRight,
                left: newSlideImageLeft
            });

            newSlideContent.css({
                width: slideshow.width(),
                left: newSlideContentLeft,
                right: newSlideContentRight
            });

            activeSlideImage.css({
                left: 0
            });

            TweenMax.set(newSlideElements, {
                y: 20,
                force3D: true
            });
            TweenMax.to(activeSlideImage, 1, {
                left: activeSlideImageLeft,
                ease: Power3.easeInOut
            });

            TweenMax.to(newSlide, 1, {
                width: slideshow.width(),
                ease: Power3.easeInOut
            });

            TweenMax.to(newSlideImage, 1, {
                right: newSlideImageToRight,
                left: newSlideImageToLeft,
                ease: Power3.easeInOut
            });

            TweenMax.staggerFromTo(newSlideElements, 0.8, {
                alpha: 0,
                y: 60
            }, {
                alpha: 1,
                y: 0,
                ease: Power3.easeOut,
                force3D: true,
                delay: 0.6
            }, 0.1, function() {
                newSlide.addClass('is-active').removeClass('is-new');
                activeSlide.removeClass('is-active');
                newSlide.css({
                    display: '',
                    width: '',
                    left: '',
                    zIndex: ''
                });

                newSlideImage.css({
                    width: '',
                    right: '',
                    left: ''
                });

                newSlideContent.css({
                    width: '',
                    left: ''
                });

                newSlideElements.css({
                    opacity: '',
                    transform: ''
                });

                activeSlideImage.css({
                    left: ''
                });

                slideshow.find('.pagination').trigger('check');
                slideshow.data('wait', false);
                if (auto) {
                    timeout = setTimeout(function() {
                        slideshowNext(slideshow, false, true);
                    }, slideshowDuration);
                    slideshow.data('timeout', timeout);
                }
            });
        }
    }

    function slideshowNext(slideshow, previous, auto) {
        var slides = slideshow.find('.slide');
        var activeSlide = slides.filter('.is-active');
        var newSlide = null;
        if (previous) {
            newSlide = activeSlide.prev('.slide');
            if (newSlide.length === 0) {
                newSlide = slides.last();
            }
        } else {
            newSlide = activeSlide.next('.slide');
            if (newSlide.length == 0)
                newSlide = slides.filter('.slide').first();
        }

        slideshowSwitch(slideshow, newSlide.index(), auto);
    }

    function homeSlideshowParallax() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > windowHeight) return;
        var inner = slideshow.find('.slideshow-inner');
        var newHeight = windowHeight - (scrollTop / 2);
        var newTop = scrollTop * 0.8;

        inner.css({
            transform: 'translateY(' + newTop + 'px)',
            height: newHeight
        });
    }

    $(document).ready(function() {
        $('.slide').addClass('is-loaded');

        $('.slideshow .arrows .arrow').on('click', function() {
            slideshowNext($(this).closest('.slideshow'), $(this).hasClass('prev'));
        });

        $('.slideshow .pagination .item').on('click', function() {
            slideshowSwitch($(this).closest('.slideshow'), $(this).index());
        });

        $('.slideshow .pagination').on('check', function() {
            var slideshow = $(this).closest('.slideshow');
            var pages = $(this).find('.item');
            var index = slideshow.find('.slides .is-active').index();
            pages.removeClass('is-active');
            pages.eq(index).addClass('is-active');
        });

        /* Lazyloading
        $('.slideshow').each(function(){
          var slideshow=$(this);
          var images=slideshow.find('.image').not('.is-loaded');
          images.on('loaded',function(){
            var image=$(this);
            var slide=image.closest('.slide');
            slide.addClass('is-loaded');
          });
        */

        var timeout = setTimeout(function() {
            slideshowNext(slideshow, false, true);
        }, slideshowDuration);

        slideshow.data('timeout', timeout);
    });

    if ($('.main-content .slideshow').length > 1) {
        $(window).on('scroll', homeSlideshowParallax);
    }
</script>