function hasJqueryObject($elem){ return $elem.length > 0; }
var app = app || {};

app.initAllMenu = function(){
    app.$gnb = app.$body.find(".gnb");
    app.$allMenu = app.$body.find(".allMenu");

    app.$gnb.on("click", "a", function(){
        if($(this).toggleClass("on").hasClass("on")) {
            app.$allMenu.slideDown(350);
            return false;
        } else {
            app.$allMenu.slideUp(350);
            return false;
        }
        
    })
}

app.initCustomSelect = function(){
    app.$selectWrapper = app.$body.find(".customSelect");
    app.$selectTxt = app.$selectWrapper.find(".selectTxt");
    app.$optionList = app.$selectWrapper.find(".optionList");
    app.$result = app.$body.find(".result");

    app.$selectTxt.on("click", function(){       
        $(this).toggleClass("on");
    })

    app.$optionList.find(".option").on("click", function(e){
        var ownerIdx =$(this).parents(".customSelect").attr("data-owner-idx"),
            nextIdx = $(this).parents(".customSelect").attr("data-next-idx");


        $(this).addClass("on").parent().siblings().find(".option").removeClass("on");
        $(this).parents(".optionList").prev().find("em").text($(this).text());
        $(this).parents(".optionList").prev().removeClass("on");
    
        if(ownerIdx && nextIdx) {
            var $target = app.$visualList.eq(ownerIdx).find("li[class^='step']");
            
            $target.removeClass("on").eq(nextIdx).addClass("on");
            if(parseInt(nextIdx) === $target.length - 1) {
                app.$result.show();
                TweenMax.to($("html, body"), .5, { scrollTop: $(".mainVisual").offset().top })
            }
        }
    })
}

app.initButtonBox = function(){
    app.$btnListWrap = app.$body.find(".btnListWrap");

    app.$btnListWrap.find(".hashTag").on("click", function(){
        var ownerIdx =$(this).parents(".btnListWrap").attr("data-owner-idx"),
            nextIdx = $(this).parents(".btnListWrap").attr("data-next-idx");

        if(ownerIdx && nextIdx) {
            var $target = app.$visualList.eq(ownerIdx).find("li[class^='step']");
            
            $target.removeClass("on").eq(nextIdx).addClass("on");
            // if(parseInt(nextIdx) === $target.length - 1) {
            //     app.$result.show();
            // }
        }

    })
}

app.initVisualMouseEnter = function(){
    app.$visualList.on("mouseenter", function(){
        clearInterval(app.timer);
        app.visualKey = $(this).index();
        app.$indicator.removeClass("on").eq(app.visualKey).addClass("on");
        $(this).removeClass("on").addClass("active").siblings().removeClass("on active");

        // $(this).siblings().each(function(){
        //     $(this).find("li[class^='step']").removeClass("on").eq(0).addClass("on");
        // })

        // $(".customSelect").not($(this).find(".customSelect")).each(function(){
        //     var defaultTxt = $(this).find(".selectTxt").attr("data-default-text");
        //     $(this).find(".selectTxt em").text(defaultTxt);
        //     $(this).find(".option").removeClass("on");
        // })
    })
}

app.initVisualListRolling = function(){
    app.visualKey = 0;
    app.$indicator = app.$mainVisual.find(".indicator");
   
    app.handleVisual = function(){
        var nextKey = app.visualKey + 1;
        if(nextKey > app.$visualList.length - 1) {
            nextKey = 0;
        }
        app.$visualList.removeClass("on").eq(nextKey).addClass("on")
        app.$indicator.removeClass("on").eq(nextKey).addClass("on")
        app.visualKey = nextKey;
    }

    app.timer = setInterval(app.handleVisual, 2000)

}

app.initResultClose = function(){
    app.$result = app.$body.find(".result");
    app.$btnClose = app.$result.find(".btnClose");

    app.$btnClose.on("click", function(){
        app.$visualList.removeClass("active").eq(app.visualKey).addClass("on");
        app.$visualList.each(function(){
            $(this).find("li[class^='step']").removeClass("on").eq(0).addClass("on");
        })

        app.$selectTxt.each(function(){
            var defaultTxt = $(this).attr("data-default-text");
            $(this).find("em").text(defaultTxt);
            $(this).next().find(".option").removeClass("on");
        })

        app.$result.hide();
        app.timer = setInterval(app.handleVisual, 3000);
        app.$indicator.removeClass("on").eq(app.visualKey).addClass("on");
    })
}

app.initMainTopBanner = function(){
    app.$mainBanner = app.$body.find(".banner");
    app.$btnPopClose = app.$mainBanner.find(".btnClose");
   
    app.$btnPopClose.on("click", function(){
        app.$mainBanner.slideUp(350);
    })
}


app.init = function(){
    hasJqueryObject(app.$body.find(".allMenu")) && app.initAllMenu();
    hasJqueryObject(app.$body.find(".customSelect")) && app.initCustomSelect();
    if(hasJqueryObject(app.$body.find(".mainVisual"))) {
        app.initVisualMouseEnter();
        app.initVisualListRolling();
    }
    hasJqueryObject(app.$body.find(".btnListWrap")) && app.initButtonBox();
    hasJqueryObject(app.$body.find(".result")) && app.initResultClose();
    hasJqueryObject(app.$body.find(".banner")) && app.initMainTopBanner();

}

$(function(){
    app.$body = $("body");
    app.$mainVisual = app.$body.find(".mainVisual");
    app.$visualListWrap = app.$mainVisual.find(".visualList");
    app.$visualList = app.$visualListWrap.find("> li");

    app.init();
})