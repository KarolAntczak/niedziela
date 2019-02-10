import locale
import os

from flask import Flask
from flask_bootstrap import Bootstrap
from flask_pymongo import PyMongo

locale.setlocale(locale.LC_TIME, "pl")

app = Flask(__name__)
app.config["MONGO_URI"] = os.environ.get("MONGO_URI", default=None)
Bootstrap(app)
mongo = PyMongo(app)

from app import routes