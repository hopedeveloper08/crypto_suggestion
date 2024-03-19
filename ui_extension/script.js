function navigateToHomePage() {
    window.location.href = 'popup.html';
}

function navigateToSuggestPage() {
    window.location.href = 'suggest.html';
}

const searchInput = document.getElementById('search-input');
const suggestionsDiv = document.getElementById('suggestions');


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
    polkadot: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
    link: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png',
    litecoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png',
    cosmos: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png',
    filecoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2280.png',
    fantom: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png',
    dydx: 'https://s2.coinmarketcap.com/static/img/coins/64x64/28324.png',
    decentraland: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1966.png'
}

searchInput.addEventListener('focus', function() {
    showSuggestions();
});

function showSuggestions() {
    suggestionsDiv.innerHTML = '';

    fetch("http://localhost:5000/currencies_supported")
        .then(response => response.json())
        .then(data => {
            const currenciesSupported = data.data;

            currenciesSupported.forEach(function(suggestion) {
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
            });})
        .catch(error => {
                console.error('Error fetching data:', error);
                showSuggestions();
            });
    suggestionsDiv.style.display = 'block';
}

function hideSuggestions() {
    suggestionsDiv.style.display = 'none';
}
