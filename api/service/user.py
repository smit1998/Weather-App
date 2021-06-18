import re
import datetime
from typing import Tuple, Dict

from api.constants.user import MAX_EMAIL, MAX_PASSWORD, MAX_USERNAME, MIN_PASSWORD, MIN_USERNAME
from api.model import db
from api.model.user import User


def valid_username(username) -> bool:
    length = len(username)
    if length > MAX_USERNAME or length < MIN_USERNAME or ' ' in username:
        return False
    return True


def valid_email(email) -> bool:
    if len(email) > MAX_EMAIL or not re.fullmatch('[^@]+@[^@]+\.[^@]+', email):
        return False
    return True


def valid_password(password) -> bool:
    length = len(password)
    return length >= MIN_PASSWORD and length <= MAX_PASSWORD


def create_user(username: str, password: str, email: str) -> Tuple[bool, str]:
    if not valid_username(username):
        return False, 'Invalid username.'
    elif not valid_email(email):
        return False, 'Invalid email.'
    elif not valid_password(password):
        return False, 'Invalid password.'

    query_username = User.query.filter_by(username=username).first()
    query_email = User.query.filter_by(email=email).first()

    # TODO use a hashing algorithm for the password
    if not query_username and not query_email:
        new_user = User(
            username=username,
            password=password,
            email=email,
            registered_on=datetime.datetime.utcnow()
        )
        db.session.add(new_user)
        db.session.commit()
        return True, 'Registered successfully!'
    elif query_username and query_email:
        return False, 'A user with the same username and email exists.'
    elif query_username:
        return False, 'A user with the same username exists.'
    return False, 'A user with the same email exists.'


def find_user(id: int) -> Dict:
    user = User.query.filter_by(id=id).first()

    if not user:
        return {}

    return {
        'username': user.username,
        'email': user.email
    }
