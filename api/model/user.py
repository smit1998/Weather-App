from sqlalchemy import Column, Integer, String, DateTime

from api.constants.user import MAX_EMAIL, MAX_PASSWORD, MAX_USERNAME
from . import db

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(MAX_USERNAME), unique=True)
    password = Column(String(MAX_PASSWORD))
    email = Column(String(MAX_EMAIL), unique=True, nullable=False)
    registered_on = Column(DateTime, nullable=False)
