
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: `
      const newLocation = window.location.href.replace(window.location.protocol, 'https:')
      console.log(newLocation)
      window.location.href = newLocation
    `
  });
});
