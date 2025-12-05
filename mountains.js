// Mountain API - Fetch and display mountain data

const url = 'https://mountain-api1.p.rapidapi.com/api/mountains/';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '74881ff861msh2379f7a9e01ee99p18d18djsnb860a5373bdb',
        'x-rapidapi-host': 'mountain-api1.p.rapidapi.com'
    }
};

// Fetch mountains from API
async function fetchMountains() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('API Response:', result);
        displayMountains(result);
    } catch (error) {
        console.error('Error fetching mountains:', error);
        document.getElementById('featured-mountains').innerHTML = '<p>Unable to load mountains at this time.</p>';
    }
}

// Display mountains in the featured section
function displayMountains(mountains) {
    const container = document.getElementById('featured-mountains');
    container.innerHTML = ''; // Clear existing content

    // Display first 4 mountains in the array
    const featuredMountains = Array.isArray(mountains) ? mountains.slice(0, 4) : [];

    if (featuredMountains.length === 0) {
        container.innerHTML = '<p>No mountains available.</p>';
        return;
    }

    featuredMountains.forEach(mountain => {
        const mountainCard = document.createElement('div');
        mountainCard.className = 'mountain';
        mountainCard.style.cursor = 'pointer';

        const name = mountain.name || 'Unknown';
        const country = mountain.location || 'Unknown';
        const image = mountain.mountain_img || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(name);
        const flag = mountain.country_flag_img || 'https://via.placeholder.com/50x50?text=Flag';

        mountainCard.innerHTML = `
            <img src="${image}" alt="${name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(name)}'">
            <h4>${name}</h4>
            <div class="mountain-location">
                <img src="${flag}" alt="${country}" class="flag-img" onerror="this.src='https://via.placeholder.com/50x50?text=Flag'">
                <p>${country}</p>
            </div>
        `;

        // Add click event to open mountain modal
        mountainCard.addEventListener('click', () => {
            openMountainModal(mountain);
        });

        container.appendChild(mountainCard);
    });
}

// Display all mountains on mountains.html page
function displayAllMountains(mountains) {
    const container = document.getElementById('all-mountains');
    if (!container) return; // Only run if the element exists (on mountains.html)

    container.innerHTML = ''; // Clear existing content

    const allMountains = Array.isArray(mountains) ? mountains : [];

    if (allMountains.length === 0) {
        container.innerHTML = '<p>No mountains available.</p>';
        return;
    }

    allMountains.forEach(mountain => {
        const mountainCard = document.createElement('div');
        mountainCard.className = 'mountain';
        mountainCard.style.cursor = 'pointer';

        const name = mountain.name || 'Unknown';
        const country = mountain.location || 'Unknown';
        const image = mountain.mountain_img || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(name);
        const flag = mountain.country_flag_img || 'https://via.placeholder.com/50x50?text=Flag';

        mountainCard.innerHTML = `
            <img src="${image}" alt="${name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(name)}'">
            <h4>${name}</h4>
            <div class="mountain-location">
                <img src="${flag}" alt="${country}" class="flag-img" onerror="this.src='https://via.placeholder.com/50x50?text=Flag'">
                <p>${country}</p>
            </div>
        `;

        // Add click event to open mountain modal
        mountainCard.addEventListener('click', () => {
            openMountainModal(mountain);
        });

        container.appendChild(mountainCard);
    });
}

// Open window with mountain details
function openMountainModal(mountain) {
    const modal = document.getElementById('mountain-window');
    
    document.getElementById('modal-mountain-img').src = mountain.mountain_img || 'https://via.placeholder.com/400x300';
    document.getElementById('modal-mountain-name').textContent = mountain.name || 'Unknown';
    document.getElementById('modal-mountain-location').textContent = mountain.location || 'Unknown';
    document.getElementById('modal-flag-img').src = mountain.country_flag_img || 'https://via.placeholder.com/50x50?text=Flag';
    document.getElementById('modal-altitude').textContent = mountain.altitude || 'N/A';
    document.getElementById('modal-first-climber').textContent = mountain.first_climber || 'N/A';
    document.getElementById('modal-first-climbed-date').textContent = mountain.first_climbed_date || 'N/A';
    document.getElementById('modal-description').textContent = mountain.description || 'No description available.';
    
    modal.style.display = 'block';
    document.body.classList.add('mountain-window-open');
}

// Close mountain window function
function closeMountainModal() {
    const modal = document.getElementById('mountain-window');
    modal.style.display = 'none';
    document.body.classList.remove('mountain-window-open');
}


// Load mountains when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display mountains based on page
    async function initializeMountains() {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log('API Response:', result);
            
            // If we're on the featured mountains page (index.html)
            if (document.getElementById('featured-mountains')) {
                displayMountains(result);
            }
            
            // If we're on the all mountains page (mountains.html)
            if (document.getElementById('all-mountains')) {
                displayAllMountains(result);
            }
        } catch (error) {
            console.error('Error fetching mountains:', error);
            const featuredContainer = document.getElementById('featured-mountains');
            const allContainer = document.getElementById('all-mountains');
            if (featuredContainer) {
                featuredContainer.innerHTML = '<p>Unable to load mountains at this time.</p>';
            }
            if (allContainer) {
                allContainer.innerHTML = '<p>Unable to load mountains at this time.</p>';
            }
        }
    }
    
    initializeMountains();
    
    // Close modal when clicking the X button
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMountainModal);
    }
    
    // Close window when clicking outside of it
    const modal = document.getElementById('mountain-window');
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeMountainModal();
            }
        });
    }
});
