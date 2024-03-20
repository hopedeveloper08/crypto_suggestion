from flask import Flask
from flask_cors import CORS
from models.currency import fetch_currency_data, create_dataframe, CURRENCIES_SUPPORTED
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
    }


if __name__ == '__main__':
    for curr in CURRENCIES_SUPPORTED:
        CURRENCY_DATA[curr] = create_dataframe(fetch_currency_data(curr))

    app.run(debug=True)
