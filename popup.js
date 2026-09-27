const confirmCheckbox = document.getElementById("confirmRedirection");
const newTabCheckbox = document.getElementById("openInNewTab");

chrome.storage.sync.get(["confirmRedirection", "openInNewTab"], (result) => {
    if (result.confirmRedirection !== undefined) {
        confirmCheckbox.checked = result.confirmRedirection;
    }
    else {
        confirmCheckbox.checked = true;
        chrome.storage.sync.set({ confirmRedirection: true });
    }

    if (result.openInNewTab !== undefined) {
        newTabCheckbox.checked = result.openInNewTab;
    }
    else {
        newTabCheckbox.checked = true;
        chrome.storage.sync.set({ openInNewTab: true });
    }
});

confirmCheckbox.addEventListener("change", (event) => {
    chrome.storage.sync.set({ confirmRedirection: event.target.checked }, () => {
        console.log("Saved:", event.target.checked);
    });
});

newTabCheckbox.addEventListener("change", (event) => {
    chrome.storage.sync.set({ openInNewTab: event.target.checked }, () => {
        console.log("Saved:", event.target.checked);
    });
});