import flask

sort = flask.Blueprint('sorting', __name__)

@sort.route('/sorting')
def merge_sort():
    return flask.render_template('sorting_algorithms.html')