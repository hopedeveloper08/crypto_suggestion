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


def senkou_B():
    pass


def is_buy():
    pass


def is_sell():
    pass


def trend_status():
    pass


def next_step_to_buy():
    pass
