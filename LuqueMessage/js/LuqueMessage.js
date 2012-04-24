/*
 * LuqueMessage - jQuery Plugin
 * 
 *
 * LuQue :: http://www.luque.cc/
 * 
 * Copyright (c) 2012 Luís Henrique Faria
 * 
 * Version: 0.1 (19/02/2012)
 * Requires: jQuery (v1.7.1 tested);
 *
 */

(function($){
    $.LuqueMessage = function(options){
        var default_options = {
            title:           'LuqueMessage <no title>',
            message:         'LuqueMessage <no message>',
            actions:         null,
            width:           400,
            containerHeight: 35,
            onClose:         null,
            $message:        null,
            speed:           200,
        };

        var options = $.fn.extend(default_options, options);
        
        init();

        return {
            self: this,
            close: $.proxy(function(){
                close();
            }),
            update: $.proxy(function(newOptions){
                options = $.fn.extend(options, newOptions);
                update();
            })
        }

        function init(){
            if(options.$message == null){
                create();
            }

            update();
            show();

            $('#LuqueMask, .LuqueClose').live('click', function(){
                close();
            });
        }

        function create(){
            options.$message = $('<div id="LuqueMessage"></div>')
                .append($('<div id="LuqueClose" class="LuqueClose">x</div>'))
                .append($('<div id="LuqueTitle"></div>'))
                .append($('<div id="LuqueContainer"></div>'))
                .append($('<div id="LuqueActions"></div>'))
                .css({opacity: 0, top: -9999});

            $('body').append(options.$message);
        }

        function show(){
            if(parseInt(options.$message.css('top')) < 0){
                $('body').append($('<div id="LuqueMask"></div>'));
                var metrics = getMetrics();
                options.$message.css({
                    'top': metrics.top,
                    'left': metrics.newLeft,
                    'opacity': 0.4
                }).stop().animate({
                    top: metrics.newTop,
                    opacity: 1
                }, options.speed, 'easeInQuint');
            }
        }

        function update(){
            options.$message.find('#LuqueTitle').html(options.title.toString()).end()
                            .find('#LuqueContainer').html(options.message.toString()).end();


            //create te action buttons
            if(typeof(options.actions) == 'object'){
                options.$message.find('#LuqueActions').html('');

                var tempObj = null;
                var $tempObj = null;
                var actions = [];
                for(key in options.actions){
                    tempObj = options.actions[key];
                    $tempObj = null;
                    if((tempObj.hasOwnProperty('id') ||
                        tempObj.hasOwnProperty('class')) &&
                        tempObj.hasOwnProperty('text')){

                        $tempObj = $('<button />');
                        if(tempObj.hasOwnProperty('id')){
                            $tempObj.attr('id', tempObj.id.toString());
                        }
                        if(tempObj.hasOwnProperty('class')){
                            $tempObj.addClass(tempObj.class.toString());
                        }

                        $tempObj.text(tempObj.text.toString());

                        actions.push($tempObj);
                    }
                }
            }
            options.actions = actions;

            for(key in options.actions){
                options.$message.find('#LuqueActions').append($(options.actions[key]));
            }

            if(options.width != null){
                options.$message.css('width', options.width.toString());
            }

            if(options.containerHeight != null){
                options.$message.find('#LuqueContainer').css('height', options.containerHeight);
            }
        }

        function close(){
            if(typeof(options.onClose) == 'function'){
                options.onClose.call();
            }
            var metrics = getMetrics();
            options.$message.animate({
                top: metrics.top,
                opacity: 0
            }, options.speed, 'easeInQuint', function(){
                $("#LuqueMask").fadeOut(100, 'easeInQuint', function(){
                    $('#LuqueMask').remove();
                    options.$message.remove();
                });
            });
        }

        function getMetrics(){
            var height = options.$message.outerHeight();
            var windowHeight = $(window).innerHeight();
            var width = options.$message.outerWidth();
            var windowWidth = $(window).innerWidth();
            return {
                top: 0 - height - 20,
                newTop: (windowHeight / 2) - (height / 2),
                newLeft: (windowWidth / 2) - (width / 2),
            }
        }
    }
})(jQuery);