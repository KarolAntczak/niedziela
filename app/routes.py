from flask import render_template

from app import app
from app.services import *


@app.route('/')
@app.route('/index')
def index():
    is_sunday = is_sunday_today()
    next_sunday = get_next_sunday()
    month = get_month_name(next_sunday)
    shopping = is_shopping_day(next_sunday)
    return render_template('index.html', next_sunday=next_sunday, month=month, shopping=shopping, is_sunday=is_sunday)


@app.route('/calendar')
def calendar():
    next_sunday = get_next_sunday()
    return render_template('calendar.html', next_sunday=next_sunday)