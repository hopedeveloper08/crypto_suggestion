from flask import Flask
from flask_cors import CORS
from models.currency import fetch_currency_data, create_dataframe, CURRENCIES_SUPPORTED
from threading import Thread
from models.ichimoku import signal_buy, signal_sell, trend_status, steps_to_buy

CURRENCY_DATA = dict()


def load_data():
    for currency in CURRENCIES_SUPPORTED:
        data = fetch_currency_data(currency)
        df = create_dataframe(data)
        CURRENCY_DATA[currency] = df


Thread(target=load_data).start()

app = Flask(__name__)
CORS(app)


@app.route("/currencies_supported", methods=["GET"])
def currencies_supported():
    return {"data": CURRENCIES_SUPPORTED}


@app.route("/get_currency_status", methods=["GET"])
def get_currency_status(currency):
    data = CURRENCY_DATA[currency]
    return {
        "signal_buy": signal_buy(data),
        "signal_sell": signal_sell(data),
        "trend_status": trend_status(data),
        "steps_to_buy": steps_to_buy(data),
    }


if __name__ == '__main__':
    app.run(debug=True)
