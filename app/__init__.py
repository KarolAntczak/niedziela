import locale

from flask import Flask
from flask_bootstrap import Bootstrap

locale.setlocale(locale.LC_TIME, "pl")
app = Flask(__name__)
Bootstrap(app)

from app import routes