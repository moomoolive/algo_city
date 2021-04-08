import flask

sort = flask.Blueprint('sorting', __name__)

@sort.route('/sorting')
def merge_sort():
    return flask.render_template('sorting_algorithms.html')

@sort.route('/sortables/<image_name>')
def sortables(image_name):
    print(image_name)
    return flask.send_file(
        f"static/pictures/sortables/{image_name}.png", 
        mimetype='image/png'
    )