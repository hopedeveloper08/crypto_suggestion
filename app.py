from flask import Flask
from flask_cors import CORS
from models.currency import fetch_currency_data, create_dataframe, CURRENCIES_SUPPORTED, CURRENCIES_LOGOS
from models.ichimoku import signal_buy, signal_sell, trend_status, steps_to_buy


CURRENCY_DATA = dict()

app = Flask(__name__)
CORS(app)


@app.route("/currencies_supported", methods=["GET"])
def currencies_supported():
    return {"data": CURRENCIES_SUPPORTED}


@app.route("/get_currency_status/<currency>", methods=["GET"])
def get_currency_status(currency):
    data = CURRENCY_DATA[currency]
    return {
        "signal_buy": signal_buy(data),
        "signal_sell": signal_sell(data),
        "trend_status": trend_status(data),
        "steps_to_buy": steps_to_buy(data),
    }


@app.route("/get_currency_logo/<currency>", methods=["GET"])
def get_currency_logo(currency):
    logo = CURRENCIES_LOGOS[currency]
    if logo:
        return {"logo": logo}
    else:
        return {}


if __name__ == '__main__':
    for curr in CURRENCIES_SUPPORTED:
        CURRENCY_DATA[curr] = create_dataframe(fetch_currency_data(curr))

    app.run(debug=True)
