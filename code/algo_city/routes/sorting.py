import flask

sort = flask.Blueprint('sorting', __name__)

@sort.route('/merge-sort')
def merge_sort():
    return "merge-sort"