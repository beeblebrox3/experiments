/*global $, columnsData*/
/*jslint browser:true,devel:true*/

$(function () {
    'use strict';

    function Columns($container) {
        var self = this;

        self.data = [];
        self.container = $container;
        self.elems = [];

        function buildItem(node, currentLevel) {
            var $item = '<li data-id="$id">$label</li>'.replace('$id', node.id).replace('$label', node.label);
            $item = $($item);

            if (node.hasOwnProperty('children')) {
                currentLevel += 1;
                $item.append(buildLevel(node.children, currentLevel, node.id));
            }

            return $item;
        }

        function buildLevel(items, level, rel) {
            var $level = '<ul class="columns-level" data-columnslevel="$level"></ul>'.replace('$level', level);
            $level = $($level);

            if (rel !== undefined) {
                $level.attr('data-rel', rel);
            } else {
                $level.addClass('active');
            }

            $.each(items, function (index, node) {
                $level.append(buildItem(node, level));
            });

            return $level;
        }

        this.render = function renderColumns() {
            var $mainLevel = buildLevel(self.data, 0);
            // self.container.append($('<div class="columns-slider"></div>').append($mainLevel));
            self.container.append($mainLevel);
        };

        this.loadData = function loadData(data) {
            self.data = data;
        };
    }

    // já feito
    $('body').on('click', '.columns-level li', function clickLI() {
        var $level, $this, $children, currentLevel;
        $this = $(this);

        if ($this.hasClass('active')) {
            return;
        }

        $level = $this.parents('ul:first');
        $children = $this.find('ul:first');
        currentLevel = parseInt($level.attr('data-columnslevel'), 10);

        $('.columns-level.active').each(function () {
            // se o nível for maior ou igual, recolher
            var $this, thisLevel, rel, $target;
            $this = $(this);
            thisLevel = parseInt($this.attr('data-columnslevel'), 10);

            if (thisLevel > currentLevel) {
                // recolher
                rel = $this.attr('data-rel');
                $target = $('[data-id="%"]'.replace('%', rel));

                $this.removeClass('active').find('.active').removeClass('active').end().appendTo($target);
            }
        });

        if ($children.size()) {
            $children.addClass('active').insertAfter($level);
        }
        $this.addClass('active').siblings().removeClass('active');
        $('.columns-container').animate({
            scrollLeft: 1000
        }, 100);
    });

    var myColumns = new Columns($('.columns-container'));
    myColumns.loadData(columnsData);
    myColumns.render();
});