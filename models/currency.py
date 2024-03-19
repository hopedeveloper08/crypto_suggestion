import pandas as pd
import matplotlib.pyplot as plt
import requests
from datetime import datetime
import time


CURRENCIES_SUPPORTED = [
    'bitcoin',
    'ethereum',
    'binancecoin',
    'solana',
    'ripple',
    'cardano',
    'tron',
    'dogecoin',
    'shiba',
    'polkadot',
    'link',
    'litecoin',
    'cosmos',
    'filecoin',
    'fantom',
    'dydx',
    'decentraland',
]


def fetch_currency_data(currency='bitcoin'):
    while True:
        url = f"https://api.coingecko.com/api/v3/coins/{currency}/market_chart"
        params = {
            "vs_currency": "usd",
            "days": "80",
            "interval": "daily",
        }
        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            return data
        elif response.status_code == 429:
            print(f"fetching {currency}")
        else:
            print(f"Error fetching data from {currency}\n Status code: {response.status_code}")

        time.sleep(1)


def create_dataframe(data):
    prices = data['prices'][:-1]
    df = pd.DataFrame(data=prices, columns=["date", 'price'])
    df['date'] = df['date'].map(
        lambda x: datetime.fromtimestamp(x / 1000).strftime('%Y-%m-%d')
    )
    df = df.set_index('date')
    return df


def draw_chart(df, color='blue'):
    plt.figure(figsize=(20, 12))
    plt.style.use('ggplot')
    plt.plot(df.index, df['price'], color=color, linewidth=2,  markersize=5)

    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()
