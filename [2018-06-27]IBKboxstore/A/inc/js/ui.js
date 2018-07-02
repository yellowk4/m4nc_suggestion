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
			this.params = {
				wrapperClass: '.initTab',
				ctrlClass: '.tabCtrl',
				viewClass: '.tabView',
				activeClass: 'current',
			}

			this.$wrapper = UI.$body.find(this.params.wrapperClass);
			this.$ctrl = this.$wrapper.find(this.params.ctrlClass);
			this.$view = this.$wrapper.find(this.params.viewClass);
			this.addEvent();
		},
		addEvent: function(){
			var _this = this;
			this.$ctrl.on(Events.Click.Tab, function(){
				_this.onClicked.call(this, _this.params);
			})
		},
		onClicked: function(params){
			var idx = $(this).index();
			$(this).addClass(params.activeClass).siblings().removeClass(params.activeClass);
			$(params.viewClass).hide().eq(idx).show();
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


var UI = (function(){
	return {
		init: function(){
			UI.hashMap['Tab'] = this.$body.find(".initTab").length && new Tab(); this.find('Tab').init();
			UI.hashMap['Layer'] = this.$body.find(".sideWrap").length && new Layer(); this.find('Layer').init();
			UI.hashMap['GNB'] = this.$body.find(".header").length && new GNB(); this.find('GNB').init();
			UI.hashMap['C_Swiper'] = this.$body.find('.swiper-container').length && new CustomSwiper();
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