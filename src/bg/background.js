chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: `
      if(window.location.protocol === 'http:') {
        const newLocation = window.location.href.replace(window.location.protocol, 'https:')
        window.location.href = newLocation
      }
    `
  })
})

chrome.tabs.onActivated.addListener(function({ tabId, windowId }) {
  chrome.tabs.get(tabId, function(tab) {
    if (tab.url.indexOf('https:') === 0) {
      chrome.browserAction.setIcon({ path: '/icons/icon_on_128.png' })
    } else if (tab.url.indexOf('chrome:') === 0) {
      chrome.browserAction.setIcon({ path: '/icons/icon_disabled_128.png' })
    } else {
      chrome.browserAction.setIcon({ path: '/icons/icon_off_128.png' })
    }
  })
})

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'updateIcon') {
    if (msg.value.protocol === 'https:') {
      chrome.browserAction.setIcon({ path: '/icons/icon_on_128.png' })
    } else {
      chrome.browserAction.setIcon({ path: '/icons/icon_off_128.png' })
    }
  }
})
