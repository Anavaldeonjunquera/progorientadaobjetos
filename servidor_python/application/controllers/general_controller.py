from flask import json, Blueprint
from flask_cors import CORS

__author__ = 'Ana Maria Valdeon'

routes = Blueprint('general', __name__, url_prefix='/')

CORS(routes)    # enable CORS for the API blueprint


@routes.route('', methods=['GET'])
def entidades():
    return json.dumps([{"nombre": "creativeWork"},
                       {"nombre": "article"},
                       {"nombre": "book"}])
