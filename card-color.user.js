// ==UserScript==
// @name        Trello Card Colors
// @namespace   https://trello.com
// @include     https://trello.com/b/*
// @grant       none
// ==/UserScript==
 


addLoadEvent(function(){  
    var trigger = document.createElement('a');
    var triggerText = document.createTextNode('Colorise Cards'); 
    trigger.appendChild(triggerText);
    trigger.setAttribute('href','#');
    trigger.classList.add('board-header-btn');
    trigger.setAttribute('style', 'padding-left: 8px; padding-right: 8px;');
    trigger.addEventListener('click', coloriseCards);

    var buttonContainer = document.querySelector('.board-header-btns.left');
    buttonContainer.appendChild(trigger);
});

function coloriseCards() {
    var cards = document.getElementsByClassName('list-card-title');
    for (var i = 0; i < cards.length; i++) {
        colorBackground(cards[i]);
    }
}

function colorBackground(element) {
    element.parentNode.parentNode.setAttribute('style', 'background-color: rgba('+intToRGB(hashCode(getImidiateText(element)))+',0.4);');
}


// Helpers
function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    return parseInt(("00" + ((i >> 16) & 0xFF).toString(16)).slice(-2), 16) + ',' +
           parseInt(("00" + ((i >> 8) & 0xFF).toString(16)).slice(-2), 16) + ',' +
           parseInt(("00" + (i & 0xFF).toString(16)).slice(-2), 16);
}

function getImidiateText(element) {
    var text = '';
    for (var i = 0; i < element.childNodes.length; ++i) {
      if (element.childNodes[i].nodeType === Node.TEXT_NODE)
        text += element.childNodes[i].textContent;
    }
    return text;
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

