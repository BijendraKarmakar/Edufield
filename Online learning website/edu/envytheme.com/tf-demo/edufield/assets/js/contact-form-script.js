/*==============================================================*/
// EduStudy Contact Form  JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Something went wrong please try again");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });


    function submitForm(){
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var message = $("#message").val();
        var firstName = name; 
        // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');


        $.ajax({
            type: "POST",
            url: "assets/php/form-process.php",
            data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
            success : function(text){
                if (text == "success"){
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false,text);
                }
            }
        });
    }

    function formSuccess(){
        $("#contactForm")[0].reset();
        submitMSG(true, "<strong>Thank you </strong>" + firstName + ", your message has been sent successfully!")
    }

    function formError(){
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h4 text-left tada animated text-success";
        } else {
            var msgClasses = "h4 text-left text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
}(jQuery)); // End of use strict