// Content.js
chrome.storage.sync.get("selectedFont", (data) => {
  if (data.selectedFont) {
    document.body.style.fontFamily = data.selectedFont;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "changeFont") {
    const selectedFont = message.font;
    document.body.style.fontFamily = selectedFont;
    chrome.storage.sync.set({ selectedFont });
  } else if (message.action === "resetFont") {
    document.body.style.fontFamily = "";
    chrome.storage.sync.remove("selectedFont");
  }
});

// Change all links to something else

const links = document.getElementsByTagName("a");
for (let index = 0; index < links.length; index++) {
  links[index].href = "https://www.youtube.com/watch?v=zXt56MB-3vc&pp=ygUMcmVkIHJlZCB3aW5l"
}

// Change images to gifs

const images = document.getElementsByTagName("img");

for (let index = 0; index < images.length; index++) {
  const newImage = new Image();
  newImage.src = "https://media.tenor.com/6McNrWtRns4AAAAd/honeycardi-cardi-b.gif";
  images[index].parentNode.replaceChild(newImage, images[index]);
}

