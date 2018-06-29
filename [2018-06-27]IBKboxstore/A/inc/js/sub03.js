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

		this.$card01 = m4.$body.find(".card01");
		this.$card02 = m4.$body.find(".card02");
		this.$card03 = m4.$body.find(".card03");
		TweenMax.to(this.$card01, .5, { className: "+=active", delay: 0 });
		TweenMax.to(this.$card02, .5, { className: "+=active", delay: .5 });
		TweenMax.to(this.$card03, .5, { className: "+=active", delay: 1 });
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