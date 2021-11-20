import os
import uuid
from server.DataAPI.database_connection import collections, accounts
import server.DataAPI.security as security


def register(login, password):
    salt = os.urandom(32)
    password_hash = security.hash_password(password, salt)
    account_id = str(uuid.uuid4())
    accounts.insert({
        'account_id': account_id,
        'login': login,
        'password_hash': password_hash,
        'salt': salt,
        'sessions': []
    })
    return account_id


def authentication(login, password):
    record = accounts.find_one({'login': login})
    if record:
        password_hash = security.hash_password(password, record['salt'])
        if password_hash == record['password_hash']:
            return {
                'status': 'success',
                'account_id': record['account_id']
            }
    return {
        'status': 'failure',
    }


def authorization(account_id):
    session_id = str(uuid.uuid4())
    accounts.update_one(
        {'account_id': account_id},
        {'$push': {'sessions': session_id}},
    )
    return session_id


def sign_out(session_id):
    accounts.update_one(
        {'account_id': account_id_by_session(session_id)},
        {'$pull': {'sessions': session_id}},
    )


def account_id_by_session(session_id):
    if not session_id:
        return None
    result = accounts.find_one({'sessions': session_id})
    return result['account_id']


def get_collections(account_id):
    return collections.find({'account_id': account_id})


def add_bookmark(bookmark, account_id, collection_key):
    collections.update_one(
        {'key': collection_key, 'account_id': account_id},
        {'$push': {'bookmarks': {'$each': [bookmark], '$position': 0}}},
        upsert=True
    )


def delete_bookmarks(bookmarks_ids, account_id, collection_key=None):
    if collection_key:
        collections.update_one(
            {'key': collection_key, 'account_id': account_id},
            {'$pull': {'bookmarks': {'id': {'$in': bookmarks_ids}}}}
        )
    else:
        collections.update_many(
            {'account_id': account_id},
            {'$pull': {'bookmarks': {'id': {'$in': bookmarks_ids}}}}
        )


def get_bookmark(bookmark_id, account_id, collection_key):
    results = collections.find({
        'account_id': account_id,
        'key': collection_key,
        'bookmarks.id': bookmark_id
    }, {'bookmarks.$': True})
    for result in results:
        return result['bookmarks'][0]


def move_bookmarks(bookmarks_ids, account_id, from_collection_key, to_collection_key):
    for bookmark_id in bookmarks_ids:
        bookmark = get_bookmark(bookmark_id, account_id, from_collection_key)
        delete_bookmarks([bookmark['id']], account_id, from_collection_key)
        add_bookmark(bookmark, account_id, to_collection_key)


def add_collection(account_id, collection):
    collection['account_id'] = account_id
    collection['bookmarks'] = []
    collections.insert(collection)
