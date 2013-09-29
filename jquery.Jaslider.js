/**
 **
 **  Plugin developed by Juan Andrés Carmena
 **  This plugin is an slider, too can be used like a images gallery.
 **  
 **  Version 1.0
 **
 **  You can ask me!  juan14nob@gmail.com
 **
 **/
(function( $ ) {
    
    var opt = {};
    var gallery_right = 0;
    var total;
    var round;
    
    var _thumbwidth;
    var tionRightThumb;
    
    var thumb_width;
    
    var pre;
    var f = 0;
    
    var methods = {
        init: function(options, rootElement) {
            opt = options;
            
            var widthTotal = (total * options.width);
            $("#gallery #images").children("ul").css({"width": widthTotal});
            
            $(rootElement).find("#images").css({ "width":opt.width ,"height":opt.height,"overflow":"hidden"});
                
            $(rootElement).append('<div id="rowl" class="row"></div>');
            $(rootElement).append('<div id="rowr" class="row"></div>');
            
        },
        
        toLeft: function(event) {
            event.preventDefault();
            
            gallery_right = gallery_right - opt.width;
            
            animating();
        },

        toRight: function(event) {
            event.preventDefault();
            
            gallery_right = gallery_right + opt.width;
            
            animating();
        },
 
        toThumbRight: function(event) {
            event.preventDefault();
            
            if (parseInt($("#thumbnails ul").css("right")) < ((thumb_width + 10)* total)) {
                f++;
                var move_r = "+="+tionRightThumb; 
                hideshow_thumbrows();
                    
                $("#thumbnails ul").animate({
                    "right": move_r
                },400,function() {
                    
                });
                    
            }
        },
        
        toThumbLeft: function(event) {
            event.preventDefault();
            
            f--;
            
            hideshow_thumbrows();
            
            if (parseInt($("#thumbnails ul").css("right")) > 0) {
            
                var move_r = "-="+tionRightThumb; 
                $("#thumbnails ul").animate({
                    "right": move_r
                },400,function() {
                    // Complete
                });
                
            }
        }
    };
    var animating = function() {
        
        var maxr = (opt.width * total) - opt.width;
        console.log(total);
        if (opt.infinite != true) {
        
            if (maxr == gallery_right) {
                hiderows("#rowr");
            }else{
                showrows("#rowr"); 
            }
            animategallery();    
            
        } else {
            
            if (maxr < gallery_right) {
                gallery_right = 0;
            }
            animategallery();
        }   
    }
    var hideshow_thumbrows = function() {
        if (f >= pre) {
            $("#thumb_rowr").addClass("hide");
        }else {
            $("#thumb_rowr").removeClass("hide");
            
        }
        
        if (f <= 0) {
            $("#thumb_rowl").addClass("hide");
        }else {
            $("#thumb_rowl").removeClass("hide");
            
        }
    }
    
    var hiderows = function(row) {
        $("#gallery "+row).hide();
    }
    
    var showrows = function(row) {
        $("#gallery "+row).show();
    }
    
    var animategallery = function() {
            
        if (gallery_right  == 0) {
            hiderows("#rowl");
        }else{
            showrows("#rowl");
        }
        
        
        $( "#gallery #images ul" ).animate({
            right: gallery_right
        
        }, opt.sliderTime, opt.easing, function() {
            // Animation complete.
        });
        
    }
    
    $.fn.extend ({
        
        JaGallery: function(options) {
            
            $(this).prepend('<div id="images"></div>');
                
            $(this).children("ul").appendTo("#images");
            total = $(this).children("#images").children().children().length;
            
            if (options.thumbs == true) {
                
                thumb_width = parseInt($("#thumbnails ul li").css("width"));
                
                var sum = (thumb_width + 10);
                _thumbwidth = (sum * total);
                
                $("#thumbnails ul").css({"width":_thumbwidth});
                
                round = (options.width / (thumb_width + 10));
                console.log("round "+round);
                pre = (total - parseInt(round));
                
                tionRightThumb = sum + "px";
                //$("#thumbnails ul li, #thumbnails ul li img").css({"width":thumb_width});
                
                $(this).append('<div class="rowthumb" id="thumb_rowl"></div>');   
                $(this).append('<div class="rowthumb" id="thumb_rowr"></div> ');
            
            
            }
            
            methods.init(options, this);
            
            // slide go to left.
            this.delegate("#rowl", "click", methods.toLeft);
            
            // slide go to right.
            this.delegate("#rowr", "click", methods.toRight);
            
            // slide when user was over on thumb row right.
            this.delegate("#thumb_rowr", "click", methods.toThumbRight);
            
            // slide when user was over on thumb row right.
            this.delegate("#thumb_rowl", "click", methods.toThumbLeft);    
            
            // slide animate when thumb is pressed.
            this.delegate("#thumbnails ul li", "click", function() {
                //var pos = $(this).data("thumb");
                var pos = ($(this).index() + 1);
                
                gallery_right = ((pos * opt.width) - opt.width);
                
                animating();
            });
            
        },
        
    });

})(jQuery);