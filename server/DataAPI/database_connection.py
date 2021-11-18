from pymongo import MongoClient


client = MongoClient()
db = client.web_collection_database
collections = db.collections
accounts = db.accounts
