import flask

def create_app():
    app = flask.Flask(__name__, static_url_path='/static')

    @app.route('/')
    def home():
        return flask.render_template('homepage.html')

    from algo_city.routes.sorting import sort

    app.register_blueprint(sort)

    return app