import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = 'peepo'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'tasks.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


key = Config.SECRET_KEY
