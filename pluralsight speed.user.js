// ==UserScript==
// @name PluralSight Wider Speed Range
// @namespace https://nyx.nova.fail/
// @version 1.1
// @description Faster pluralsight video maximum speed
// @author Luna
// @match https://app.pluralsight.com/*
// @grant none
// @run-at document-start
// ==/UserScript==

;(function() {
    'use strict'

    if (!("onbeforescriptexecute" in document)) {
        console.error("Script won't work without support for beforescriptexecute event");
    }

    document.addEventListener('beforescriptexecute', function(e) {
        var src = e.target.src;
        if(src && src.length && /embeddable-player/.test(src)){
            console.info("Found embeddable player %o", src);

            e.preventDefault();
            e.stopPropagation();

            var xhr = new XMLHttpRequest();
            // yay synchronous :/
            xhr.open('GET', src, false);
            xhr.send('');
            var patched = xhr.responseText.replace(".5,.6,.7,.8,.9,1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2", "1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3,3.2,3.4,3.6,3.8,4");

            var se = document.createElement('script');
            se.type = "text/javascript";
            se.text = patched;
            document.head.appendChild(se);
        }
    });

    /* React approach:
    function updateProps(domElement, newProps) {
        var keys = Object.keys(domElement);
        var instanceKey = keys.filter(prop =>
                                      /__reactInternalInstance/.test(prop)
                                     )[0];
        var instance = domElement[instanceKey];

        for (var prop in newProps) {
            if (newProps.hasOwnProperty(prop)) {
                instance.return.stateNode.props[prop] = newProps[prop];
            }
        }
        instance.return.stateNode.updater.enqueueForceUpdate(
            instance.return.stateNode
        );
    }

    function reactInternalInstance(domElement) {
        var keys = Object.keys(domElement);
        var instanceKey = keys.filter(prop =>
                                      /__reactInternalInstance/.test(prop)
                                     )[0];
        return domElement[instanceKey];
    }

    function reactProps(domElement) {
        return reactInternalInstance(domElement).return.stateNode.props;
    }

    //reactProps($(".player-wrapper").firstChild).setPlaybackSpeed(3.5)*/
})()
