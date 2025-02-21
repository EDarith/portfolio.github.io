document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('main');
    const navLinks = document.querySelectorAll('.nav-link');
    
    async function loadPage(url) {
        try {
            // Convert relative URLs to absolute
            const absoluteUrl = new URL(url, window.location.origin).href;
            const response = await fetch(absoluteUrl);
            if (!response.ok) throw new Error('Page not found');
            const html = await response.text();
            
            // Extract the content between <main> tags
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('main');
            
            // Check if main content exists
            if (!newContent) {
                throw new Error('Could not find main content in the loaded page');
            }
            
            // Update the main content
            main.innerHTML = newContent.innerHTML;
            
            // Update URL without refresh
            history.pushState({ path: url }, '', url);
            
            // Update active state in navigation
            updateActiveNav(url);
            
            // Reinitialize any scripts that need to run on the new content
            if (window.initializePageScripts) {
                window.initializePageScripts();
            }
        } catch (error) {
            console.error('Error loading page:', error);
            main.innerHTML = `
                <div class="error-container">
                    <h1>Error Loading Page</h1>
                    <p>Sorry, we couldn't load the requested content.</p>
                    <p class="error-details">${error.message}</p>
                    <a href="/" class="home-link">Return to Home</a>
                </div>
            `;
        }
    }

    function updateActiveNav(url) {
        const currentPage = url.split('/').pop();
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.parentElement.classList.add('active');
            }
        });
    }

    // Handle navigation clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('.nav-link');
        if (link && !link.id.includes('darkModeToggle')) {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Skip if it's an external link
            if (href.startsWith('https') && !href.includes(window.location.hostname)) {
                window.open(href, '_blank');
                return;
            }
            
            loadPage(href);
        }
    });

    // Handle initial page load
    const initialPath = window.location.pathname;
    if (initialPath !== '/') {
        loadPage(initialPath);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.path) {
            loadPage(e.state.path);
        }
    });
});
