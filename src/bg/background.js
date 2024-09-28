chrome.action.onClicked.addListener((tab) => {
  if (tab.url.startsWith('http:')) {
    const newUrl = tab.url.replace('http:', 'https:');
    chrome.tabs.update(tab.id, { url: newUrl });
  }
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => {
    updateIcon(tab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateIcon(tab.url);
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'updateIcon') {
    updateIcon(msg.value);
  }
});

function updateIcon(url) {
  let iconPath;
  if (url.startsWith('https:')) {
    iconPath = '/icons/icon_on_128.png';
  } else if (url.startsWith('chrome:')) {
    iconPath = '/icons/icon_disabled_128.png';
  } else {
    iconPath = '/icons/icon_off_128.png';
  }
  chrome.action.setIcon({ path: iconPath });
}
