chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (img) {
    chrome.tabs.sendMessage(tab.id, { text: "blow_up", img: img });
  });
});
