/*
 * LuqueScrollingList - jQuery Plugin
 * 
 *
 * LuQue :: http://www.luque.cc/
 * 
 * Copyright (c) 2012 Luís Henrique Faria
 * 
 * Version: 0.1 (19/02/2012)
 * Requires: jQuery (v1.7.1 tested);
 *           jQuery MouseWhell (v3.0.6 tested);
 *
 */

(function($){
    $.fn.extend({
        scrollingList: function(options){
            var default_options = {
                elemento   : '#luque', //que irá girar
                elementos  : '.luque', //filhos do que gira
                interval   : 1500, //time to update
                speed      : 300,
                speed_last : 500
            }

            var options = $.fn.extend(default_options, options);
                options.elemento = $(this).find(options.elemento);
                options.elementos = $(this).find(options.elementos);

            var speed;
            var topAtual = 0;
            var elementoAtual = 0;
            var total = $(this).find(options.elementos).size();
            var rolar = true;

            activate();

            function update(down){
                if(rolar){
                    if(down == undefined) down = true;

                    if(elementoAtual == (total - 1) && down){
                        topAtual = 0;
                        elementoAtual = 0;
                        speed = options.speed_last;
                    } else {
                        if(down){
                            topAtual = topAtual - options.elementos.eq(elementoAtual).outerHeight(true);
                            elementoAtual++;
                        } else if(elementoAtual > 0) {
                            topAtual = topAtual + options.elementos.eq(elementoAtual - 1).outerHeight(true);
                            elementoAtual--;
                        } else{
                            return;
                        }
                        speed = options.speed;
                    }
                    //rolar = false;
                    options.elemento.stop(true, true).animate({'margin-top': topAtual}, {duration: speed});
                }
            }

            function activate(){
                interval = window.setInterval(function(){update();}, options.interval);
            }
            function deactivate(){
                clearInterval(interval);
            }


            $(this).mouseenter(function(){
                deactivate();
            }).mouseleave(function(){
                activate();
            }).mousewheel(function(event, direcao){
                activate();
                if(direcao == 1) update(false);
                else update(true);
                deactivate();
                return false;
            });
        }
    });
})(jQuery);