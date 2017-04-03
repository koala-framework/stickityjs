;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.YourModule = factory(root.jQuery);
    }
}(this, function ($) {
    var stickityContainer;
    var settings;

    //Set height for the parent of the fixed element
    var setHeightOfWrapper = function(elem) {
        elem.css('height', '');
        elem.css('height', $('#'+elem.data('child-id')).height());
        elem.css('display', 'block');
    };

    //Move the fixed elemement into the stickityContainer or back into the content
    var setStickyOrNot = function(elem) {
        var stickityContainerHeight = stickityContainer.height();
        var child = $('#'+elem.data('child-id'));

        if (elem.offset().top <= window.pageYOffset + stickityContainerHeight && !child.data('moved') && !elem.is(stickityContainer)) {
            child.data('moved', true);
            stickityContainer.append(child);
        }
        else if (elem.offset().top > window.pageYOffset + stickityContainerHeight - elem.height() && !elem.is(child.parent())) {
            child.data('moved', false);
            elem.append(child);
        }
    };

    var initialized = false;
    var initialize = function() {
        if (initialized) return;
        initialized = true;

        stickityContainer = $('<div class="'+settings.prefix+settings.stickityContainerIdentifier+'"' +
            ' style="position: fixed; width: 100%; display: inline-block; top: 0; ' +
            '-moz-transform: translateZ(0); -webkit-transform: translateZ(0); ' +
            '-ms-transform: translateZ(0); transform: translateZ(0);"></div>');

         $('body').append(stickityContainer);

        $(window).on('resize', function() {
            stickityElems.forEach(function(elem) {
                setHeightOfWrapper(elem);
                setStickyOrNot(elem);
            })
        });
        $(window).on('scroll', function() {
            stickityElems.forEach(function(elem) {
                setStickyOrNot(elem);
            });
        });
    };

    var stickityElems = [];
    $.fn.stickity = function(options) {
        settings = $.extend({
            prefix: '',
            stickityElementIdentifier: 'stickityElement',
            stickityContainerIdentifier: 'stickityContainer'
        }, options );

        initialize();
        //Wrap the content of every sticky element in an extra div
        return this.each(function (i, el) {
            var elem = $(this);
            elem.data('child-id', settings.prefix+settings.stickityElementIdentifier+'--'+i);
            elem.wrapInner('<div class="'+settings.prefix+settings.stickityElementIdentifier+'" id="'+settings.prefix+settings.stickityElementIdentifier+'--'+i+'"></div>');

            setHeightOfWrapper(elem);
            setStickyOrNot(elem);

            stickityElems.push(elem);
        });
    };
}));
