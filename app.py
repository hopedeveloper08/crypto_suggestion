from flask import Flask
from models.currency import fetch_currency_data, create_dataframe, CURRENCIES_SUPPORTED
from threading import Thread


CURRENCY_DATA = dict()


def load_data():
    for currency in CURRENCIES_SUPPORTED:
        data = fetch_currency_data(currency)
        df = create_dataframe(data)
        CURRENCY_DATA[currency] = df


Thread(target=load_data).start()
app = Flask(__name__)


if __name__ == '__main__':
    app.run(debug=True)
