document.getElementById('search-input').addEventListener('focus', function() {showSuggestions();});
document.getElementById("search").addEventListener("click", function() {get_currency_status();});


function showSuggestions() {
    const suggestionsDiv = document.getElementById('suggestions');
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
                    document.getElementById('search-input').value = suggestion;
                    suggestionsDiv.style.display = 'none';
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
        })
        .catch(error => {
                console.error('Error fetching data:', error);
            });
    suggestionsDiv.style.display = 'block';
}

function get_currency_status() {
    const search_text = document.getElementById("search-input").value;
    if (!search_text) return;

    fetch(`http://localhost:5000/get_currency_status/${search_text}`)
        .then(response => {
            if (response.status === 200)
                window.location.href = 'suggest.html';
            else
                alert(search_text + " Not found!");
        })
}

export {logos};