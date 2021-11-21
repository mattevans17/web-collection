import os
from flask import Flask, request, jsonify, send_from_directory, make_response, redirect, abort
import logging
from bson.json_util import dumps
import server.DataAPI.database_requests as data_api


app = Flask(__name__, static_folder='client/build/static', template_folder='client/build')
# app.config['SECRET_KEY'] = 'secret'
log = logging.getLogger('werkzeug')
# log.setLevel(logging.ERROR)


@app.route('/register', methods=['POST'])
def register():
    if not data_api.check_login_available(request.json['login']):
        return jsonify({
            'status': 'failure',
            'message': 'login unavailable'
        })
    account_id = data_api.register(request.json['login'], request.json['password'])
    session_id = data_api.authorization(account_id)
    res = make_response(jsonify({'status': 'success'}))
    res.set_cookie('session_id', session_id)
    return res


@app.route('/login', methods=['POST'])
def login():
    auth_result = data_api.authentication(request.json['login'], request.json['password'])
    if auth_result['status'] == 'success':
        session_id = data_api.authorization(auth_result['account_id'])
        res = make_response(jsonify({'status': 'success'}))
        res.set_cookie('session_id', session_id)
        return res
    else:
        return make_response(jsonify(auth_result))


@app.route('/getCollections', methods=['GET'])
def get_collections():
    session_id = request.cookies.get('session_id')
    account_id = data_api.account_id_by_session(session_id)
    if not account_id:
        return abort(401)
    return dumps(list(data_api.get_collections(account_id)))


@app.route('/addBookmark', methods=['POST'])
def add_bookmark():
    session_id = request.cookies.get('session_id')
    account_id = data_api.account_id_by_session(session_id)
    if not account_id:
        return abort(401)
    data_api.add_bookmark(request.json['bookmark'], account_id, request.json['collectionKey'])
    return jsonify('')


@app.route('/deleteBookmarks', methods=['POST'])
def delete_bookmarks():
    session_id = request.cookies.get('session_id')
    account_id = data_api.account_id_by_session(session_id)
    if not account_id:
        return abort(401)
    data_api.delete_bookmarks(request.json['bookmarksIds'], account_id, request.json['collectionKey'])
    return jsonify('')


@app.route('/deleteBookmarksFromAllCollections', methods=['POST'])
def delete_bookmarks_from_all_collections():
    session_id = request.cookies.get('session_id')
    account_id = data_api.account_id_by_session(session_id)
    if not account_id:
        return abort(401)
    data_api.delete_bookmarks(request.json['bookmarksIds'], account_id)
    return jsonify('')


@app.route('/moveBookmarks', methods=['POST'])
def move_bookmarks():
    session_id = request.cookies.get('session_id')
    account_id = data_api.account_id_by_session(session_id)
    if not account_id:
        return abort(401)
    data_api.move_bookmarks(
        request.json['bookmarksIds'], account_id,
        request.json['fromCollection'], request.json['toCollection']
    )
    return jsonify('')


@app.route('/addCollection', methods=['POST'])
def add_collection():
    session_id = request.cookies.get('session_id')
    account_id = data_api.account_id_by_session(session_id)
    if not account_id:
        return abort(401)
    data_api.add_collection(account_id, request.json)
    return jsonify('')


@app.route('/', defaults={'path': ''}, methods=['GET', 'POST'])
@app.route('/<path:path>')
def home(path):
    if request.method == 'GET':
        path_react_build = os.path.abspath("client/build")
        return send_from_directory(os.path.join(path_react_build), 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
