import flask

def create_app():
    app = flask.Flask(__name__, static_url_path='/static')

    @app.route('/')
    def home():
        return flask.send_from_directory('static', 'test.html')

    from algo_city.routes.sorting import sort

    app.register_blueprint(sort)

    return app