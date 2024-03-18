def middle(data):
    return (data.max() + data.min()) / 2


def tenkansen(df):
    data = df.iloc[-9:, 0]
    return middle(data)


def kijunsen(df):
    data = df.iloc[-26:, 0]
    return middle(data)


def chiku_span():
    pass


def senkou_A():
    pass


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
