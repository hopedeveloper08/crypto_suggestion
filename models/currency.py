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
    'cardano',
    # 'ripple',
    # 'tron',
    # 'dogecoin',
    # 'shiba',
    # 'polkadot',
    # 'link',
    # 'litecoin',
    # 'cosmos',
    # 'filecoin',
    # 'fantom',
    # 'dydx',
    # 'decentraland',
]


CURRENCIES_LOGOS = {
    'bitcoin': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    'ethereum': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    'binancecoin': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    'solana': 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    'cardano': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
    # 'ripple': 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
    # 'tron': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png',
    # 'dogecoin': 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
    # 'shiba': 'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
    # 'polkadot': 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
    # 'link': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png',
    # 'litecoin': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png',
    # 'cosmos': 'https://s2.coinmarketcap.com/static/img/coins/64x64/3794.png',
    # 'filecoin': 'https://s2.coinmarketcap.com/static/img/coins/64x64/2280.png',
    # 'fantom': 'https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png',
    # 'dydx': 'https://s2.coinmarketcap.com/static/img/coins/64x64/28324.png',
    # 'decentraland': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1966.png'
}


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
    return plt
