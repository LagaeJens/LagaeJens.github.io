// ba99653571ea2c5b64fb3eabb3a367e0

document.addEventListener('DOMContentLoaded', function () {
    const dropdownCheckbox = document.getElementById('toggle');
    const dropdownMenu = document.querySelector('nav ul');
    const dropdownHeader = document.querySelector('nav h2');

    // Function to hide the dropdown
    function hideDropdown() {
        dropdownCheckbox.checked = false;
    }

    // Hide dropdown when clicked outside the dropdown or on the dropdown checkbox
    document.addEventListener('click', function (event) {
        if (!dropdownMenu.contains(event.target) && event.target !== dropdownCheckbox) {
            hideDropdown();
        }
    });

    // Stop click event propagation for the elements within the dropdown
    dropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Event listener for clicking on a topic link in the dropdown
    const navTopics = document.querySelectorAll('nav ul li a');

    navTopics.forEach(topic => {
        topic.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor link behavior
            hideDropdown(); // Close the dropdown when a topic is clicked
            const selectedCategory = topic.innerText.toLowerCase();
            displayNews(selectedCategory);
        });
    });

    // Event listener for clicking on the dropdown header to open/close the dropdown
    dropdownHeader.addEventListener('click', function () {
        dropdownCheckbox.checked = !dropdownCheckbox.checked;
    });

    async function fetchNews(category) {
        // The API key was removed for security purposes. Please add your GNews API key here.
        const apiKey = 'ba99653571ea2c5b64fb3eabb3a367e0';
        const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.articles;
        } catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    }

    async function displayNews(category) {
        const newsList = document.getElementById('newsList');
        const articles = await fetchNews(category);
        const newsHTML = articles.map(article => `
            <div class="article">
                <h2>${article.title}</h2>
                <img src="${article.image}" alt="${article.title}">
                <p>${article.description}</p>
                <a class="read-more" href="${article.url}" target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
        `).join('');

        newsList.innerHTML = newsHTML;
    }

    // Display news for the default selected category on page load
    const defaultCategory = 'general';
    displayNews(defaultCategory);
});
