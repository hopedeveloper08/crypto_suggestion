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

function get_currency_status() {
    const search_text = document.getElementById("search-input").value;
    if (!search_text) return;

    fetch(`http://localhost:5000/get_currency_status/${search_text}`)
        .then(response => response.json())
        .then(data => {
            status_handler(search_text, data);
            window.location.href = 'suggest.html';
        })
        .catch(e => alert(search_text + " Not found!"));
}

function status_handler(currency, data) {

}
