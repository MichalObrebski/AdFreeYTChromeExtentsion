document.addEventListener('click', function(event) {
    const link = event.target.closest('a');

    if (link && link.href && link.href.includes('/watch?v=')) {
        event.preventDefault();
        try {
            const url = new URL(link.href);
            const videoId = url.searchParams.get('v');
            
            if (videoId) {
                if(window.confirm("Would you like to watch this shit add free?")){
                    window.open(`https://www.yout-ube.com/watch?v=${videoId}`, '_blank');
                    event.stopImmediatePropagation();
                }
            }
        } catch (error) {
            console.error("Hyperlink reading error:", error);
        }
    }
}, true);