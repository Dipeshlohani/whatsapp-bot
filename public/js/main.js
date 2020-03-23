
(function ($) {
    "use strict";


    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }
    
    

})(jQuery);

(function($) {
    "use strict";
  
    /*==================================================================
      [ Validate ]*/
    var input = $(".validate-input .input100");
  
    $(".validate-form").on("submit", function() {
      var check = true;
  
      for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
          showValidate(input[i]);
          check = false;
        }
      }
  
      return check;
    });
  
    $(".validate-form .input100").each(function() {
      $(this).focus(function() {
        hideValidate(this);
      });
    });
  
    function validate(input) {
      if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
        if (
          $(input)
            .val()
            .trim()
            .match(
              /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
            ) == null
        ) {
          return false;
        }
      } else {
        if (
          $(input)
            .val()
            .trim() == ""
        ) {
          return false;
        }
      }
    }
  
    function showValidate(input) {
      var thisAlert = $(input).parent();
  
      $(thisAlert).addClass("alert-validate");
    }
  
    function hideValidate(input) {
      var thisAlert = $(input).parent();
  
      $(thisAlert).removeClass("alert-validate");
    }
  
    /*==================================================================
      [ Show pass ]*/
    var showPass = 0;
    $(".btn-show-pass").on("click", function() {
      if (showPass == 0) {
        $(this)
          .next("input")
          .attr("type", "text");
        $(this)
          .find("i")
          .removeClass("fa-eye");
        $(this)
          .find("i")
          .addClass("fa-eye-slash");
        showPass = 1;
      } else {
        $(this)
          .next("input")
          .attr("type", "password");
        $(this)
          .find("i")
          .removeClass("fa-eye-slash");
        $(this)
          .find("i")
          .addClass("fa-eye");
        showPass = 0;
      }
    });
  })(jQuery);