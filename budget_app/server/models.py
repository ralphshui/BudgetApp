from sqlalchemy_serializer import SerializerMixin
from flask_login import UserMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    accounts = db.relationship('Account', backref='user', cascade='all, delete')

    serialize_rules = ('-accounts.user',)
    serialize_only = ('id', 'username',)

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('username')
    def validate_username(self, key, username):
        user = User.query.filter_by(username=username).first()
        if user:
            raise ValueError("Username already exists")
        else:
            return username
        
class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    balance = db.Column(db.Float)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
    transactions = db.relationship('Transaction', backref='account', cascade='all, delete')

    serialize_rules = ('-user.accounts', 'transactions.account',)

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    transactions =  db.relationship('Transaction', secondary='categorytransactions', back_populates='categories')

    serialize_rules = ('-transactions.categories', )

class CategoryTransaction(db.Model):
    __tablename__= "categorytransactions"

    id = db.Column(db.Integer, primary_key=True)

    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))
    transaction_id = db.Column(db.Integer, db.ForeignKey("transactions.id"))


class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    
    description = db.Column(db.String)
    type = db.Column(db.String)
    amount = db.Column(db.Integer)
    date = db.Column(db.String)

    account_id = db.Column(db.Integer, db.ForeignKey("accounts.id"))

    categories =  db.relationship('Category', secondary='categorytransactions', back_populates='transactions')

    serialize_rules = ('-account.transactions', '-categories.transactions')

    def categoryMethod(self, categ):
        self.categories.append(categ)