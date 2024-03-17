chrome.runtime.onStartup.addListener(function() {

  chrome.tabs.create({
    active: true,
    url:  'browserlock.html'
  }, null);

  setTimeout(() => {

    if(passwordTab == null) destruct();

  }, 10000);

})

chrome.runtime.onInstalled.addListener(function() {

  chrome.tabs.create({
    active: true,
    url:  'browserlock.html'
  }, null);

})


let passwordTab = null;
let oldURL = null;
let unlocked = false;

chrome.tabs.onCreated.addListener(function(tab){

  if(tab.pendingUrl.endsWith("browserlock.html")){

    passwordTab = tab.id;
    oldURL = tab.pendingUrl;

    let interval = setInterval(async () => {

      let tab = await chrome.tabs.get(passwordTab)
      let state = tab.title;

      if(state == "Success"){

        unlocked = true;
        clearInterval(interval);
        chrome.tabs.remove(passwordTab);

      }
      if(state == "Choose"){
        unlocked = true;
      }

      if(state == "Destruct" || tab.url != oldURL){

        destruct();

      }

    }, 100)

  }

})

chrome.tabs.onActivated.addListener(function(tab, windowId){

  if(passwordTab == null) return;

  if(tab.tabId != passwordTab && unlocked == false){

    destruct();

  }

})

chrome.tabs.onRemoved.addListener(function(tabid, removed) {

  if(tabid == passwordTab && unlocked == false){

    destruct();

  }

})

chrome.tabs.onUpdated.addListener(function(tabid, info){

  if(passwordTab == null) return;
  if(tabid != passwordTab && !unlocked) destruct();

})



function destruct(){

  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.remove(tabs[i].id);
    }
  });

}
