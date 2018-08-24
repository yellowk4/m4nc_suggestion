function hasJqueryObject($elem){return $elem.length > 0;};
var app = app || {};

app.initUtilList = function(){
    var utilClass = '.util',
        btnUtilOpenClass = '.btnUtilOpen';

    var $util = app.$body.find(utilClass),
        $utilList = app.$body.find('.utilList'),
        $btnUtilOpen = app.$body.find(btnUtilOpenClass);

    var all = [],
        isClicked = false;

    $util.each(function(){
        TweenMax.set($(this).find(".ico"), { scale: 0 });
        all.push({
            _this: $(this).find("a")
        })
    })

    all.reverse();

    $btnUtilOpen.on("click", function(e){
        if(isClicked) return;
        isClicked = true;

        

        if($(this).toggleClass("on").hasClass("on")) {
            TweenMax.set($utilList, { display: 'block' })
            TweenMax.set(app.$dim, {zIndex:6})
            
            TweenMax.to(app.$dim, .45, { opacity:1, delay:.1, ease:Linear.easeNone })
            
            $.each(all, function(key, value){
                TweenMax.set(value._this.parent("li"), { zIndex: 1 })
                TweenMax.to(value._this.find('.ico'), .3, { scale:1, opacity:1, delay: .05 * key, ease: Power4.easeOut})
                TweenMax.to(value._this.find('.txt'), .35, { opacity:1, delay: .05 * key, ease: Power4.easeOut })
            })
            TweenMax.delayedCall(all.length * .1, function(){
                isClicked = false;
            })
        } else {

            TweenMax.to(app.$dim, .45, { opacity:0, delay:.1, ease:Linear.easeNone, onComplete: function(){
                TweenMax.set(app.$dim, { zIndex: -1 })
            }})
            $.each(all, function(key, value){
                TweenMax.to(value._this.find('.ico'), .3, { scale:0, delay: .05 * key, ease: Power4.easeOut })
                TweenMax.to(value._this.find('.txt'), .35, { opacity:0, delay: .05 * key, ease: Power4.easeOut })
            })
            TweenMax.delayedCall(all.length * .1, function(){
                isClicked = false;
                $.each(all, function(key, value){
                    TweenMax.set(value._this.parent('li'), { zIndex: -1 })
                })
                TweenMax.set($utilList, { display:'none'})
            })
        }
    })
}

app.initMainBanner = function(){
    var bannerClass = '[class^="banner0"]',
        bannerTopButtonClass = '.bannerTop > button',
        bannerCloseButtonClass = '.btnBannerClose',
        boxClass = '.box',
        activeClass = 'active',
        onClass = 'on';

    var currentKey = 0;

    var $banner = app.$body.find(bannerClass),
        $box = app.$body.find(boxClass);

    var bg = ['#5878d5', '#27b2a5', '#da5792'];
    

    $banner.each(function(idx){
        var _$this = $(this);
        _$this.attr({'data-idx': idx}).find(bannerCloseButtonClass).attr({'data-owner-idx': idx})
    })

    var isAnimate = setInterval(function(){
        var nextKey = currentKey + 1;
        if(nextKey > $banner.length - 1 ) {
            nextKey = 0;
            TweenMax.to($box, .35, { y: '+=' + $box.outerHeight(true), opacity:0, ease:Linear.easeNone, onComplete: function(){
                TweenMax.set($box, { y: - $box.outerHeight(true) })
                handler(nextKey)
            }})
        } else {
            handler(nextKey)
        }
        
    }, 3000)

    var handler = function(nextKey){
        currentKey = nextKey;
        TweenMax.to($box, .7, { y: $banner.eq(nextKey)[0].offsetTop - 20, backgroundColor: bg[nextKey], opacity:1 })
        TweenMax.delayedCall(.1, function(){
            $banner.removeClass(onClass).eq(nextKey).addClass(onClass);
        })
    }

    $banner.on('click', bannerTopButtonClass, function(){
        var _$this = $(this);
        var _$banner = $(this).parents(bannerClass);
        
        clearInterval(isAnimate);
        currentKey = parseInt(_$banner.attr("data-idx"));
        _$banner.addClass([activeClass, onClass].join(' ')).siblings().removeClass([activeClass, onClass].join(' '));
        TweenMax.to(_$this, .35, { opacity:0, ease:Power1.easeOut})

        TweenMax.to(_$banner, .45, { y: -(_$banner.offset().top), ease:Power1.easeOut, onComplete: function(){
            TweenMax.to(_$banner.find(".bannerTop"), .35, { height: _$this.next().outerHeight(true), onComplete: function(){
                TweenMax.set(_$this, { display: 'none' })
            }})
            TweenMax.set(_$banner.find(".bannerCon"), { paddingTop: _$this.next().outerHeight(true)})
            TweenMax.to(_$this.next(), .35, { opacity:1, delay:.35, ease:Power1.easeOut})
        }});
        $('.swiper-wrapper').addClass(onClass);
    })

    $banner.on('click', bannerCloseButtonClass, function(){
        var ownerIdx = parseInt($(this).attr("data-owner-idx")),
            _$banner = $banner.filter("[data-idx="+ownerIdx+"]");
        TweenMax.to(_$banner, .45, { y: 0, ease:Power1.easeOut, onComplete: function(){
            
            TweenMax.to(_$banner.find(".innerWrap"), .35, { opacity:0 })
            TweenMax.to(_$banner.find(".bannerTop"), .35, { height: _$banner.find(bannerTopButtonClass).outerHeight(true), onComplete: function(){
                TweenMax.set(_$banner.find(bannerTopButtonClass), { display:'block'})
                TweenMax.to(_$banner.find(bannerTopButtonClass), .35, { opacity:1, ease: Linear.easeNone, onComplete: function(){
                    
                    isAnimate = setInterval(function(){
                        var nextKey = currentKey + 1;
                        if(nextKey > $banner.length - 1 ) {
                            nextKey = 0;
                            TweenMax.to($box, .35, { y: '+=' + $box.outerHeight(true), opacity:0, ease:Linear.easeNone, onComplete: function(){
                                TweenMax.set($box, { y: - $box.outerHeight(true) })
                                handler(nextKey)
                            }})
                        } else {
                            handler(nextKey)
                        }
                    }, 3000)
                    _$banner.find(".innerWrap .step").removeClass("on").eq(0).addClass("on");

                    app.CustomSelect.reset();
                }})
                _$banner.removeClass(activeClass);
                TweenMax.set($box, { y: _$banner[0].offsetTop - 20, backgroundColor: bg[ownerIdx]})
                $('.swiper-wrapper').removeClass(onClass);
            }})
            _$banner.find(".bannerCon").removeAttr("style").find(".bannerProductWrap").hide();
            
        }})
    })


}

app.initMainSwiper = function(){
    var headerMenuListClass = '.headerMenuList',
        headerMenuLineClass = '.headerMenuLine',
        onClass = 'on',
        targetElement = 'li';

    var $headerMenuList = app.$body.find(headerMenuListClass),
        $headerMenuLine = $headerMenuList.find(headerMenuLineClass);

    var swiperContainerClass = '.swiper-container-main';

    var options = {
        containerModifierClass: swiperContainerClass,
        slidesPerView: 'auto',
        on: {
            init: function(){
                $.each(this.slides, function(key, value){
                    TweenMax.set($(value), { left: $(value).outerWidth() * key})
                })
            },
            slideChangeTransitionStart: function(){
                var _this = this;
                
                $headerMenuList.find(targetElement).removeClass(onClass).eq(this.activeIndex).addClass(onClass).trigger('click', this.activeIndex);
        
                if( _this.realIndex === _this.slides.length - 1 ){
                    app.$container.css({backgroundColor: '#fff'})
                } else {
                    app.$container.removeAttr("style")
                }
            }
        }
    }

    var swiper = new Swiper(swiperContainerClass, options)

    $headerMenuList.on('click', targetElement, function(){
        var index = $(this).index(),
            offsetLeft = this.offsetLeft;
        TweenMax.to($headerMenuLine, .35, { x: offsetLeft, ease: Power1.easeOut })
        swiper.slideTo(index);
    })
}

app.initTemplateLayer = function(){
    var customSelectAll = [];

    var customSelectClass = '.customSelect',
        customSelectTitleClass = '.customeSelectTit',
        inpTxtClass = '.inpTxt',

        swiperContainerClass = '.swiper-container-layer';

    var getData = function(type){
        return {
            '월 납입액': {
                title: '월 납입금액',
                lists: ['10만원', '30만원', '50만원', '100만원', '200만원']
            },
            '관심사': {
                title: '관심사',
                lists: ['든든한 노후', '건강한 생활', '나의 가족', '즐거운 삶']
            },
            '성별': {
                title: '성별',
                lists: ['남자', '여자']
            }
        }[type]
    }

    var bottomLayerTemplate = $("#bottomLayerTemplate").html();

    app.CustomSelect = function(el, params){
        this.$el = $(el);
        this.selectCloseClass = '.btnLayerClose';
        this.defaultsText = params.defaultsText;
        this.selectType = params.selectType;
        this.data = getData(params.selectType);
        this.$targetNode = $("#templateLayerArea");
        this.targetNodeActiveClass = 'active';
        console.log(this.data)
    
    }

    app.CustomSelect.reset = function(){
        $.each(customSelectAll, function(key, value){
            var $el = value.$el.find(customSelectTitleClass);
            
            if(!!$el.attr('data-select-disabled')) {
                $el.text(value.defaultsText);
            } else {
                $el.removeClass("on").text(value.defaultsText);
            }
            
        })

        $(inpTxtClass).each(function(){
            var _$this = $(this);
            _$this.find("input[type='text']").val('');
        })
        
    }

    app.CustomSelect.prototype.init = function(){
        var _this = this;
        _this.addEvent();
    }

    app.CustomSelect.prototype.addEvent = function(){
        var _this = this;
        _this.$el.off().on('click', function(){
            var disabled = $(this).find(customSelectTitleClass).attr("data-select-disabled");
            if(!!disabled) return;

            _this.render.call(_this);
            TweenMax.set(app.$dim, { zIndex:8 })
            TweenMax.to(app.$dim, .45, { opacity:1, delay:.1, ease:Linear.easeNone })
        })

        _this.$targetNode.off().on('click', _this.selectCloseClass, function(){
            TweenMax.to(app.$dim, .45, { opacity:0, delay:.1, ease:Linear.easeNone, onComplete: function(){
                TweenMax.set(app.$dim, { zIndex: -1 })
            }})
            _this.$targetNode.removeClass(_this.targetNodeActiveClass);
            TweenMax.delayedCall(.5, function(){
                _this.$targetNode.empty();
            })

        })
    }

    app.CustomSelect.prototype.render = function(){
        var _this = this;
        _this.compiledTemplate = Template7.compile(bottomLayerTemplate);
        _this.$targetNode.empty().append(_this.compiledTemplate(_this.data)).removeClass(_this.targetNodeActiveClass).addClass(_this.targetNodeActiveClass);
        new Swiper(_this.$targetNode.find(swiperContainerClass), {
            direction: 'vertical',
            height: _this.$targetNode.find('.swiper-slide').outerHeight(true),
            on: {
                click: function(){
                    var text = $(this.clickedSlide).find('button').text(),
                        index = parseInt(_this.$el.attr("data-customSelect-index"));

                    _this.$el.find(customSelectTitleClass).addClass("on");    
                    customSelectAll[index].setText(text);
                    _this.$targetNode.find(_this.selectCloseClass).trigger('click')

                    var next = _this.$el.find(customSelectTitleClass).attr("data-next")
                    if(!!next) {
                        TweenMax.delayedCall(.5, function(){
                            _this.$el.parents(".step").removeClass("on").next().addClass("on");
                            _this.$el.parents("[class^='banner0']").find(".bannerProductWrap").show();
                        })
                        _this.$el.parents("[class^='banner0']").find(".bannerTop").removeAttr("style");
                        _this.$el.parents("[class^='banner0']").find(".innerWrap").css({position: 'relative'})
                        TweenMax.delayedCall(.5, function(){
                            _this.$el.parents("[class^='banner0']").find(".bannerCon").css({paddingTop:_this.$el.parents("[class^='banner0']").find(".bannerTop").outerHeight(true) })

                        })
                    }
                }
            }
        })
    }

    app.CustomSelect.prototype.setText = function(text){
        var _this = this;
        _this.$el.find(customSelectTitleClass).text(text);
    }

    $(customSelectClass).each(function(idx){
        $(this).attr("data-customSelect-index", idx);
        var cs = new app.CustomSelect(this, {
            defaultsText: $(this).find(customSelectTitleClass).attr("data-default-text"),
            selectType: $(this).find(customSelectTitleClass).attr("data-select-type"),
        })
        customSelectAll.push(cs);
        cs.init();
    })

}

app.initGNB = function(){
    var $gnb = app.$body.find("#gnb"),
        $btnAllMenu = app.$body.find(".btnAllMenu"),
        $btnAllMenuClose = app.$body.find(".btnAllMenuClose");

    $btnAllMenu.on('click', function(){
        TweenMax.set(app.$dim, {zIndex:6})
        TweenMax.to(app.$dim, .45, { opacity:1, delay:.1, ease:Linear.easeNone })

        TweenMax.to($gnb, .65, { x:0 + '%', opacity:1, ease:Power3.easeOut })
        
        app.$dim.on('touchmove', function(e){
            e.preventDefault();
        })
    
    })

    $btnAllMenuClose.on('click', function(){
        TweenMax.to(app.$dim, .45, { opacity:0, delay:.1, ease:Linear.easeNone, onComplete: function(){
            TweenMax.set(app.$dim, { zIndex: -1 })
        }})

        TweenMax.to($gnb, .65, { x: 100 + '%', opacity:0, ease:Power3.easeOut })
        app.$dim.off('touchmove')
    })
}

// app.initInpTxt = function(){
//     var $inpWrap = app.$body.find(".inpWrap"),
//         $keypad = app.$body.find(".imgKeypad");
    

//     $inpWrap.find('.inpTxt').on('focusin', function(){
//         TweenMax.to($keypad, .35, { y:0 + '%', ease:Power2.easeOut })
//         app.$body.find(".btnLayerClose").trigger('click');
//     })
//     $inpWrap.find(".inpTxt").on("focusout", function(){
//         TweenMax.to($keypad, .35, { y: 100 + '%', ease: Power2.easeOut })
//     })
    
//     $keypad.on('click', function(){
//         $inpWrap.find(".inpTxt > input[type='text']").val('840205');
//         $inpWrap.find(".inpTxt").trigger('focusout');
//         $inpWrap.find(".customeSelectTit").focus();
//     })
// }

app.initCalculatorResult = function(){
    var $viewWrap = app.$body.find(".viewWrap"),
        $btnDetailView = app.$body.find(".btnDetailView"),
        $toolTipBox = app.$body.find('.toolTipBoxTy02'),
        $btnToolTipBoxOpen = app.$body.find('.btnToolTipBoxOpen'),
        $btnToolTipBoxClose = app.$body.find('.btnToolTipBoxClose');

    $btnToolTipBoxOpen.on('click', function(){
        if($(this).toggleClass('on').hasClass('on')) {
            $toolTipBox.show();
        } else {
            $btnToolTipBoxClose.trigger('click')
        }
        
    })

    $btnToolTipBoxClose.on('click', function(){
        $toolTipBox.hide();
        $btnToolTipBoxOpen.removeClass('on');
    })



    $btnDetailView.on('click', function(){
        if($(this).toggleClass('on').hasClass('on')) {
            $viewWrap.find('.view').slideUp(350).last().slideDown(350)
        } else {
            $viewWrap.find('.view').slideUp(350).eq(0).slideDown(350)
        }
        
        // TweenMax.to($viewWrap, .35, { height: $viewWrap.find('.view').not('.on').outerHeight(true), onComplete: function(){
            
        // }})
        
    })
}


$(function(){
    app.$body = $("body");
    app.$dim = app.$body.find(".dim");
    app.$container = app.$body.find("#container");

    hasJqueryObject(app.$body.find(".utilList")) && app.initUtilList();
    hasJqueryObject(app.$body.find(".bannerListWrap")) && app.initMainBanner();
    hasJqueryObject(app.$body.find('.swiper-container-main')) && app.initMainSwiper();
    hasJqueryObject(app.$body.find("#templateLayerArea")) && app.initTemplateLayer();
    hasJqueryObject(app.$body.find("#gnb")) && app.initGNB();
    // hasJqueryObject(app.$body.find(".imgKeypad")) && app.initInpTxt();
    hasJqueryObject(app.$body.find('.viewWrap')) && app.initCalculatorResult();
})
