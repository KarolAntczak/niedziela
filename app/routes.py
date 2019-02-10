import calendar
import datetime

from flask import render_template

from app import app


@app.route('/')
@app.route('/index')
def index():
    now = datetime.datetime.now()
    month = calendar.month_name[now.month]
    is_sunday = now.weekday() is 6
    shopping = False
    return render_template('index.html', now=now, month=month, shopping=shopping, is_sunday=is_sunday)