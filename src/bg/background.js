chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: `
      const newLocation = window.location.href.replace(window.location.protocol, 'https:')
      console.log(newLocation)
      window.location.href = newLocation
    `
  })
})

function updateExtensionIcon(win) {
  if (win.location.protocol === 'http:') {
    chrome.browserAction.setIcon({ path: '/icons/icon_off_128.png' })
  } else {
    chrome.browserAction.setIcon({ path: '/icons/icon_on_128.png' })
  }
}

function getWindow() {
  return window;
}
chrome.tabs.onActivated.addListener(function({ tabId, windowId }) {
  // chrome.tabs.executeScript({
  //   code: `
  //   window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
  //   `
  // })
})

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'updateIcon') {
    if (msg.value.protocol === 'http:') {
      chrome.browserAction.setIcon({ path: '/icons/icon_off_128.png' })
    } else {
      chrome.browserAction.setIcon({ path: '/icons/icon_on_128.png' })
    }
  }
})
