from flask import Flask
from .controllers import creativeworks_controller, book_controller, article_controller, general_controller

__author__ = 'Ana Maria Valdeon'


def register_controllers_routes(app):
    app.register_blueprint(creativeworks_controller.routes)
    app.register_blueprint(book_controller.routes)
    app.register_blueprint(article_controller.routes)
    app.register_blueprint(general_controller.routes)


def create_app():
    app = Flask(__name__)
    register_controllers_routes(app)
    return app
