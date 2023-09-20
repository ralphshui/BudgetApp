#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import requests
import json 

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Transaction, User, Account, Category, CategoryTransaction

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        
        print("Deleting data...")
        User.query.delete()
        Account.query.delete()
        Category.query.delete()
        Transaction.query.delete()
        CategoryTransaction.query.delete()

        print('Creating User...')
        user1 = User(username='ralph', password_hash="123")
        user2 = User(username='wendy', password_hash="123")
        user3 = User(username='steve', password_hash="123")
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.commit()

        print('Creating accounts...')
        new_account1 = Account(user_id=user1.id, name="Checking Account", balance=5000)
        new_account2 = Account(user_id=user1.id, name="Savings Account", balance=3000)
        new_account3 = Account(user_id=user2.id, name="Petty Cash", balance=1000)
        new_account4 = Account(user_id=user3.id, name="Brokerage Account", balance=8000)
        new_account5 = Account(user_id=user1.id, name="IRA", balance=6500)
        new_account6 = Account(user_id=user2.id, name="401(k) Account", balance=4700)
        new_account7 = Account(user_id=user1.id, name="HSA", balance=5230)
        new_account8 = Account(user_id=user2.id, name="Checking Account", balance=9000)
        db.session.add(new_account1)
        db.session.add(new_account2)
        db.session.add(new_account3)
        db.session.add(new_account4)        
        db.session.add(new_account5) 
        db.session.add(new_account6)   
        db.session.add(new_account7)      
        db.session.add(new_account8)  
        db.session.commit()

        print("Creating Categories...")
        categories = ["Income", "Utilities", "Transportation", "Food", "Healthcare",
        "Insurance", "Entertainment", "Donations", "Pet", "Housing", "Repairs/Renovations ",
        "Debt", "Childcare", "Education", "Personal", "Miscellaneous"]

        for add_category in categories:
            category = Category(name=add_category)
            db.session.add(category)
        db.session.commit()

        # print('Creating transactions...')
        # transaction1 = Transaction(description='Allowance', type='Income', amount=200, 
        # date="9/14/2023", account_id=new_account2.id)
        # transaction2 = Transaction(description='Vet', type='Expense', amount=150, 
        # date="9/01/2023", account_id=new_account1.id)
        # transaction3 = Transaction(description='Mobile Plan', type='Expense', amount=50, 
        # date="9/05/2023",account_id=new_account1.id)
        # transaction4 = Transaction(description='Lottery', type='Income', amount=600, 
        # date="9/10/2023",account_id=new_account1.id)
        # transaction5 = Transaction(description='gas & water', type='Expense', amount=175, 
        # date="8/14/2021",account_id=new_account1.id)
        # transaction6 = Transaction(description='Doctor checkup', type='Expense', amount=260, 
        # date="5/14/2023",account_id=new_account8.id)
        # transaction7 = Transaction(description='oil change', type='Expense', amount=80, 
        # date="1/14/2022",account_id=new_account8.id)

        # db.session.add(transaction1)
        # db.session.add(transaction2)
        # db.session.add(transaction3)
        # db.session.add(transaction4)        
        # db.session.add(transaction5) 
        # db.session.add(transaction6)   
        # db.session.add(transaction7)     
 
        # db.session.commit()

        # print('Creating CategoryTransactions...')
        # oil_change_category = Category.query.filter_by(name='Transportation').first()
        # sample7 = CategoryTransaction(category_id=oil_change_category.id, 
        # transaction_id=transaction7.id)

        # lottery_category = Category.query.filter_by(name='Miscellaneous').first()
        # sample4 = CategoryTransaction(category_id=lottery_category.id, 
        # transaction_id=transaction4.id)

        # doctor_checkup_category = Category.query.filter_by(name='Healthcare').first()
        # sample6 = CategoryTransaction(category_id=doctor_checkup_category.id, 
        # transaction_id=transaction6.id)
        # db.session.add(sample7)   
        # db.session.add(sample4)      
        # db.session.add(sample6) 
        # db.session.commit()

        print("Seeding done!")