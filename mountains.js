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

    // Display first 4 mountains
    const featuredMountains = Array.isArray(mountains) ? mountains.slice(0, 4) : [];

    if (featuredMountains.length === 0) {
        container.innerHTML = '<p>No mountains available.</p>';
        return;
    }

    featuredMountains.forEach(mountain => {
        const mountainCard = document.createElement('div');
        mountainCard.className = 'mountain';

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

        container.appendChild(mountainCard);
    });
}


// Load mountains when DOM is ready
document.addEventListener('DOMContentLoaded', fetchMountains);
