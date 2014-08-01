// ==UserScript==
// @name        Trello Title Markdown
// @description Adds various markdown like features - [links], **bold**, *italics* - to Trello card titles. Based on https://gist.github.com/gorbiz/6062481
// @namespace   https://trello.com
// @include     https://trello.com/b/*
// @grant       none
// ==/UserScript==
 
addLoadEvent(function(){   
    console.log('Rea');
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MutationObserver(function(mutation) {
        // Disable the observer as not to trigger it with our changes (and end up in infinite recursion)
        observer.disconnect();
        markdownContent(mutation[0].target);
        // Enable the observer again
        observeAll(observer);
    });

    // Add custom styles
    var sheet = (function() {
        var style = document.createElement('style');
        style.appendChild(document.createTextNode('')); // webkit
        document.head.appendChild(style);

        return style.sheet;
    })();

    // Make the links looks niceish
    addCSSRule(sheet, '.list-card-title-link', 'background: #34B27D; border-bottom: 1px solid #2d9b6d; position: absolute; bottom: 0; right: 0; width: 100%; font-size: 10px; text-decoration: none; color: #fff !important; box-sizing: border-box; padding: 1px 8px 2px 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;');
        addCSSRule(sheet, '.list-card-title-link:hover', 'background: #2d9b6d;');
        addCSSRule(sheet, '.list-card-title-link:last-child', 'border-radius: 0 0 3px 3px;');

    // Apply Markdown now; on page load
    var cards = document.getElementsByClassName('list-card-title');
    for (var i = 0; i < cards.length; i++) {
        markdownContent(cards[i]);
    }

    // Apply Markdown when card titles are changed
    observeAll(observer);
});

function markdownContent(element) {
    //Add link button, remove from title
    var url = element.innerHTML.match(/\[(.+?)\]/g);

    if (url) {
        for (var i = url.length - 1; i >= 0; i--) {
            var linkElm = document.createElement('a');
            var cleanUrl = url[i].replace(/\[|\]/g, '');

            linkElm.setAttribute('href', cleanUrl);
            linkElm.setAttribute('class', 'list-card-title-link');
            linkElm.setAttribute('style', 'bottom: '+ i * 22 +'px;');
            linkElm.innerHTML = cleanUrl;

            element.innerHTML = element.innerHTML.replace(/\[(.+?)\]/g, '');
            element.parentNode.appendChild(linkElm);
        }

        element.parentNode.setAttribute('style', 'padding-bottom: '+ url.length * 20 +'px;') ;
    }


    //Add bold/italics
    element.innerHTML = element.innerHTML
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

// Helpers
function addCSSRule(sheet, selector, rules, index) {
    sheet.insertRule ? sheet.insertRule(selector + "{" + rules + "}", index) : sheet.addRule(selector, rules, index);
}
 
function observeAll(observer) {
    var cards = document.getElementsByClassName('list-card-title');
    for (var i = 0; i < cards.length; i++) {
       observer.observe(cards[i], { childList: true });
    }
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}


