(function(c){var j=function(){var n=c(window).width();if(n>960){c("#inside-header, #head-box").data("size","big");c(window).scroll(function(){if(c(document).scrollTop()>0){if(c("#inside-header, #head-box").data("size")=="big"){c("#inside-header, #head-box").data("size","small");c(".head-social-box").stop().fadeOut({},600);c("#inside-header, #head-box").stop().animate({height:"50px"},600);c("#inside-header .logo img").stop().animate({marginTop:"-8px",width:"100px"},600);c("#head-box .logo img").stop().animate({marginTop:"3px",width:"100px"},600);c("#inside-header .menu").stop().animate({top:"-25px"},600);c("#head-box .menu").stop().animate({top:"-15px"},600)}}else{if(c("#inside-header, #head-box").data("size")=="small"){c("#inside-header, #head-box").data("size","big");c(".head-social-box").stop().fadeIn({},600);c("#inside-header, #head-box").stop().animate({height:"100px"},600);c("#inside-header .logo img").stop().animate({marginTop:"0",width:"100%"},600);c("#head-box .logo img").stop().animate({marginTop:"0px",width:"100%"},600);c("#inside-header .menu").stop().animate({top:"0px"},600);c("#head-box .menu").stop().animate({top:"0px"},600)}}})}};var d=function(){c(".percentage").easyPieChart({animate:1000,barColor:"#f2836b",trackColor:"#F3F3F3",scaleColor:false,lineCap:"butt",lineWidth:25,size:165})};var a=function(){c(window).scroll(function(){if(c(this).scrollTop()>500){c(".scrollup").fadeIn()}else{c(".scrollup").fadeOut()}});c(".scrollup").click(function(){c("html, body").animate({scrollTop:0},600);return false})};var i=function(){c(".smooth").bind("click.smoothscroll",function(p){p.preventDefault();var o=this.hash,n=c(o);c("html, body").stop().animate({scrollTop:n.offset().top},1000,"swing")})};var f=function(){c("#wrapper").click(function(){c(".search-box input").animate({width:0},200,function(){c(".search-box input").css("display","none")})});c(".search").click(function(n){c(".search-box input").css("display","block").animate({width:150},200);c(".search-box input").focus();n.preventDefault();n.stopPropagation()})};var l=function(){c("#site-menu").superfish({delay:100,animation:{opacity:"show",height:"show"},speed:100,speedOut:50})};var e=function(){c(window).scroll(function(){c(".animated-area").each(function(){if(c(window).height()+c(window).scrollTop()-c(this).offset().top>0){c(this).trigger("animate-it")}})});c(".animated-area").on("animate-it",function(){var n=c(this);n.find(".animated").each(function(){c(this).css("-webkit-animation-duration","0.6s");c(this).css("-moz-animation-duration","0.6s");c(this).css("-ms-animation-duration","0.6s");c(this).css("animation-duration","0.6s");c(this).css("-webkit-animation-delay",c(this).attr("data-animation-delay"));c(this).css("-moz-animation-delay",c(this).attr("data-animation-delay"));c(this).css("-ms-animation-delay",c(this).attr("data-animation-delay"));c(this).css("animation-delay",c(this).attr("data-animation-delay"));c(this).addClass(c(this).attr("data-animation"))});n.find(".animated-skills").each(function(){c(this).css("width",c(this).attr("data-skills-width"))});d()})};var b=function(){c(".tabbed-area a").click(function(n){n.preventDefault();c(this).tab("show")});c(".panel-style1").click(function(){c(".panel-boxme").find(".panel-style1").removeClass("active");c(".panel-boxme").find(".plus-box").html("+");c(this).addClass("active");c(this).find(".plus-box").html("-")})};var g=function(){c("a[class^='prettyPhoto']").prettyPhoto({social_tools:false,deeplinking:false})};var h=function(){c(".parallax-area").parallax("50%",0.4)};var m=function(){var n=new GMaps({el:"#map",lat:40.783435,lng:-73.966249});n.addMarker({lat:40.784076,lng:-73.966332,title:"Marker with InfoWindow",infoWindow:{content:"<p>Central Park</p>"}})};var k=function(){c(function(){c("#ajax-contact-form").submit(function(n){n.preventDefault();jQuery.ajax({type:"POST",url:"mail.php",data:c("#ajax-contact-form").serialize(),error:function(){c(".contact-input-area").html("Bir hata algılandı.")},success:function(o){c(".contact-input-area").html(o)}})})})};c(document).ready(function(){c(".swtch-opener").click(function(n){if(c("#style-switcher").hasClass("swclose")){c("#style-switcher").removeClass("swclose");c("#style-switcher").addClass("swopen")}else{c("#style-switcher").removeClass("swopen");c("#style-switcher").addClass("swclose")}n.preventDefault()});if(c.cookie("css")){c('link[id="skin"]').attr("href",c.cookie("css"))}c(".ul-colors li").click(function(){color=(c(this).attr("id"));if(color=="color1"){c('link[id="skin"]').attr("href","css/color1.css");c.cookie("css","css/color1.css",{expires:1})}else{if(color=="color2"){c('link[id="skin"]').attr("href","css/color2.css");c.cookie("css","css/color2.css",{expires:1})}else{if(color=="color3"){c('link[id="skin"]').attr("href","css/color3.css");c.cookie("css","css/color3.css",{expires:1})}else{if(color=="color4"){c('link[id="skin"]').attr("href","css/color4.css");c.cookie("css","css/color4.css",{expires:1})}else{if(color=="color5"){c('link[id="skin"]').attr("href","css/color5.css");c.cookie("css","css/color5.css",{expires:1})}else{if(color=="color6"){c('link[id="skin"]').attr("href","css/color6.css");c.cookie("css","css/color6.css",{expires:1})}else{if(color=="color7"){c('link[id="skin"]').attr("href","css/color7.css");c.cookie("css","css/color7.css",{expires:1})}else{if(color=="color8"){c('link[id="skin"]').attr("href","css/color8.css");c.cookie("css","css/color8.css",{expires:1})}else{if(color=="color9"){c('link[id="skin"]').attr("href","css/color9.css");c.cookie("css","css/color9.css",{expires:1})}}}}}}}}}});c(".stylereset").click(function(n){c.cookie("css","",{expires:1});c('link[id="skin"]').attr("href","css/main.css");n.preventDefault()});j();a();i();f();l();e();b();g();h();m();k()})})(jQuery);$(window).load(function(){$(".bqarea").carouFredSel({responsive:true,auto:false,pagination:{container:"#cust-lists, #cust-lists2",event:"click",anchorBuilder:false}});$("#prtfl-list").carouFredSel({responsive:true,scroll:1,auto:true,items:{width:340,visible:{min:1,max:15}},prev:"#prev",next:"#next",swipe:{onTouch:true}});$("#about-carousel").carouFredSel({responsive:true,items:1,scroll:{fx:"crossfade"},auto:true,prev:".prev",next:".next",swipe:{onTouch:true},pagination:"#bullets"});var a=0;$("#carousel-style1").carouFredSel({responsive:true,items:1,scroll:{fx:"crossfade"},auto:true,pagination:{container:"#carousel-style1-thumb",anchorBuilder:function(b){a=a+0.3;var c=$("img",this).attr("src");return'<img class="animated" src="'+c+'" data-animation="fadeInUp" data-animation-delay="'+a+'s" />'}}});$(".bqarea-style2").carouFredSel({responsive:true,auto:true,scroll:{fx:"crossfade"}})});var navigation=responsiveNav("#responsive-menu",{animate:true,transition:400,label:"",insert:"after",customToggle:"",openPos:"relative",jsClass:"js",init:function(){},open:function(){},close:function(){}});var $container=$(".portfolio-box");var $filter=$(".portfolio-filters");$container.isotope({filter:"*",layoutMode:"sloppyMasonry",animationOptions:{duration:400}});$filter.find("a").click(function(){var a=$(this).attr("data-filter");$filter.find("a").removeClass("active");$(this).addClass("active");$container.isotope({filter:a,animationOptions:{animationDuration:400,queue:false}});return false});