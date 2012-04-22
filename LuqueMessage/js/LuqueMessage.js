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
    $.fn.LuqueMessage = function(){
        console.log(this);
    }
    $.LuqueMessage = function(options){
        var default_options = {
            title: 'título',
            message: 'mensagem',
            actions: null,
            width: null,
            containerHeight: null,
            onClose: null
        };

        var options = $.fn.extend(default_options, options);
        
        _init();

        return this.each(function(){
            
        });

        function _init(){
            var $message = $('#LuqueMessage');
            if($message.size() == 0){
                _create();
                $message = $('#LuqueMessage');
            }

            if(typeof(options.actions) == 'object'){
                var tempObj = null;
                var $tempObj = null;
                var actions = [];
                for(key in options.actions){
                    tempObj = options.actions[key];
                    $tempObj = null;
                    if((tempObj.hasOwnProperty('id') ||
                        tempObj.hasOwnProperty('class')) &&
                        tempObj.hasOwnProperty('id')){

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
            //options.actions = null;
            _update($message);
            _show($message);

            $('#LuqueMask, #LuqueClose').click(function(){
                _close($message);
            });
        }

        function _create(){
            var $message = $('<div id="LuqueMessage"></div>');
                $message.append($('<div id="LuqueClose">x</div>'));
                $message.append($('<div id="LuqueTitle"></div>'));
                $message.append($('<div id="LuqueContainer"></div>'));
                $message.append($('<div id="LuqueActions"></div>'));
                $message.css('opacity', 0);
            $('body').append($message);
        }

        function _clean($message){

        }

        function _show($message){
            if($message.css('opacity') == 0){
                $('body').append($('<div id="LuqueMask"></div>'));
                var metrics = _calc($message);
                $message.css({
                    'top': metrics.top,
                    'opacity': 1,
                    'left': metrics.newLeft
                }).stop().animate({
                    top: metrics.newTop
                }, 500, 'easeInQuint');
            }
        }

        function _update($message){
            $message.find('#LuqueTitle').html(options.title).end()
                    .find('#LuqueContainer').html(options.message).end();
            for(key in options.actions){
                $message.find('#LuqueActions').append($(options.actions[key]));
            }
        }

        function _close($message){
            if(typeof(options.onClose) == 'function'){
                options.onClose.call();
            }
            $message.remove();
            $('#LuqueMask').remove();
        }

        function _calc($message){
            var height = $message.outerHeight();
            var windowHeight = $(window).innerHeight();
            var width = $message.outerWidth();
            var windowWidth = $(window).innerWidth();
            return {
                top: 0 - height - 20,
                newTop: (windowHeight / 2) - (height / 2),
                newLeft: (windowWidth / 2) - (width / 2),
            }
        }
    }

    $.LuqueMessage.close = function(){
        $.event.trigger('_close');
    }
})(jQuery);