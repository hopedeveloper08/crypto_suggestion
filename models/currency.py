import pandas as pd
import requests


CURRENCY_DATA = None


def get_currency_data(symbol='BTC', time_frame='D'):
    pass


def data_not_exist():
    if CURRENCY_DATA is None:
        return True

    return False


def draw_chart():
    pass
