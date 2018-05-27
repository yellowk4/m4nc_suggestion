var m4 = m4 || {};
m4.hasJqueryObject = function($elem){ return $elem.length > 0; };

m4.loadEvent = new function(){
	this.init = function(){
		this.reset();
		this.addEvents();
	};
	
	this.reset = function(){
		this.$point = m4.$body.find(".point");
		TweenMax.set(this.$point, { y:20, force3D:true });
	};

	this.addEvents = function(){
		TweenMax.delayedCall(.4, m4.loadEvent.handlePoint);
	};

	this.handlePoint = function(){
		TweenMax.to(m4.loadEvent.$point, .4, { y:0, opacity:1, ease:Power1.easeOut });
	};
};

m4.topEvent = new function(){
	this.init = function(){
		this.reset();
		this.$ctrlTop.on("click", this.handleClick);
	};

	this.reset = function(){
		this.$ctrlTop = m4.$body.find(".ctrlTop");
		this.$topView = m4.$body.find(".topView");
	};

	this.handleClick = function(){
		if(!$(this).hasClass("current")){
			$(this).addClass("current");
			$("#header").addClass("show");
			m4.topEvent.$topView.show();
		} else{
			$(this).removeClass("current");
			$("#header").removeClass("show");
			m4.topEvent.$topView.hide();
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
			slidesPerView: "auto",
			centeredSlides: false,
			spaceBetween: 10
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

m4.view = new function(){
	this.init = function(){
		this.reset();
		this.$btnView.on("click", this.handleClick);
	};

	this.reset = function(){
		this.$btnView = m4.$body.find(".btnView");
		this.$view = m4.$body.find(".view");
		this.$infoWrap = m4.$body.find(".infoWrap");
	};

	this.handleClick = function(){
		if(!m4.view.$btnView.hasClass("current")){
			m4.view.$btnView.addClass("current");
			m4.view.Tween = TweenMax.to(m4.$body.find(".cardList"), .4, { y:-215, ease:Power1.easeOut, onComplete:function(){
				m4.view.$infoWrap.css({ opacity:0 });
				m4.view.$view.show();
				TweenMax.to(m4.view.$view, .4, { height:m4.view.$view.find("img").height(), ease:Power1.easeOut });
				m4.$contents.css({ height: $("#header").outerHeight(true) + m4.view.$view.find("img").outerHeight(true) + 219, paddingBottom:0 });
			}});
			TweenMax.to($(".bottom"), .3, { opacity:0 });
		} else{
			m4.view.$btnView.removeClass("current");
			TweenMax.to(m4.view.$view, .4, { height:0, ease:Power1.easeOut, onComplete:function(){ 
				m4.view.$infoWrap.css({ opacity:1 });
				m4.view.$view.hide(); 
				m4.view.Tween.reverse();
				m4.$contents.css({ height: "auto", paddingBottom:80 });
			} });
			TweenMax.to($(".bottom"), .3, { delay:.35, opacity:1 });
		}
	};

	this.setSize = function(){
		if(m4.view.$btnView.hasClass("current")){
			m4.$contents.css({ height: $("#header").outerHeight(true) + m4.view.$view.find("img").outerHeight(true) + 219 });
			m4.view.$view.css({ height: m4.view.$view.find("img").height() });
		}
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