function navigateToHomePage() {
    window.location.href = 'popup.html';
}

function navigateToSuggestPage() {
    window.location.href = 'suggest.html';
}

const searchInput = document.getElementById('search-input');
const suggestionsDiv = document.getElementById('suggestions');

const suggestions = [
    'bitcoin',
    'ethereum',
    'binancecoin',
    'solana',
    'ripple',
    'cardano',
    'tron',
    'dogecoin',
    'shiba',
    'polkadot',
];

const logos = {
    bitcoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    ethereum: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    binancecoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    solana: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    ripple: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
    cardano: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
    tron: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png',
    dogecoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
    shiba: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
    polkadot: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png'
}

searchInput.addEventListener('focus', function() {
    showSuggestions();
});

function showSuggestions() {
        suggestionsDiv.innerHTML = '';
        suggestions.forEach(function(suggestion) {

            const suggestionElement = document.createElement('button');
            suggestionElement.className = 'list-group-item list-group-item-action';
            suggestionElement.style.backgroundColor = "rgb(48, 21, 103)";
            suggestionElement.style.opacity = "80%";
            suggestionElement.style.borderColor = "RGB(145, 13, 166)";
            suggestionElement.addEventListener('click', function() {
                searchInput.value = suggestion;
                hideSuggestions();
            });

            const logoElement = document.createElement('img');
            logoElement.src = logos[suggestion]
            logoElement.style.width = "32px";
            logoElement.style.height= "32px";
            suggestionElement.appendChild(logoElement)

            const text = document.createElement('span');
            text.textContent = suggestion;
            text.className = "ms-4 text-light";
            text.style.opacity = "100%";
            suggestionElement.appendChild(text)

            suggestionsDiv.appendChild(suggestionElement);
        });
        suggestionsDiv.style.display = 'block';
    }

function hideSuggestions() {
    suggestionsDiv.style.display = 'none';
}
