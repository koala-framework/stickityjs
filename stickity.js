(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var stickityContainer;

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

        if (elem.offset().top <= window.pageYOffset + stickityContainerHeight && !child.data('moved')) {
            child.data('moved', true);
            stickityContainer.append(child);
        }
        else if (elem.offset().top > window.pageYOffset + stickityContainerHeight - elem.height()) {
            child.data('moved', false);
            elem.append(child);
        }
    };

    var initialized = false;
    var initialize = function() {
        if (initialized) return;
        initialized = true;

        stickityContainer = $('<div style="position: fixed; width: 100%;' +
            'display: inline-block; top: 0; -moz-transform: translateZ(0); -webkit-transform: translateZ(0); ' +
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
    $.fn.stickity = function(selector) {
        initialize();

        //Wrap the content of every sticky element in an extra div
        return this.each(function (i, el) {
            var elem = $(this);
            elem.data('child-id', 'stickityElement--'+i);
            elem.wrapInner('<div class="stickityElement" id="stickityElement--'+i+'"></div>');

            setHeightOfWrapper(elem);
            setStickyOrNot(elem);

            stickityElems.push(elem);
        });
    };
}));
