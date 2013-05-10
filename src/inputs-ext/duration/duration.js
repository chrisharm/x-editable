/**
Time Duration editable input.
Internally value stored as {duration: 1, units: "seconds"}

@class duration
@extends abstractinput
@final
@example
<a href="#" id="duration" data-type="duration" data-pk="1">awesome</a>
<script>
$(function(){
    $('#duration').editable({
        url: '/post',
        title: 'Enter the duration, and time units',
        value: {
            duration: 30, 
            units: "seconds" 
        }
    });
});
</script>
**/
(function ($) {
    "use strict";
    
    var Duration = function (options) {
        this.init('duration', options, Duration.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Duration, $.fn.editabletypes.abstractinput);

    $.extend(Duration.prototype, {
        /**
        Renders input from tpl

        @method render() 
        **/        
        render: function() {
           this.$input = this.$tpl.find(':input');
        },
        
        /**
        Default method to show value in element. Can be overwritten by display option.
        
        @method value2html(value, element) 
        **/
        value2html: function(value, element) {
            if(!value) {
                $(element).empty();
                return; 
            }
            var html = $('<div>').text(value.duration + ' ' + value.units).html();
            $(element).html(html); 
        },
        
        /**
        Gets value from element's html
        
        @method html2value(html) 
        **/        
        html2value: function(html) {        
          /*
            you may write parsing method to get value by element's html
            e.g. "30 seconds" => {duration: "30", units: "seconds"}
            but for complex structures it's not recommended.
            Better set value directly via javascript, e.g. 
            editable({
                value: {
                    duration: 30, 
                    units: "seconds" 
                }
            });
          */ 
          return null;  
        },
      
       /**
        Converts value to string. 
        It is used in internal comparing (not for sending to server).
        
        @method value2str(value)  
       **/
       value2str: function(value) {
           var str = '';
           if(value) {
               for(var k in value) {
                   str = str + k + ':' + value[k] + ';';  
               }
           }
           return str;
       }, 
       
       /*
        Converts string to value. Used for reading value from 'data-value' attribute.
        
        @method str2value(str)  
       */
       str2value: function(str) {
           /*
           this is mainly for parsing value defined in data-value attribute. 
           If you will always set value by javascript, no need to overwrite it
           */
           return str;
       },                
       
       /**
        Sets value of input.
        
        @method value2input(value) 
        @param {mixed} value
       **/         
       value2input: function(value) {
           if(!value) {
             return;
           }
           this.$input.filter('[name="duration"]').val(value.duration);
           this.$input.filter('[name="units"]').val(value.units);
       },       
       
       /**
        Returns value of input.
        
        @method input2value() 
       **/          
       input2value: function() { 
           return {
              duration: this.$input.filter('[name="duration"]').val(), 
              units: this.$input.filter('[name="units"]').val() 
           };
       },        
       
        /**
        Activates input: sets focus on the first field.
        
        @method activate() 
       **/        
       activate: function() {
            this.$input.filter('[name="duration"]').focus();
       },  
       
       /**
        Attaches handler to submit form in case of 'showbuttons=false' mode
        
        @method autosubmit() 
       **/       
       autosubmit: function() {
           this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
           });
       }       
    });

    Duration.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<div class="editable-duration"><label><span>Duration: </span><input type="text" name="duration" class="input-small"></label></div>'+
             '<div class="editable-duration"><select name="units" class="input-medium"><option value="seconds">seconds</option><option value="minutes">minutes</option><option value="hours">hours</option></select></div>',
             
        inputclass: ''
    });

    $.fn.editabletypes.duration = Duration;

}(window.jQuery));
