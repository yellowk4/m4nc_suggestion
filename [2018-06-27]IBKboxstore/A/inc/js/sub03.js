var m4 = m4 || {};
m4.hasJqueryObject = function ($elem) { return $elem.length > 0; };

m4.loadAnimation = new function () {
	this.init = function () {
		this.$line1 = m4.$body.find(".sub03 .visual .txtBg");
		this.$txt = m4.$body.find(".txt");
		this.$btn = m4.$body.find(".btn");
		TweenMax.to(this.$line1, .5, { width: 52 + '%', delay: .5, ease: Power0.easeOut });
		TweenMax.to(this.$txt, .5, { opacity: 1, y: 0, delay: 1, ease: Power0.easeOut });
		TweenMax.to(this.$btn, .5, { opacity: 1, y: 0, delay: 1.5, ease: Power0.easeOut });

	};
};

// UI Init
var UI = new function () {
	this.init = function () {
		m4.loadAnimation.init();
		m4.scroll.init();
		TweenMax.delayedCall(1, function () {
			m4.slider.init();
		});
	};
};

$(function () {
	m4.$window = $(window);
	m4.$body = $("body");
	UI.init();
});