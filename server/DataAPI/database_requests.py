from server.DataAPI.database_connection import collections


def get_collections(user_id):
    return collections.find({'user_id': user_id})


def add_bookmark(bookmark, user_id, collection_key):
    collections.update_one(
        {'key': collection_key, 'user_id': user_id},
        {'$push': {'bookmarks': {'$each': [bookmark], '$position': 0}}},
        upsert=True
    )


def delete_bookmarks(bookmarks_ids, user_id, collection_key=None):
    if collection_key:
        collections.update_one(
            {'key': collection_key, 'user_id': user_id},
            {'$pull': {'bookmarks': {'id': {'$in': bookmarks_ids}}}}
        )
    else:
        collections.update_many(
            {'user_id': user_id},
            {'$pull': {'bookmarks': {'id': {'$in': bookmarks_ids}}}}
        )


def get_bookmark(bookmark_id, user_id, collection_key):
    results = collections.find({
        'user_id': user_id,
        'key': collection_key,
        'bookmarks.id': bookmark_id
    }, {'bookmarks.$': True})
    for result in results:
        return result['bookmarks'][0]


def move_bookmarks(bookmarks_ids, user_id, from_collection_key, to_collection_key):
    for bookmark_id in bookmarks_ids:
        bookmark = get_bookmark(bookmark_id, user_id, from_collection_key)
        delete_bookmarks([bookmark['id']], user_id, from_collection_key)
        add_bookmark(bookmark, user_id, to_collection_key)


def add_collection(user_id, collection):
    collection['user_id'] = user_id
    collections.insert(collection)
