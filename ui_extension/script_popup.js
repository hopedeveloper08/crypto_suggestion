document.getElementById('search-input').addEventListener('focus', () => showSuggestions());
document.getElementById("search").addEventListener("click", () => getCurrencyStatus());


function showSuggestions() {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.style.display = 'block';

    fetch("http://localhost:5000/currencies_supported")
        .then(response => response.json())
        .then(data => {
            const currenciesSupported = data.data;
            currenciesSupported.forEach((suggestion) => {
                const suggestionElement = document.createElement('button');
                suggestionElement.className = 'list-group-item list-group-item-action';
                suggestionElement.style.backgroundColor = "rgb(48, 21, 103)";
                suggestionElement.style.opacity = "80%";
                suggestionElement.style.borderColor = "RGB(145, 13, 166)";
                suggestionElement.addEventListener('click', () => {
                    document.getElementById('search-input').value = suggestion;
                    suggestionsDiv.style.display = 'none';
                });

                fetch(`http://localhost:5000/get_currency_logo/${suggestion}`)
                .then(response => response.json())
                .then((data) => {
                    if ('logo' in data) {
                        const logoElement = document.createElement('img');
                        logoElement.src = data.logo;
                        logoElement.style.width = "32px";
                        logoElement.style.height = "32px";
                        suggestionElement.appendChild(logoElement);
                    }
                    const text = document.createElement('span');
                    text.textContent = suggestion;
                    text.className = "ms-4 text-light";
                    text.style.opacity = "100%";
                    suggestionElement.appendChild((text));
                    suggestionsDiv.appendChild(suggestionElement);
                })
                .catch(() => '');
            });
        })
        .catch((e) => {
            document.getElementById("error-text").textContent = `cannot connect to server!`;
            document.getElementById("error-box").style.display = 'block';
        });
}

function getCurrencyStatus() {
    const search_text = document.getElementById("search-input").value;
    if (!search_text) return;

    fetch(`http://localhost:5000/get_currency_status/${search_text}`)
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem("currency", search_text);
                window.location.href = 'suggest.html';
            }
            else if (response.status === 500)
                throw " data not exist"
        })
        .catch((e) => {
            document.getElementById("error-text").textContent = `${search_text} ${e}!`;
            document.getElementById("error-box").style.display = 'block';
        })
}
