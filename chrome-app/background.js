'use strict';


const markVacancy = (link, action) => {
  fetch('http://localhost:8082/mark', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ link, action }) })
    .then(res => res.json());
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: 'Send vacancy to hide',
    id: 'send_to_hide',
    contexts: ['page']
  });
  chrome.contextMenus.create({
    title: 'Send vacancy to favorite',
    id: 'send_to_favorite',
    contexts: ['page']
  });
});

chrome.contextMenus.onClicked.addListener(event => {
  if (event.menuItemId === 'send_to_hide') {
    markVacancy(event.pageUrl, 'hide');
  }
  if (event.menuItemId === 'send_to_favorite') {
    markVacancy(event.pageUrl, 'fav');
  }
});


chrome.action.onClicked.addListener(
  tab => {
    chrome.scripting.executeScript(
      { target: { tabId: tab.id }, files: ['content.js'] });
  }
);


chrome.runtime.onMessage.addListener((msg, sender) => {
  console.log(msg)
  fetch('http://localhost:8082/check', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(msg) })
      .then(res => res.json())
      .then(data => {
        chrome.tabs.sendMessage(sender.tab.id, data);
      });

  return Promise.resolve('Dummy response to keep the console quiet');
});
