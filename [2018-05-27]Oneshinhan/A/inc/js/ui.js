var m4 = m4 || {};
m4.hasJqueryObject = function($elem){ return $elem.length > 0; };

m4.loadEvent = new function(){
	this.init = function(){
		this.reset();
		this.addEvents();
	};
	
	this.reset = function(){
		this.$conBottom = m4.$body.find(".conBottom");
		this.$banner = m4.$body.find(".topBanner");
		this.$viewWrap = m4.$body.find(".viewWrap");
		this.$point = m4.$body.find(".point");
		this.$txt = m4.$body.find(".txt");
		this.$btn = m4.$body.find(".btn");
	};

	this.addEvents = function(){
		TweenMax.delayedCall(.4, function(){
			m4.loadEvent.handlePoint(0);
		});
	};

	this.handlePoint = function(index){
		TweenMax.to(m4.loadEvent.$viewWrap.eq(index).find(".txt"), .4, { y:0, opacity:1, delay:.1, ease:Power1.easeOut });
		TweenMax.to(m4.loadEvent.$point.eq(index), .5, { y:0, opacity:1, delay:.2, ease:Power1.easeOut });
		TweenMax.to(m4.loadEvent.$btn.eq(index), 1, { opacity:1, delay:.3, ease:Linear.easeNone})

		if(!index){
			TweenMax.to(m4.loadEvent.$banner.eq(index), .35, { y:0, opacity:1, ease:Power1.easeOut, onComplete:function(){
				TweenMax.to($(".swipeCon"), .5, { opacity:1 })
			}})
			$(".conBottom").eq(0).find("li").each(function(index){
				TweenMax.to($(this), .35, { y:0, opacity:1, delay:.15*index, ease: Power1.easeOut })
			})
		}
	};
};


// swipeX
m4.swipeX = new function(){
	this.init = function(){
		this.reset();
		m4.swipeX.obj = new Swiper(this.swipeWrap[0], {
			wrapperClass: "inner",
			slideClass: "swipeCon",
			pagination: ".paging",
			parallax: true,
			slidesPerView: "auto",
			centeredSlides: false,
			spaceBetween: 10,
			speed: 600,
			onInit: function(swiper){
				m4.loadEvent.$conBottom.eq(swiper.activeIndex).find("li").each(function(){
					TweenMax.set($(this), { y: $(this).outerHeight(true), opacity:0 })
				})
			},
			onSlideChangeStart: function(swiper){
				var activeIndex = swiper.activeIndex;
				TweenMax.delayedCall(.4, function(){
					m4.loadEvent.handlePoint(activeIndex);
				})
			}
		});
	};

	this.reset = function(){
		this.swipeWrap = m4.$body.find(".cardList");
	};

	this.update = function(){
		m4.swipeX.obj.update();
	};

	this.destroy = function(){
		m4.swipeX.obj.destroy(true, true);
	};
};
// UI Init
m4.UI = new function(){
	this.init = function(){
		m4.loadEvent.init();
		m4.hasJqueryObject( m4.$body.find(".topView") ) && m4.topEvent.init();
		m4.hasJqueryObject( m4.$body.find(".cardList") ) && m4.swipeX.init();
		m4.hasJqueryObject( m4.$body.find(".btnView") ) && m4.view.init();
	};
};

$(function(){
	m4.$window = $(window);
	m4.$body = $("body");
	m4.$contents = $("#contents");
	m4.UI.init();
});

$(window).on("resize", function(){
	m4.view.setSize(true);
});