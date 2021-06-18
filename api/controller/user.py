from typing import Tuple, Dict, Any
from flask import Blueprint
from marshmallow import fields
from webargs.flaskparser import use_args

from api.controller import BASE_API_URL
from api.service.user import create_user, find_user

USER_BLUEPRINT = Blueprint('user', __name__, url_prefix=BASE_API_URL)

@USER_BLUEPRINT.route('/create-user', methods=['POST'])
@use_args({
    'username': fields.String(required=True),
    'password': fields.String(required=True),
    'email': fields.String(required=True),
})
def new_user(args: Dict[str, Any]) -> Tuple[Dict, int]:
    result = create_user(args['username'], args['password'], args['email'])

    if result[0]:
        return { 'message': result[1] }, 201

    if 'Invalid' in result[1]:
        return { 'message': result[1] }, 400
    return { 'message': result[1] }, 409


@USER_BLUEPRINT.route('/get-user/<int:id>', methods=['GET'])
def get_user(id: int) -> Tuple[Dict, int]:
    user_details = find_user(id)
    if user_details:
        return user_details, 200
    return { 'message': 'User not found.' }, 400
