(function($) {

  var helpers = {
    createLine: function(x1, y1, x2, y2, options){
      
                  // Check if browser is Internet Exploder ;)
                  var isIE = navigator.userAgent.indexOf("MSIE") > -1;
                  if (x2 < x1){
                    var temp = x1;
                    x1 = x2;
                    x2 = temp;
                    temp = y1;
                    y1 = y2;
                    y2 = temp;
                  }
                  var line = document.createElement("div");

                  line.className = options.class;
                  
                  // Formula for the distance between two points
                  // http://www.mathopenref.com/coorddist.html
                  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

                  line.style.width = length + "px";
                  line.style.borderBottom = options.stroke + "px " + options.style;
                  line.style.borderColor = options.color;
                  line.style.position = "absolute";
                  line.style.zIndex = options.zindex;

                  if(isIE){
                    line.style.top = (y2 > y1) ? y1 + "px" : y2 + "px";
                    line.style.left = x1 + "px";
                    var nCos = (x2-x1)/length;
                    var nSin = (y2-y1)/length;
                    line.style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + nCos + ", M12=" + -1*nSin + ", M21=" + nSin + ", M22=" + nCos + ")";
                  }else{
                    var angle = Math.atan((y2-y1)/(x2-x1));
                    line.style.top = y1 + 0.5*length*Math.sin(angle) + "px";
                    line.style.left = x1 - 0.5*length*(1 - Math.cos(angle)) + "px";
                    line.style.transform = line.style.MozTransform = line.style.WebkitTransform = line.style.msTransform = line.style.OTransform= "rotate(" + angle + "rad)";
                  }
                  return line;
                }
  }
  

  $.fn.line = function( x1, y1, x2, y2, options, callbacks) {
                return $(this).each(function(){
                  if($.isFunction(options)){
                      callback = options;
                      options = null;
                  }else{
                    callback = callbacks;
                  }
                  options = $.extend({}, $.fn.line.defaults, options);

                  $(this).append(helpers.createLine(x1,y1,x2,y2,options)).promise().done(function(){
                    if($.isFunction(callback)){
                      callback.call();
                    }
                  });

                
              });
  };
  $.fn.line.defaults = {  zindex : 10000,
                          color : '#000000',
                          stroke: "1",
                          style: "solid",
                          class: "line",
                        };
})(jQuery);

var customWindows=[];
var markers=[];
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function initStoreMap() {

    var CustomWindow = function(id){
        this.container = $('<div class="map-info-window"></div>');
        this.layer = null;
        this.marker = null;
        this.position = null;
		this.id = id;
		this.contextmenu = true;
		this.isOpen = false;
    };
    CustomWindow.prototype = new google.maps.OverlayView({contextmenu : true});
    CustomWindow.prototype.onAdd = function(){
        this.layer = $(this.getPanes().floatPane);
        this.layer.append(this.container);
		var that = this;
        this.container.find('.map-info-close').on('click', function(event){
            // Close info window on click
            that.close();
			event.preventDefault();
			event.stopPropagation();
			return false;
        });
    };
    CustomWindow.prototype.draw = function(){
		var markerIcon = this.marker.getIcon(),
            cHeight = this.container.outerHeight()+ 15,
            cWidth = this.container.width() / 2- 10;
        this.position = this.getProjection().fromLatLngToDivPixel(this.marker.getPosition());
        this.container.css({
            'top':this.position.y - cHeight,
            'left':this.position.x - cWidth
        });
    };
    CustomWindow.prototype.onRemove = function(){
        this.container.remove();
    };
    CustomWindow.prototype.setContent = function(html){
        this.container.html(html);
    };
    CustomWindow.prototype.open = function(map, marker){
		var trombon = this;
		setTimeout(function(){
			trombon.container.addClass('opened');
		},100);
        this.marker = marker;
        this.setMap(map);
		this.isOpen = true;
    };
    CustomWindow.prototype.close = function(){
		this.container.removeClass('opened');
        this.setMap(null);
		this.isOpen=false;
    };

		// set mapOptions
	var mapOptions = {
		  center: new google.maps.LatLng(10.789108, 106.674826),
		  zoom: 13,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
	 };

		// set min and max zoom
	window.map = new google.maps.Map(document.getElementById("google-map-contact"),mapOptions);
	window.directionsService = new google.maps.DirectionsService;
    window.directionsDisplay = new google.maps.DirectionsRenderer({
		map: window.map
    });
	var opt = { minZoom: 3, maxZoom: 21 };
	map.setOptions(opt);

	
	var bounds = new google.maps.LatLngBounds();
	jQuery('[data-coordinate]').each(function(){
		var coors = jQuery(this).attr('data-coordinate').split(',');
		var point = new google.maps.LatLng(parseFloat(coors[0]), parseFloat(coors[1]));
		var icon = {
			url: template_url+'/images/marker.png', // url
			scaledSize: new google.maps.Size(40, 50), // scaled size
			origin: new google.maps.Point(0,0), // origin
			anchor: new google.maps.Point(0, 0), // anchor
			size: new google.maps.Size(40, 50)
		};
		var store_id = jQuery(this).attr('data-id');
		var marker = new google.maps.Marker({
			position: point,
			icon: icon,
			animation: google.maps.Animation.DROP,
			store_id: store_id
		});
		bounds.extend(marker.position);
		var customWindow =  new CustomWindow(store_id);
		var rating = jQuery(this).attr('data-rate')*1;
		var content = '	<div class="rotate">\
							<div class="rotate-back">\
								<img src="'+jQuery(this).attr('data-store-image')+'" />\
								<div class="map-info-wrapper">\
									<div class="map-title">'+jQuery(this).attr('data-title')+'</div>\
									<div class="map-address">\
										<i class="ts_icon ts_icon_location_pin"></i>'+jQuery(this).attr('data-address')+'\
									</div>\
									<div class="map-phone">\
										<i class="ts_icon ts_icon_phone"></i>'+jQuery(this).attr('data-phone')+'\
									</div>\
								</div>\
							</div>\
						</div>\
						<div class="rating trapezoid" data-rate="'+rating+'">\
							<i class="fa fa-star-o '+(rating>=1?'fa-star':'')+'"></i>\
							<i class="fa fa-star-o '+(rating>=2?'fa-star':'')+'"></i>\
							<i class="fa fa-star-o '+(rating>=3?'fa-star':'')+'"></i>\
							<i class="fa fa-star-o '+(rating>=4?'fa-star':'')+'"></i>\
							<i class="fa fa-star-o '+(rating>=5?'fa-star':'')+'"></i>\
						</div>';
		customWindow.contextmenu = true;
		customWindow.setContent(content);
		customWindows.push(customWindow);
		markers.push(marker);
		google.maps.event.addListener(marker, 'mouseover', function(){
			for(var i = 0;i<customWindows.length;i++){
				if(customWindows[i]!=customWindow){
					customWindows[i].close();
				}
			}
			for(var i = 0;i<markers.length;i++){
				if(markers[i]!=marker){
					markers[i].setAnimation(null);
				}
			}
			if(!customWindow.isOpen){
				customWindow.open(map, marker);
				jQuery('.stores-image').find('img').attr('src',jQuery(this).attr('data-store-image'));
				jQuery('.stores-image').find('img').attr('srcset',jQuery(this).attr('data-store-image'));
				currentStore = marker;
				
			}
			if (marker.getAnimation() == null) {
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}.bind(this));
		marker.setMap(map);
		jQuery(this).click(function(){
			
			for(var i = 0;i<markers.length;i++){
				markers[i].setVisible(true);
				
			}
			
			google.maps.event.trigger(marker, 'mouseover');
			map.setZoom(14);
			map.panTo(marker.getPosition());
			jQuery('.stores-image').find('img').attr('src',jQuery(this).attr('data-store-image'));
			jQuery('.stores-image').find('img').attr('srcset',jQuery(this).attr('data-store-image'));
			currentStore = marker;
			
			
			
		});
	});
		map.fitBounds(bounds);

}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,null,{enableHighAccuracy: true,timeout: 5000,maximumAge: 0});
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	map.setCenter(new google.maps.LatLng(lat, lng));
	map.setZoom(14);
	if(typeof(currentPosition) == 'undefined'){
		currentPosition = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			title: "Địa chỉ của tôi",
			label: "Địa chỉ của tôi",
			map: map
		});
	}else{
		currentPosition.setPosition( new google.maps.LatLng( lat, lng ) );
	}
}
function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
	directionsService.route({
		origin: pointA,
		destination: pointB,
		travelMode: google.maps.TravelMode.DRIVING
	}, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			for(var i = 0;i<customWindows.length;i++){
				if(customWindows[i].id!=currentStore.store_id){
					customWindows[i].close();
				}
			}
			for(var i = 0;i<markers.length;i++){
				if(markers[i].store_id!=currentStore.store_id){
					markers[i].setVisible(false);
				}
			}
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
}
var scrollspyTimeout;
var currentPosition;
var currentStore;
jQuery(document).ready(function($){
	$('.home-products-header>.wpb_wrapper').click(function(){
		window.location = $('#menu-main>li:nth-child(4)>a').attr('href');
	})
	$('.view-image-product-wrapper').appendTo($('body'));
	var device = window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content');
	if(device=='small'||device=='"small"'){
			$('.project-images').insertBefore($('.project-images').prev());
			
	}
	if($('.stores-list').length>0){
		
		if(device=='small'||device=='"small"'){
			var target_parent = $('.stores-map').parent().parent().parent().prev();
			$('.stores-map').parent().parent().parent().insertBefore(target_parent);
			
		}
		setTimeout(function(){
			var store_list_height = 600-50-$('.stores-image').height()-85;
			$('.stores-list').css('height',store_list_height+'px');
		},500);
		$('.store-my-location-button').click(function(){
			getLocation();
			
		});
		$('.store-find-direction-button').click(function(){
			getLocation();
			calculateAndDisplayRoute(directionsService, directionsDisplay, currentPosition.getPosition(), currentStore.getPosition());
		});
		$('.store-my-location-button').click();
	}
	$('.home-processes-header-text h1').append($('<span></span>'));
	$('.home-processes-header-text h1').append($('<span></span>'));
	$('.home-processes-header-text h1').append($('<span></span>'));
	$('.home-processes-header-text h1').append($('<span></span>'));
	var checkWidths = jQuery(window).width();
	var menu_offset_top = $('.navbar').outerHeight()+$('.top-header').outerHeight();    
	function processScroll() {
		var scrollTop = $( window ).scrollTop();
		if ((scrollTop >= menu_offset_top)&&checkWidths >= 768) {  
			$('.navbar').addClass('menu-fixed');        

		} else if (scrollTop <= menu_offset_top) {         
			$('.navbar').removeClass('menu-fixed');     
		}
	}
	$( window ).scroll(function() {
		processScroll();
	});
	// if(isFrontPage=='yes'){
	// 	$('#menu-main>li:first-child > a').attr('data-to','.top-header');
	// 	$('#menu-main>li:first-child > a').attr('data-offset','0');
	// 	$('#menu-main>li:first-child > a').attr('data-addset','0');
	// 	$('#menu-main a[href*="construction"]').attr('data-to','#service');
	// 	$('#menu-main a[href*="construction"]').attr('data-offset','-100');
	// 	$('#menu-main a[href*="construction"]').attr('data-addset','600');
	// 	$('#menu-main a[href*="products"]').attr('data-to','#products');
	// 	$('#menu-main a[href*="products"]').attr('data-offset','-350');
	// 	$('#menu-main a[href*="products"]').attr('data-addset','0');
	// 	$('#menu-main a[href*="stores"]').attr('data-to','#stores');
	// 	$('#menu-main a[href*="stores"]').attr('data-offset','150');
	// 	$('#menu-main a[href*="stores"]').attr('data-addset','0');
	// 	$('#menu-main a[href*="projects"]').attr('data-to','#projects');
	// 	$('#menu-main a[href*="projects"]').attr('data-offset','0');
	// 	$('#menu-main a[href*="projects"]').attr('data-addset','400');
	// 	$('#menu-main a[href*="events"]').attr('data-to','#events');
	// 	$('#menu-main a[href*="events"]').attr('data-offset','60');
	// 	$('#menu-main a[href*="events"]').attr('data-addset','0');
	// 	$('#menu-main a').click(function(event){
	// 		var attr = $(this).attr('data-to');
	// 		//console.log($(attr).offset().top);
	// 		var offset = $(this).attr('data-offset');
	// 		if(typeof attr !== typeof undefined && attr !== false){
	// 			event.preventDefault();
	// 			event.stopPropagation();
	// 			$('html, body').animate({
	// 				scrollTop: ($(attr).offset().top + 1*offset*1)
	// 			}, 400,'swing', function() {
					
	// 			});
	// 		}
	// 	})
	// 	$('#menu-main').scrollspy2();
	// 	$('.hone-news-new-description p').each(function(){
	// 		//console.log($(this).text());
	// 		$(this).html($(this).text().replace(/(?:\r\n\r\n)/g, '\r\n'));
	// 	});
	// }
	
	if($('.maintenance-page').length>0){
		setTimeout(function(){
			var offset = $('.maintenance-image-row').outerHeight()-300;
			$('.maintenance-text-row').css('margin-top','-'+offset+'px');
		},500);
		
		$(window).resize(function(){
			setTimeout(function(){
				var offset = $('.maintenance-image-row').outerHeight()-250;
				$('.maintenance-text-row').css('margin-top','-'+offset+'px');
			},500);
		});
	}
	if($('#gform').length>0){
		var output = '	<div id="thank">\
							<h1>Thành công</h1>\
							<p>Email đã được gửi tới bộ phận hỗ trợ. Chúng tôi sẽ liên lạc với bạn trong thời gian ngắn nhất.</p>\
							<button onclick="location.reload()">Tiếp tục</button>\
						</div>';
		$(output).insertAfter($('#gform'));
		
	}
	$('.news-index-three-content>div>p').each(function(){
		//console.log(this);
		
		$(this).dotdotdot({height:"40px",truncate: "word"});
	});
	if($('body.products-page').length>0){
		if(getParameterByName('cat')!=null && getParameterByName('cat')!=''){
			var mobster = setInterval(function(){
				//console.log(getParameterByName('cat'));
				if($('[data-vc-grid-filter-value=".vc_grid-term-'+getParameterByName('cat')+'"]').length>0){
					
					
					clearInterval(mobster);
					setTimeout(function(){
						$('[data-vc-grid-filter-value=".vc_grid-term-'+getParameterByName('cat')+'"]').click();
						//console.log('clicked');
					},100);
				}
			},200)
		}
		if(getParameterByName('filter')!=null && getParameterByName('filter')!=''){
			var mobster = setInterval(function(){
				if($('[data-vc-grid-filter-value*=".vc_grid-term-"]').length>0){
					
					
					clearInterval(mobster);
					setTimeout(function(){
						$('[name="search_title"]').val(getParameterByName('filter'));
						$('[name="search_title"]').trigger('change');
					},100);
				}
			},200)
			
		}
	}
	
	$('body').on('click','.smart-slider-overlay.n2-ow',function(){
		var id = $(this).prev().find('.construction-slider-trigger').children('a').html();
		jQuery('.vc_gitem-row-position-top').removeClass('active');
		jQuery('.post-id-'+id).closest('.vc_gitem-row-position-top').addClass('active');
	});
	$('[name="quality"],[name="region"],[name="search_title"]').change(function(){
		//console.log($('[name="quality"]').val());
		//console.log($('[name="region"]').val());
		//console.log($('[name="search_title"]').val());
		if($('[name="quality"]').val()==''&&$('[name="region"]').val()==''&&$('[name="search_title"]').val()==''){
			//console.log('show all');
			$('.product-grid-element-outer').each(function() {
				$(this).css('display','');
			});
			
		}else{
			var maximum = 0;
			$('.product-grid-element-outer').each(function() {
				
				var a_point = 0;
				if($('[name="quality"]').length>0&&$('[name="quality"]').val()!=''){
					a_point += $(this).find('.project-grid-quality-hidden').html().trim()==$('[name="quality"]').val()?1:0;
				}
				if($('[name="region"]').length>0&&$('[name="region"]').val()!=''){
					a_point += $(this).find('.project-grid-region-hidden').html().trim()==$('[name="region"]').val()?1:0;
				}
				if($('[name="search_title"]').val()!=''){
					a_point += $(this).find('.product-grid-title').find('a').html().trim().indexOf($('[name="search_title"]').val())!=-1?1:0;
				}
				//console.log(a_point);
				if(a_point>=maximum&&a_point>=1){
					$(this).css('display','');
					$(this).prependTo($('.products-page .product-grid .owl-item:nth-child(1) .vc_pageable-slide-wrapper'));
					maximum = a_point;
				}else{
					$(this).css('display','none');
					
				}
				
			});
			
		}
		
	});
	if($("#carousel1").length>0){
		$('.cloudcarousel>img').each(function(){
			$(this).css('width',$('#carousel1>div:nth-child(1)').width()*0.1089+'px')
			$(this).css('height',$('#carousel1>div:nth-child(1)').width()*13.746+'px')
		});
		carouselxx = $("#carousel1").CloudCarousel({			
				// Best is half of the width you set in DIV style of carouselID
				xPos: $('#carousel1').width()/2,
				// Determines the central height of the pivot point of the carousel itself.
				yPos: $('#carousel1').width()*0.154,
				xRadius: $('#carousel1').width()/2.5,
				yRadius: $('#carousel1').width()/10,
				buttonLeft: $("#butLeft"),
				buttonRight: $("#butRight"),
				reflHeight: 0,
				reflGap:0,
				minScale:0.5,
		});
		var voila = setInterval(function(){
				if($('[class*="post-id"]').length>0){
					
					
					clearInterval(voila);
					setTimeout(function(){
						if(getParameterByName('slide')!=null && getParameterByName('slide') != '0'){
							
						}else{
							console.log($('[class*="post-id"]'));
							$('[class*="post-id"]').eq(3).closest('.vc_gitem-row-position-top').addClass('active');
						}
					},100);
					if(getParameterByName('slide')!=null){
						carouselxx.data('cloudcarousel').rotate(0-getParameterByName('slide'));
					}
				}
		},200);
		
	}
	if($('[name="stores-page-filter"]').length>0){
		$('[name="stores-page-filter"]').keyup(function(){
			$('.stores-list li').css( "display", "block" );
			$('.stores-list li').filter(function( index ) {
				return $(this).find('div:nth-child(1)').html().toLowerCase().indexOf($('[name="stores-page-filter"]').val().toLowerCase())==-1;
			}).css( "display", "none" );
	
		});
	}
	if($('.home-features-background').length>0){
		setTimeout(function(){
			var parent_width = $('.home-features-background-right').width();
			var parent_height = parent_width*2;
			var right_img_origin_width = $('.home-features-background-right').find('img').attr('width');
			var right_img_origin_height = $('.home-features-background-right').find('img').attr('height');
			var right_img_new_width = parent_height*(right_img_origin_width/right_img_origin_height);
			$('.home-features-background-right').attr('style','height:'+parent_height+'px !important;');
			$('.home-features-background-right').find('.vc_single_image-wrapper').attr('style','position: relative;height: '+parent_height+'px;width: '+parent_width+'px;overflow: hidden;transform:translateX(40%) rotate(45deg) scale(0.8,0.8);-webkit-transform:translateX(40%) rotate(45deg) scale(0.8,0.8);-webkit-backface-visibility: hidden;backface-visibility: hidden;outline: 1px solid #fff;border: 1px solid #fff;');
			
			var right_line1_y1 = parent_height - (parent_width*13 / 20) - 20;
			var right_line2_y1 = parent_height - (parent_width*13 / 20) - 20;
			var right_line2_x1 = parent_width*13/ 20 ;
			var right_line3_x1 = right_line2_x1 + 20 ;
			var right_line3_y1 = right_line2_y1 + (parent_width*7 / 20) ;
			var right_line3_stroke = 21;
			
			$('.home-features-background-right').find('.vc_single_image-wrapper').line(-1,right_line1_y1,parent_width,right_line1_y1, {color:"white",stroke:20});
			$('.home-features-background-right').find('.vc_single_image-wrapper').line(right_line2_x1,right_line2_y1,right_line2_x1,parent_height, {color:"white",stroke:20});
			$('.home-features-background-right').find('.vc_single_image-wrapper').line(right_line3_x1,right_line3_y1,right_line3_x1,parent_height, {color:"white",stroke:right_line3_stroke});
			$('.home-features-background-right').find('.vc_single_image-wrapper').line(right_line3_x1+20,right_line3_y1,right_line3_x1+20,parent_height, {color:"white",stroke:right_line3_stroke});
			$('.home-features-background-right').find('.vc_single_image-wrapper').line(right_line3_x1+40,right_line3_y1,right_line3_x1+40,parent_height, {color:"white",stroke:right_line3_stroke});
			$('.home-features-background-right').find('.vc_single_image-wrapper').line(right_line3_x1+60,right_line3_y1,right_line3_x1+60,parent_height, {color:"white",stroke:right_line3_stroke});
			$('.home-features-background-right').find('.vc_single_image-wrapper').line(right_line3_x1+80,right_line3_y1,right_line3_x1+80,parent_height, {color:"white",stroke:right_line3_stroke});
			$('.home-features-background-right').find('.vc_single_image-wrapper').line(right_line3_x1+100,right_line3_y1,right_line3_x1+100,parent_height, {color:"white",stroke:right_line3_stroke});
			$('.home-features-background-right').find('.vc_single_image-wrapper').line(right_line3_x1+120,right_line3_y1,right_line3_x1+120,parent_height, {color:"white",stroke:right_line3_stroke});
			$('.home-features-background-right').find('.vc_single_image-wrapper').line(right_line3_x1+140,right_line3_y1,right_line3_x1+140,parent_height, {color:"white",stroke:right_line3_stroke});
			$('.home-features-background-right').find('img').attr('style','height:'+parent_height+'px !important;'+'width:'+right_img_new_width+'px !important;max-width: unset;transform: translate(-80%,-50%) rotate(-45deg);-webkit-transform: translate(-80%,-50%) rotate(-45deg);position: absolute;left: 70%;top: 80%;');
			
			parent_width = $('.home-features-background-right').width();
			parent_height = parent_width*2;
			var left_img_origin_width = $('.home-features-background-left').find('img').attr('width');
			var left_img_origin_height = $('.home-features-background-left').find('img').attr('height');
			var left_img_new_width = parent_height*(left_img_origin_width/left_img_origin_height);
			$('.home-features-background-left').attr('style','height:'+parent_height+'px !important;');
			$('.home-features-background-left').find('.vc_single_image-wrapper').attr('style','position: relative;height: '+parent_height+'px;width: '+parent_width+'px;overflow: hidden;transform:translate(-40%,4%) rotate(-45deg) scale(0.8,0.8);-webkit-transform:translate(-40%,4%) rotate(-45deg) scale(0.8,0.8);-webkit-backface-visibility: hidden;backface-visibility: hidden;outline: 1px solid #fff;border: 1px solid #fff;');
			
			var right_line1_y1 = parent_height - parent_width - 20;
			
			$('.home-features-background-left').find('.vc_single_image-wrapper').line(-1,right_line1_y1,parent_width,right_line1_y1, {color:"white",stroke:20});
			$('.home-features-background-left').find('img').attr('style','height:'+parent_height+'px !important;'+'width:'+left_img_new_width+'px !important;max-width: unset;transform: translate(-20%,-50%) rotate(45deg);-webkit-transform: translate(-20%,-50%) rotate(45deg);position: absolute;left: 30%;top: 80%;');
			
			
		},2000);
		
	}
	if($('.home-banner-right-image').length>0){
		var parent_width = $('.home-banner-right-image .wpb_wrapper').width()*0.65;
		var parent_height = parent_width;
		var right_img_origin_width = $('.home-banner-right-image').find('img').attr('width');
		var right_img_origin_height = $('.home-banner-right-image').find('img').attr('height');
		var right_img_new_width = parent_height*(right_img_origin_width/right_img_origin_height);
		$('.home-banner-right-image .vc_single_image-wrapper').attr('style','position: relative;height: '+parent_height+'px;width: '+parent_width+'px;overflow: hidden;transform: translateY(20%) rotate(45deg);-webkit-transform: translateY(20%) rotate(45deg);-webkit-backface-visibility: hidden;backface-visibility: hidden;outline: 1px solid #fff;border: 4px solid #fff;');
		$('.home-banner-right-image .vc_single_image-wrapper').find('img').attr('style','height:'+parent_height*1.5+'px !important;'+'width:'+right_img_new_width*1.5+'px !important;max-width: unset;transform: translate(-50%,-50%) rotate(-45deg);-webkit-transform: translate(-50%,-50%) rotate(-45deg);position: absolute;left: 50%;top: 50%;');
	}
	if($('.home-news-content').length>0){
		//console.log('remove-img');
		var removeImgTimeout;
		removeImgTimeout = setInterval(function(){
			if($('.home-news-content .hone-news-new-description').length>0){
				clearInterval(removeImgTimeout);
				$('.home-news-content .hone-news-new-description').each(function(){
					//console.log($(this));
					//console.log($(this).html());
					$(this).find('img').remove();
				});
			}
		},200);
		
	}
})