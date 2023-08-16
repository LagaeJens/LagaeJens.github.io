document.addEventListener('DOMContentLoaded', function () {
    const dropdownCheckbox = document.getElementById('toggle');
    const dropdownMenu = document.querySelector('nav ul');
    const dropdownHeader = document.querySelector('nav h2');
    const testnews = document.getElementById('Newstopic');

    displayNews(testnews.value);

    testnews.addEventListener('change', (event) => {
        console.log(event.target.value);
        const selectedCategory = event.target.value.toLowerCase();
        displayNews(selectedCategory);
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
        const newsHTML = articles.map((article, index) => `
        <a class="article o-section" href="${article.url}" target="_blank" rel="noopener noreferrer">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <img src="${article.image}" alt="${article.title}">
            <p class="c-like">
                <input class="o-hide-accessible c-like__input" type="checkbox" id="like${index}" />
                <label class="c-label c-like__label" for="like${index}">
                    <svg class="c-like__symbol" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                        viewBox="0 0 510 510" style="enable-background: new 0 0 510 510" xml:space="preserve">
                        <path
                            d="M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55 C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z" />
                    </svg>
                </label>
            </p>
        </a>
    `).join('');

        newsList.innerHTML = newsHTML;
    }
});
