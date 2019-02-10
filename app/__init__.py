import locale

from flask import Flask
from flask_bootstrap import Bootstrap
from flask_pymongo import PyMongo

locale.setlocale(locale.LC_TIME, "pl")

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/niedziela"

Bootstrap(app)
mongo = PyMongo(app)

from app import routes