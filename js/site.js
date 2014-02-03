(function(){
  jQuery.fn.exists = function(){return this.length>0;}

  $(document).ready(function(){

    var alertTimeout;

    $('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e){
      if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel"){
        $("html,body").stop();
      }
    });

    function isSingleColumnView(){
      return $(window).width() <= 480;
    }

    function isTouch(){
      //return true;
      return Modernizr.touch;
    }

    function scrollTo(target, center){
      var pos = target.position().top;
      if(center){
        pos -= Math.max(0, ($(window).height() - target.outerHeight())/2);
      }
      $.scrollTo(pos, {
        duration: 2000,
        easing: "easeOutExpo",
        axis: "y"
      });    
    }


    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search.toLowerCase());
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


    function initSplashCentering(){
      var updatePos = function () {
        var el = $(".splash-wrap");
        var width = $(window).width();
        var height = $(window).height();
        var left = Math.max(0, (width / 2) - (el.width() / 2)) + "px";
        var top = Math.max(0, (height / 2) - (el.outerHeight() / 2)) + "px";
        //var position = isTouch()? "relative" : "fixed"
        var position = "relative";

        el.css("position",position).css("left", left).css("top", top);
        el.attr("data-top", top);
      }; 

      $(window).resize(updatePos);
      updatePos();
    }
    



    function initAnalytics(){
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-42462226-2', 'supambassador.us');
      ga('send', 'pageview');
    }

    function removeAlert(ingoreFade){
      if(alertTimeout != null){
        clearTimeout(alertTimeout);
      }

      if(ingoreFade){
        return $(".alert").remove();
      }

      $(".alert").fadeOut(function(){
        this.remove();
      })
    }


    function showAlert(message){
      var alert = $('<div class="alert alert-danger">' + message + '</div>').hide();
      removeAlert(true);
      alert.insertAfter(".beta button");
      alert.fadeIn();

      alertTimeout = setTimeout(function(){
        removeAlert();
      }, 5000);
    }


    function showSplash(){
      setTimeout(function(){
        var splash = $(".splash-wrap");
        splash.hide();
        splash.css("visibility", "visible");
        $(".splash-wrap").fadeIn();
      }, 400);
    }


    initSplashCentering();
    initAnalytics();
    showSplash();
  });
})();
