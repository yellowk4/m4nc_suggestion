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

		var icoClassNames = ['point', 'bank', 'card', 'stock', 'insur'];
		
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
				TweenMax.delayedCall(.7, function(){
					$(".paging").find("span").each(function(idx){
						TweenMax.to($(this), .5, { scale:1, opacity:1, delay:.1 * idx })
					})

					TweenMax.to($(".btnOpen"), 1, { opacity:1, delay:.2, ease:Power1.easeOut })
				})
				
			},
			onSlideChangeStart: function(swiper){
				var activeIndex = swiper.activeIndex;
				TweenMax.delayedCall(.4, function(){
					m4.loadEvent.handlePoint(activeIndex);
				})
			},
			paginationBulletRender: function(swiper, index, Class){
				return  '<span class="'+ Class + ' ' + icoClassNames[index] +'"></span>';
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

m4.allMenu = new function(){

	var classNames = {
		toggle: 'active',
		con: '.con',
    }


	this.init = function(){
		this.$btnOpen = m4.$body.find(".btnOpen");
		this.$allMenu = m4.$body.find(".allMenu");
		this.$dim = m4.$body.find(".dim");
		TweenMax.set(this.$allMenu, {y: this.$allMenu.outerHeight(true) })
		this.addEvent();


	}

	this.addEvent = function(){
		var that = this;
		this.$btnOpen.on("click", function(){
			var $that = $(this);
            if($that.toggleClass(classNames.toggle).hasClass(classNames.toggle)){
				that.$allMenu.find(classNames.con).each(function(){
					TweenMax.set($(this), { y: $(this).find("img").height(), opacity:0 })
				})

                TweenMax.to(that.$allMenu, .45, { y:0, ease:Circ.easeIn })
				TweenMax.set(that.$dim, {zIndex:1});
				TweenMax.to(that.$dim, .7, { opacity:1, ease: Power1.easeOut })

				TweenMax.delayedCall(.35, function(){
					that.$allMenu.find(classNames.con).each(function(idx){
						TweenMax.to($(this), .35, { y:0, opacity:1, delay: .2 * idx, ease:Power1.easeOut })
					})
				})
				

            } else {
				// that.$allMenu.find(classNames.con).each(function(idx){
				// 	TweenMax.to($(this),  .35, { y: $(this).find("img").height(), opacity:0, delay:.2 * idx, ease:Power1.easeOut })
				// })

                TweenMax.to(that.$allMenu, .45, { y: that.$allMenu.outerHeight(true), delay:.25, ease:Circ.easeIn })
				TweenMax.to(that.$dim, .7, { opacity:0, delay:.5, ease: Power1.easeOut, onComplete:function(){
					TweenMax.set(that.$dim, { zIndex: -1 })
				}})
            }
			
		})

		this.$dim.on("click", function(){
			var $that = $(this);
			TweenMax.to(that.$allMenu, .45, {y: that.$allMenu.outerHeight(true) })
			TweenMax.to($that, .7, { opacity:0, delay:.1, ease: Power1.easeOut, onComplete:function(){
				TweenMax.set($that, { zIndex: -1 })
				that.$btnOpen.removeClass(classNames.toggle)
			}})
		})

	}

}


// UI Init
m4.UI = new function(){
	this.init = function(){
		m4.loadEvent.init();
		m4.hasJqueryObject( m4.$body.find(".cardList") ) && m4.swipeX.init();
		m4.hasJqueryObject( m4.$body.find(".allMenu") ) && m4.allMenu.init();
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