'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.action.setBadgeText({text: '\'Allo'});


console.log('\'Allo \'Allo! Event Page for Browser Action');
