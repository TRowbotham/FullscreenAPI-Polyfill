(function( window, undefined ) {
    'use strict';

    var prefixed = function ( prop, context ) {
        var prefixes = 'webkit moz ms'.split(' '),
            len = prefixes.length;

        prop = prop.charAt(0).toUpperCase() + prop.slice(1);

        for ( var i = 0; i < len; i++ ) {
            if ( prefixes[i] + prop in context ) {
                return prefixes[i];
            }
        };

        return false;
    },

    prefix = prefixed( 'exitFullscreen', document ) || prefixed( 'cancelFullScreen', document );

    if ( 'exitFullscreen' in document || !prefix ) {
        return;
    }

    Element.prototype.requestFullscreen = function( allowKeyboardInput ) {
        if ( (prefix + 'RequestFullscreen') in this ) {
            this[prefix + 'RequestFullscreen']( allowKeyboardInput );
        } else {
            this[prefix + 'RequestFullScreen']( allowKeyboardInput );
        }
    };

    document.exitFullscreen = document[prefix + 'ExitFullscreen'] || document[prefix + 'CancelFullScreen'];

    Object.defineProperties( document, {
        fullscreenEnabled: {
            get: function() {
                return !!document[prefix + 'FullScreenEnabled'] || !!document[prefix + 'FullScreenEnabled'];
            },
            enumerable: true
        },

        fullscreenElement: {
            get: function() {
                return document[prefix + 'FullscreenElement'] || document[prefix + 'FullScreenElement'] || document['webkitCurrentFullScreenElement'] || null;
            },
            enumerable: true
        }
    });

    function escToExit(e) {
        if ( e.keyCode === 27 ) {
            document.exitFullscreen();
            e.stopPropagation();
            e.preventDefault();
        }
    };

    document.addEventListener( prefix + 'fullscreenchange', function() {
        var e = document.createEvent( 'Event' );
        e.initEvent( 'fullscreenchange', true, false );
        document.dispatchEvent( e );

        if ( !!document.fullscreenElement ) {
            document.addEventListener('keydown', escToExit, false);
        } else {
            document.removeEventListener('keydown', escToExit, false);
        }
    });

    document.addEventListener( prefix + 'fullscreenerror', function() {
        var e = document.createEvent( 'Event' );
        e.initEvent( 'fullscreenerror', true, false );
        document.dispatchEvent( e );
    });

    if ( 'allowfullscreen' in HTMLIFrameElement.prototype ) {
        return;
    }

    Object.defineProperty( HTMLIFrameElement.prototype, 'allowfullscreen', {
        get: function() {
            return this.hasAttribute( 'allowfullscreen' ) || this.hasAttribute( prefix + 'allowfullscreen' );
        },

        set: function( bool ) {
            var afsPrefixed = prefix + 'AllowFullscreen';

            if ( bool ) {
                this.setAttribute( 'allowfullscreen', '' );
                this.setAttribute( afsPrefixed.toLowerCase(), '' );
            } else {
                this.removeAttribute( 'allowfullscreen' );
                this.removeAttribute( afsPrefixed.toLowerCase() );
            }
        },

        enumerable: true
    });

}( window ));