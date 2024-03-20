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
