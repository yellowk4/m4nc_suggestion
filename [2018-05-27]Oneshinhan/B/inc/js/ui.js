var m4 = m4 || {};
m4.hasJqueryObject = function($elem){ return $elem.length > 0; };

m4.view = new function(){
	this.init = function(){
		var that = this;
		this.reset();
		this.$viewCtrl.on("click", this.handleClick);

		this.$listCon.find("li").each(function(){
			TweenMax.set($(this), { y: $(this).outerHeight(true), opacity:0 })
		})

		TweenMax.set(this.$link, { opacity:0 })

		TweenMax.delayedCall(.5, function(){
			that.$listCon.find("li").each(function(idx){
				TweenMax.to($(this), .35, { y:0, opacity:1, delay:.1 * idx, ease:Power1.easeOut })
			})
		})
		TweenMax.delayedCall(1, function(){
			TweenMax.to(that.$link, .5, { opacity:1, delay:.2, ease:Power1.easeOut })
		})

	};

	this.reset = function(){
		this.$listCon = m4.$body.find(".listCon");
		this.$link = m4.$body.find(".link");
		this.$viewCtrl = this.$listCon.find(".viewCtrl");
		this.$view = m4.$body.find(".view");
		this.$viewCtrl.each(function(idx){ $(this).data("key", idx) });
	};

	this.handleClick = function(){
		var key = $(this).data("key"),
			$that = $(this);
		// console.log($that)
		if(key !== 1) return; 

		if(!m4.view.$listCon.hasClass("current")){
			m4.view.Tween = TweenMax.to(m4.view.$listCon, .3, { y:0, ease:Power1.easeOut }); //-195
		}
		m4.view.$listCon.addClass("current");
		if(!$(this).hasClass("current")){
			console.log(1234)
			$(this).addClass("current").parents("li").addClass("current");
			m4.view.$view.delay(100).slideDown(500)
			// m4.view.$view.eq(key).show();
			// var imgHeight = m4.view.$view.eq(key).find("img").height();
			// TweenMax.to(m4.view.$view.eq(key), .5, { delay:.1, height:imgHeight, ease:Power1.easeOut, onComplete:function(){
			// 	m4.$contents.css({ height:m4.view.$listCon.outerHeight(true)});
			// } });
			TweenMax.to($("html, body"), .35, { scrollTop: $(this).parents("li").offset().top - 7, delay:.35, ease:Linear.easeNone })
		} else{
			$(this).removeClass("current").parents("li").removeClass("current");
			m4.view.$view.delay(100).slideUp(500)
			TweenMax.delayedCall(.4, function(){
				if(m4.view.$listCon.find(".viewCtrl.current").length === 0){
					m4.view.$listCon.removeClass("current");
					m4.view.Tween.reverse();
				}
				m4.$contents.css({ height:"auto" });
			})
			// TweenMax.to(m4.view.$view.eq(key), .4, { height:0, ease:Power1.easeOut, onComplete:function(){ 
			// 	m4.view.$view.eq(key).hide(); 
				
			// } });
		}
		

		return false;
	};

	this.setSize = function(isSet){
		if(isSet){
			m4.view.$view.each(function(idx){
				if($(this).is(":visible")){
					$(this).css({ height:$(this).find("img").height() })
				}
			});
			m4.$contents.css({ height:m4.view.$listCon.outerHeight(true) });
		}
		else m4.$contents.css({ height:"auto" });
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
		TweenMax.set(this.$allMenu, {y: this.$allMenu.outerHeight(true), opacity:0 })
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
                TweenMax.to(that.$allMenu, .6, { y:0, opacity:1, ease: Power1.easeOut })
				TweenMax.set(that.$dim, {zIndex:4});
				TweenMax.to(that.$dim, .7, { opacity:1, ease: Power1.easeOut, onComplete:function(){
					m4.$body.css({overflow:'hidden'})
				}})

				TweenMax.delayedCall(.35, function(){
					that.$allMenu.find(classNames.con).each(function(idx){
						TweenMax.to($(this), .35, { y:0, opacity:1, delay: .2 * idx, ease:Power1.easeOut })
					})
				})
				

            } else {
				// that.$allMenu.find(classNames.con).each(function(idx){
				// 	TweenMax.to($(this),  .35, { y: $(this).find("img").height(), opacity:0, delay:.2 * idx, ease:Power1.easeOut })
				// })

                TweenMax.to(that.$allMenu, .45, { y: that.$allMenu.outerHeight(true), opacity:0, delay:.25, ease: Power1.easeOut, onComplete:function(){
					m4.$body.removeAttr("style");
				}})
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
				m4.$body.removeAttr("style");
			}})
			that.$btnOpen.removeClass(classNames.toggle)
		})

	}

}

// UI Init
m4.UI = new function(){
	this.init = function(){
		m4.hasJqueryObject( m4.$body.find(".topView") ) && m4.topEvent.init();
		m4.hasJqueryObject( m4.$body.find(".listCon") ) && m4.view.init();
		m4.hasJqueryObject( m4.$body.find(".allMenu") ) && m4.allMenu.init();
	};
};

$(function(){
	m4.$window = $(window);
	m4.$body = $("body");
	m4.$contents = m4.$body.find("#contents");
	m4.UI.init();
});

$(window).on("resize", function(){
	// if(m4.view.$listCon.find(".viewCtrl.current").length !== 0) m4.view.setSize(true);
	// else m4.view.setSize(false);
	if(!m4.allMenu.$btnOpen.hasClass("active")){
		TweenMax.set(m4.allMenu.$allMenu, { y: m4.allMenu.$allMenu.outerHeight(true) })
	}
});