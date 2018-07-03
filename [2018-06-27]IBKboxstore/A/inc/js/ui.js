var Events = {
	Click: {
		Tab: 'click.tab',
		Layer: 'click.layer',
		GNB: 'click.gnb',
	}
}


var Tab = function Tab(){

	return {
		init: function(){
			var _this = this;
			this.params = {
				wrapperClass: '.initTab',
				ctrlClass: '.tabCtrl',
				viewClass: '.tabView',
				currentClass: 'current',
				activeClass: 'on',
			}

			this.$wrapper = UI.$body.find(this.params.wrapperClass);
			this.$ctrl = this.$wrapper.find(this.params.ctrlClass);
			this.$view = this.$wrapper.find(this.params.viewClass);

			this.addEvent();

			TweenMax.delayedCall(.7, function(){
				_this.$view.eq(0).find("li").each(function(idx){
					var $this = $(this);
					TweenMax.delayedCall(.1 * (idx + 1), function(){
						$this.addClass(_this.params.activeClass)
					})
				})
			})

		},
		addEvent: function(){
			var _this = this;
			this.$ctrl.on(Events.Click.Tab, function(){
				_this.onClicked.call(this, _this.params);
			})
		},
		onClicked: function(params){
			var idx = $(this).index();
			$(this).addClass(params.currentClass).siblings().removeClass(params.currentClass);
			$(params.viewClass).hide().eq(idx).show();
			$(params.viewClass).eq(idx).find("li").each(function(idx){
				var $this = $(this);
				TweenMax.delayedCall(.1 * (idx + 1), function(){
					$this.addClass(params.activeClass)
				})
			})
		}
	}

}

var Layer = function Layer() {
	
	return {
		init: function(){
			this.params = {
				wrapperClass: '.banner',
				openCtrlClass: '.bnOpen',
				closeCtrlClass: '.bnClose',
				viewClass: '.bnDetail',
				toggleClass: 'active',
			}

			this.$wrapper = UI.$body.find(this.params.wrapperClass);
			this.$openCtrl = this.$wrapper.find(this.params.openCtrlClass);
			this.$closeCtrl = this.$wrapper.find(this.params.closeCtrlClass);
			this.$view = this.$wrapper.find(this.params.viewClass);
			
			this.addEvent();
		},
		addEvent: function(){
			var _this = this;
			
			_this.$openCtrl.on(Events.Click.Layer, function(){
				_this.onOpenCtrlClicked.call(this, _this)
			})

			_this.$closeCtrl.on(Events.Click.Layer, function(){
				_this.onCloseCtrlClicked.call(_this)
			})

		},
		onOpenCtrlClicked: function(obj){
			if($(this).toggleClass(obj.params.toggleClass).hasClass(obj.params.toggleClass)) {
				obj.$view.slideDown(350)
			} else {
				obj.$view.slideUp(350)
			}
		},
		onCloseCtrlClicked: function(){
			this.$wrapper.slideUp(350);
		}

	}
}

var GNB = function(){

	return {
		init: function(){
			this.params = {
				wrapperClass: '.header',
				menuOpenClass: '.menuOpen',
				boxOpenClass: '.myboxOpen',
				menuClass: '.soluton',
				boxClass: '.box',
				activeClass: 'on',
				viewClass: '.wrap',
				dimClass: '.gDim'	
			}

			this.$wrapper = UI.$body.find(this.params.wrapperClass);
			this.$menuOpenCtrl = this.$wrapper.find(this.params.menuOpenClass);
			this.$boxOpenCtrl = this.$wrapper.find(this.params.boxOpenClass);
			this.$menu = UI.$body.find(this.params.menuClass);
			this.$box = UI.$body.find(this.params.boxClass);
			this.$dim = UI.$body.find(this.params.dimClass)
			this.addEvent();
		},
		addEvent: function(){
			var _this = this;
			_this.$menuOpenCtrl.on(Events.Click.GNB, function(){
				_this.onMenuOpenClicked.call(_this);
			})
			_this.$boxOpenCtrl.on(Events.Click.GNB, function(){
				_this.onBoxOpenClicked.call(_this);
			})
			_this.$dim.on(Events.Click.GNB, function(){
				_this.onDimClicked.call(_this);
			})
		},
		onMenuOpenClicked: function(){
			var _this = this;
			_this.$box.hide().removeClass(_this.params.activeClass).find(_this.params.viewClass).slideUp(350);
			_this.$menu.show().addClass(_this.params.activeClass).find(_this.params.viewClass).slideDown(350);
		},
		onBoxOpenClicked: function(){
			var _this = this;
			_this.$menu.hide().removeClass(_this.params.activeClass).find(_this.params.viewClass).slideUp(350);
			_this.$box.show().addClass(_this.params.activeClass).find(_this.params.viewClass).slideDown(350);
		},
		onDimClicked: function(){
			var _this = this;
			_this.$menu.removeClass(_this.params.activeClass).find(_this.params.viewClass).slideUp(350, function(){
				_this.$menu.hide()
			});
			_this.$box.removeClass(_this.params.activeClass).find(_this.params.viewClass).slideUp(350, function(){
				_this.$box.hide();
			});
		}
	}
}

var CustomSwiper = function(){
	var options = {
		speed: 1000,
		slidesPerView: 'auto',
		parallax: true,
		effect: 'fade',
		autoplay: {
			delay: 5000
		},
		fadeEffect: {
			crossFade: true,
		}
	}

	return new Swiper('.swiper-container', options);

}

var initAnimation = function(){
	return {
		init: function(){
			var _this = this;
			_this.params = {
				wrapperClass: '.question',
				ctrlClass: '[class^="question0"]',
				activeClass: 'on',
				txtElem: 'span',
			}

			_this.$wrapper = UI.$body.find(_this.params.wrapperClass);
			_this.$ctrl = _this.$wrapper.find(_this.params.ctrlClass);
		
			TweenMax.delayedCall(.5, function(){
				_this.$ctrl.eq(0).addClass(_this.params.activeClass)
				_this.$ctrl.not(_this.$ctrl.eq(0)).each(function(idx){
					var $this = $(this);
					TweenMax.delayedCall(.25 * (idx + 1), function(){
						$this.addClass(_this.params.activeClass)
					})
				})
			})
		
			TweenMax.delayedCall(.55, function(){
				_this.$ctrl.find(_this.params.txtElem).each(function(idx){
					var $this = $(this);
					TweenMax.to($this, .35, {x:0, delay:.1 * idx, ease:Power1.easeOut})
				})
			})

		},
	}
}


var UI = (function(){
	return {
		init: function(){
			UI.hashMap['Tab'] = this.$body.find(".initTab").length && new Tab(); this.find('Tab').init();
			UI.hashMap['Layer'] = this.$body.find(".sideWrap").length && new Layer(); this.find('Layer').init();
			UI.hashMap['GNB'] = this.$body.find(".header").length && new GNB(); this.find('GNB').init();
			UI.hashMap['C_Swiper'] = this.$body.find('.swiper-container').length && new CustomSwiper();
			UI.hashMap['Animation'] = this.$body.find(".question").length && new initAnimation(); this.find('Animation').init();
		},
		find: function(Class){
			return this.hashMap[Class]
		}
	}
})()

$(function(){

	UI.$body = $("body");
	UI.hashMap = {};

	UI.init();
})