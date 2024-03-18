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


def fetch_currency_data(name='bitcoin'):
    url = f"https://api.coingecko.com/api/v3/coins/{name}/market_chart"
    params = {
        "vs_currency": "usd",
        "days": "60",
        "interval": "daily",
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        return data
    else:
        raise Exception(f"Error fetching data from {name}")


def draw_chart():
    pass
