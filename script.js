let requiresConfirmation = true;
let openInNewTab = true;

chrome.storage.sync.get(['confirmRedirection', 'openInNewTab'], (result) => {
    if (result.confirmRedirection !== undefined) {
        requiresConfirmation = result.confirmRedirection;
    }
    if (result.openInNewTab !== undefined) {
        openInNewTab = result.openInNewTab;
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync'){
        if(changes.confirmRedirection !== undefined) {
            requiresConfirmation = changes.confirmRedirection.newValue;
        }
        if(changes.openInNewTab !== undefined) {
            openInNewTab = changes.openInNewTab.newValue;
        }
    }
});

document.addEventListener('click', function(event) {
    const link = event.target.closest('a');

    if (link && link.href && link.href.includes('/watch?v=')) {
        try {
            const url = new URL(link.href);
            const videoId = url.searchParams.get('v');
            
            if (videoId) {
                if(!requiresConfirmation || confirm("Would you like to watch this shit ad-free?")){
                    window.open(`https://yout-ube.com/watch?v=${videoId}`, openInNewTab ? '_blank' : '_self');
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            }
        } catch (error) {
            console.error("Url reading error:", error);
        }
    }
}, true);