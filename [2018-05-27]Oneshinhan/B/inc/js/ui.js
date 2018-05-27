var m4 = m4 || {};
m4.hasJqueryObject = function($elem){ return $elem.length > 0; };

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

m4.view = new function(){
	this.init = function(){
		this.reset();
		this.$viewCtrl.on("click", this.handleClick);
	};

	this.reset = function(){
		this.$listCon = m4.$body.find(".listCon");
		this.$viewCtrl = this.$listCon.find(".viewCtrl");
		this.$view = m4.$body.find(".view");
		this.$viewCtrl.each(function(idx){ $(this).data("key", idx) });
	};

	this.handleClick = function(){
		var key = $(this).data("key");
		if(!m4.view.$listCon.hasClass("current")){
			m4.view.Tween = TweenMax.to(m4.view.$listCon, .3, { y:0, ease:Power1.easeOut }); //-195
		}
		m4.view.$listCon.addClass("current");
		if(!$(this).hasClass("current")){
			$(this).addClass("current");
			m4.view.$view.eq(key).show();
			var imgHeight = m4.view.$view.eq(key).find("img").height();
			TweenMax.to(m4.view.$view.eq(key), .5, { delay:.3, height:imgHeight, ease:Power1.easeOut, onComplete:function(){
				m4.$contents.css({ height:m4.view.$listCon.outerHeight(true)});
			} });
		} else{
			$(this).removeClass("current");
			TweenMax.to(m4.view.$view.eq(key), .4, { height:0, ease:Power1.easeOut, onComplete:function(){ 
				m4.view.$view.eq(key).hide(); 
				if(m4.view.$listCon.find(".viewCtrl.current").length === 0){
					m4.view.$listCon.removeClass("current");
					m4.view.Tween.reverse();
				}
				m4.$contents.css({ height:"auto" });
			} });
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


// UI Init
m4.UI = new function(){
	this.init = function(){
		m4.hasJqueryObject( m4.$body.find(".topView") ) && m4.topEvent.init();
		m4.hasJqueryObject( m4.$body.find(".listCon") ) && m4.view.init();
	};
};

$(function(){
	m4.$window = $(window);
	m4.$body = $("body");
	m4.$contents = m4.$body.find("#contents");
	m4.UI.init();
});

$(window).on("resize", function(){
	if(m4.view.$listCon.find(".viewCtrl.current").length !== 0) m4.view.setSize(true);
	else m4.view.setSize(false);
});