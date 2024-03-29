document.getElementById("home-btn").addEventListener("click", function() {window.location.href = 'popup.html';});
document.getElementById("currency-name").innerText = localStorage.getItem("currency");
const currency = localStorage.getItem("currency");

fetch(`http://localhost:5000/get_currency_logo/${currency}`)
    .then(response => response.json())
    .then((data) => {
        if ('logo' in data)
            document.getElementById("currency-logo").setAttribute("src", data.logo);
        })
    .catch(() => document.getElementById("currency-logo").style.display = "none");

fetch(`http://localhost:5000/draw_chart/${currency}`)
    .then(response => {
        if (response.status === 200) {
            document.getElementById("chart-img").setAttribute("src", "image/chart.png")
        }
    })
    .catch(e => console.log(e))

fetch(`http://localhost:5000/get_currency_status/${currency}`)
    .then(response => response.json())
    .then(data => {
        setResult(data);
        setMoreDetails(data);
    })
    .catch(e => console.log(e))


function setResult(data) {
    const result = document.getElementById("result")
    console.log(data.signal_buy)
    if (data.signal_buy)
        result.innerHTML = '<span class="badge text-bg-success"><strong>BUY</strong></span>';
    else if (data.signal_sell)
        result.innerHTML = '<span class="badge text-bg-danger"><strong>SELL</strong></span>';
    else
        result.innerHTML = '<span class="badge text-bg-warning"><strong>HOLD</strong></span>';
}

function setMoreDetails(data) {
    let result = 'steps:\n'
    for (let price of data.steps_to_buy)
        result += "‣ " + price + "\n";

    const more_details = document.getElementById("more-details");
    more_details.setAttribute("data-bs-title", `trend status: ${data.trend_status}`)
    more_details.setAttribute("data-bs-content", result);

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
}