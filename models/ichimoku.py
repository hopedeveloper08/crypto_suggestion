def middle(data):
    return (data.max() + data.min()) / 2


def tenkan_sen(df):
    data = df.iloc[-9:, 0]
    return middle(data)


def kijun_sen(df):
    data = df.iloc[-26:, 0]
    return middle(data)


def chiku_span(df):
    data = df.iloc[-1:, 0].values
    return data[0]


def senkou_A(df):
    data = df.iloc[:-25]
    return (tenkan_sen(data) + kijun_sen(data)) / 2


def senkou_B(df):
    data = df.iloc[-77:-25]
    return middle(data)


def is_buy():
    pass


def is_sell():
    pass


def trend_status(df):
    if tenkan_sen(df) > kijun_sen(df) > senkou_A(df) > senkou_B(df):
        return "strong buy"

    elif tenkan_sen(df) < kijun_sen(df) < senkou_A(df) < senkou_B(df):
        return "strong sell"

    elif chiku_span(df) > senkou_B(df) and chiku_span(df) > senkou_A(df):
        return "buy"

    elif chiku_span(df) < senkou_B(df) and chiku_span(df) < senkou_A(df):
        return "sell"

    elif senkou_A(df) <= chiku_span(df) <= senkou_B(df) or senkou_B(df) <= chiku_span(df) <= senkou_A(df):
        return "base"

    else:
        return "normal"


def next_step_to_buy():
    pass
