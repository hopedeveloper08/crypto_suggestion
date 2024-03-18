import pandas as pd
import matplotlib.pyplot as plt
import requests
from datetime import datetime


CURRENCIES_SUPPORTED = [
    "bitcoin",
    'ethereum',
    'binancecoin'
    'solana',
    'ripple'
    'cardano',
    'tron'
    'dogecoin'
    'shiba'
    'polkadot'
]


def fetch_currency_data(currency='bitcoin'):
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
    else:
        raise Exception(f"Error fetching data from {currency}")


def create_dataframe(data):
    prices = data['prices'][:-1]
    df = pd.DataFrame(data=prices, columns=["date", 'price'])
    df['date'] = df['date'].map(
        lambda x: datetime.fromtimestamp(x / 1000).strftime('%Y-%m-%d')
    )
    df = df.set_index('date')
    return df


def draw_chart():
    pass
