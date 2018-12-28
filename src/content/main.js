console.log(111)

chrome.runtime.sendMessage({
  action: 'updateIcon',
  value: window.location
});

var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  console.log(event)
  if (event.source != window) {
    return;
  }
    

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);
