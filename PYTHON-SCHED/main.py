import datetime
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("locker-stock-management-firebase-adminsdk-6uju5-49c6d9515d.json") 
firebase_admin.initialize_app(cred)

def increment_days():
    db = firestore.client()
    inventory_ref = db.collection('inventory')

    items = inventory_ref.stream()

    for item in items:
        item_ref = inventory_ref.document(item.id)
        current_days = item.get('days', 0)
        new_days = current_days + 1
        item_ref.update({'days': new_days})

    print("Days incremented for all items.")

if __name__ == '__main__':
    increment_days()



