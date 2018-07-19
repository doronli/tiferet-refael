'use strict';

var app = angular.module("contactUs",[]);

app.component("contactUs",{
    templateUrl:"component/contactUs/contactUs.html",
    controller: function ($scope, $http){
            //Contact us form
    $(document).on("click", '#contact-us-button', function () {
        //var error = ValidationContactForm();
       
          
            
            $.ajax({
                type: "POST",
                // url: "./contact_form.php",
                url: "component/contactUs/contact_form.php",
                data: $("#contact-form").serialize(),
                success: function (result) {
                    console.log("succes send msg");
                    // Un-comment below code to redirect user to thank you page.
                    //window.location.href="thank-you.html";

                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    });
                    $("#contact-form").html(result);
                    // $("#success-contact-form").fadeIn("slow");
                    // $('#success-contact-form').delay(4000).fadeOut("slow");
                }
            });
        
    });
       
    }
})