// ba99653571ea2c5b64fb3eabb3a367e0

document.addEventListener('DOMContentLoaded', function () {
    const TOTALY_NO_API_KEY = 'ba99653571ea2c5b64fb3eabb3a367e0'; // Replace with your GNews API key
    let category = 'general'; // Default category

    const url = () => `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${TOTALY_NO_API_KEY}`;

    const newsList = document.getElementById('newsList');

    function fetchNews() {
        fetch(url())
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function (data) {
                if (!data || !data.articles || data.articles.length === 0) {
                    throw new Error('Invalid or empty response data');
                }

                newsList.innerHTML = ''; // Clear previous articles

                const articles = data.articles;
                articles.forEach(article => {
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');

                    const articleLink = document.createElement('a');
                    articleLink.href = article.url;
                    articleLink.target = '_blank';
                    articleLink.style.textDecoration = 'none';

                    const title = document.createElement('h2');
                    title.textContent = article.title;

                    const description = document.createElement('p');
                    description.textContent = article.description;

                    const image = document.createElement('img');
                    image.src = article.image;
                    image.alt = article.title;

                    articleLink.appendChild(title);
                    articleDiv.appendChild(articleLink);
                    articleDiv.appendChild(description);
                    articleDiv.appendChild(image);

                    newsList.appendChild(articleDiv);
                });
            })
            .catch(function (error) {
                console.error('Error fetching news:', error);
            });
    }

    // Event listener for the dropdown menu
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.addEventListener('change', function () {
        category = categorySelect.value;
        fetchNews();
    });

    // Initial fetch of news
    fetchNews();
});
