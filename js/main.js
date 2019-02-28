$(document).ready(function() {

    var postcodes = [
        {"s":1000,"e":2599,"st":"NSW"},
        {"s":2619,"e":2899,"st":"NSW"},
        {"s":2921,"e":2999,"st":"NSW"},
        {"s":0200,"e":0299,"st":"ACT"},
        {"s":2600,"e":2618,"st":"ACT"},
        {"s":2900,"e":2920,"st":"ACT"},
        {"s":3000,"e":3999,"st":"VIC"},
        {"s":8000,"e":8999,"st":"VIC"},
        {"s":4000,"e":4999,"st":"QLD"},
        {"s":9000,"e":9999,"st":"QLD"},
        {"s":5000,"e":5799,"st":"SA"},
        {"s":5800,"e":5999,"st":"SA"},
        {"s":6000,"e":6797,"st":"WA"},
        {"s":6800,"e":6999,"st":"WA"},
        {"s":7000,"e":7799,"st":"TAS"},
        {"s":7800,"e":7999,"st":"TAS"},
        {"s":0800,"e":0899,"st":"NT"},
        {"s":0900,"e":0999,"st":"NT"},
        {"s":4825,"e":4825,"st":"NT"},
        {"s":0872,"e":0872,"st":"SA"},
        {"s":2406,"e":2406,"st":"QLD"},
        {"s":2540,"e":2540,"st":"JVB"},
        {"s":2611,"e":2611,"st":"NSW"},
        {"s":2620,"e":2620,"st":"ACT"},
        {"s":3500,"e":3500,"st":"NSW"},
        {"s":3585,"e":3586,"st":"NSW"},
        {"s":3644,"e":3644,"st":"NSW"},
        {"s":3691,"e":3691,"st":"NSW"},
        {"s":3707,"e":3707,"st":"NSW"},
        {"s":4380,"e":4380,"st":"NSW"},
        {"s":4377,"e":4377,"st":"NSW"},
        {"s":2899,"e":2899,"st":"NSW"},
        {"s":6798,"e":6799,"st":"WA"},
        {"s":7151,"e":7151,"st":"TAS"}
    ];



    onRender();


    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input-swm').each(function() {
        $(this).on('blur', function() {
            if (validate(this) == false) {
                showValidate(this);
            } else {
                $(this).closest(".validate-input").addClass('true-validate');
            }
        })
    })

    $('.validate-input .pretty').each(function() {
        $(this).on('change', function() {
            if (validate(this) == false) {
                showValidate(this);
            } else {
                $(this).closest(".validate-input").addClass('true-validate');
            }
        })
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input-swm');

    $('.validate-form').on('submit', function() {
        alert("submitted");
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input-swm').each(function() {
        $(this).focus(function() {
            hideValidate(this);
            $(this).closest(".validate-input").removeClass('true-validate');
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'Email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if($(input).hasClass("pretty")){
                let inputs = $(input).closest(".select-group").find(".pretty");
                for (i = 0; i < inputs.length; i++) {
                    if($(inputs[i]).find("option.default").length > 0){
                        console.log("Not Valid");
                        return false;
                    }
                }
                console.log("Valid");
                return true;
            } else if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function onRender(){
        var selectedOption = 'year';
        var currentYear = (new Date()).getFullYear();
        var startYear = currentYear - 100;

        for (var i = currentYear; i >= startYear; i--) {
            $("#dob_year").append(new Option(i,i));
        }
        $('.pretty').prettyDropdown();
    }

    function showValidate(input) {
        var thisAlert = $(input).closest(".validate-input");
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).closest(".validate-input");
        $(thisAlert).removeClass('alert-validate');
    }

    $(document).on("click",".prettydropdown", function(e){
        let defaults = $(this).find(".default");
        if(defaults.length > 0){
            let defaultVal = $($(this).find(".default")[0]).html();
            $($(this).find("li:contains('" + defaultVal + "')")).remove();
            $(defaults).remove();
        }
    });
});
