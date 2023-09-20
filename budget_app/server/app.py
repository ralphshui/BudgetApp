from flask import request, make_response, jsonify, session
from flask_restful import Resource
from config import app, db, api
from models import User, Transaction, Account, Category, CategoryTransaction
from flask_login import LoginManager, login_user, logout_user, current_user
from flask_cors import CORS as FlaskCors

login_manager = LoginManager()
login_manager.init_app(app)

cors = FlaskCors(app)

app.secret_key = b'\xf6\xd03L\x0fq%\xbat\xe0\x15r\x054\xbe\xcc'

@app.route('/')
def index():
    return '<h1>Phase 5 Server On</h1>'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
    
    def post(self):
        try:
            new_user = User(
                username = request.get_json()["username"],
                password_hash = request.get_json()["password"]
            )
            db.session.add(new_user)
            db.session.commit()

            return make_response(new_user.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
    
api.add_resource(Users, '/users')

class CurrentUser(Resource):
    def get(self):
        user = current_user
        if user:
            return make_response(user.to_dict(), 200)

api.add_resource(CurrentUser, '/currentuser')

class Accounts(Resource):
    def get(self):
        accounts = [account.to_dict() for account in Account.query.all()]
        return make_response(accounts, 200)
    
    def post(self):
        try:
            new_account = Account(
                name = request.get_json()["name"],
                balance = request.get_json()["balance"],
                user_id = request.get_json()["user_id"]
            )
            db.session.add(new_account)
            db.session.commit()
            return make_response(new_account.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
    
api.add_resource(Accounts, '/accounts')

class AccountsByUserId(Resource):
    def get(self, user_id):
        user_accounts = [account.to_dict(rules=("-transactions",'-user',)) 
        for account in Account.query.filter_by(user_id=user_id).all()]

        return make_response(user_accounts, 200)
    
api.add_resource(AccountsByUserId, '/useraccounts/<int:user_id>')

class AccountById(Resource):
    def get(self, id):
        account = Account.query.filter(Account.id==id).first()
        return make_response(account.to_dict(rules=("-transactions",)), 200)
    
    def patch(self, id):
        account = Account.query.filter(Account.id==id).first()
        data = request.get_json()

        if not account:
            return make_response({"error": "Account not found"}, 404)
        
        try:
            for attr in data:
                setattr(account, attr, data[attr])

            db.session.add(account)
            db.session.commit()

            return make_response(account.to_dict(rules=("-transactions",)), 202)
        
        except ValueError as error_message:
            error = make_response({"errors": str(error_message)}, 400)
            return error
        
    def delete(self, id):
        account = Account.query.filter_by(id=id).first()
        
        db.session.delete(account)
        db.session.commit()
        return make_response({}, 204)
    
api.add_resource(AccountById, '/accounts/<int:id>')

class Categories(Resource):
    def get(self):
        categories = [category.to_dict(rules=('-transactions',)) for category in Category.query.all()]
        return make_response(categories, 200)
    
api.add_resource(Categories, '/categories')

class Transactions(Resource):
    def get(self):
        transactions = [transaction.to_dict() for transaction in Transaction.query.all()]
        return make_response(transactions, 200)
    
    def post(self):
        categName = request.get_json()["category"] 
        category = Category.query.filter(Category.name==categName).first()

        try:
            new_transaction = Transaction(
                account_id = request.get_json()["account_id"],
                type = request.get_json()["type"],
                description = request.get_json()["description"],
                amount = request.get_json()["amount"],
                date = request.get_json()["date"]
            )
            new_transaction.categoryMethod(category)    
            db.session.add(new_transaction)
            db.session.commit()

            return make_response(new_transaction.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)

api.add_resource(Transactions, '/transactions')       

class TransactionById(Resource):
    def get(self, id):
        transaction = Transaction.query.filter_by(id=id).first()
        return make_response(transaction.to_dict(), 200)
    
    def delete(self, id):
        transaction = Transaction.query.filter_by(id=id).first()
        
        db.session.delete(transaction)
        db.session.commit()
        return make_response({}, 204)
    
api.add_resource(TransactionById, '/transactions/<int:id>')

# class TransactionsByUserId(Resource):
#     def get(self, user_id):
#         userTransactions = [transaction.to_dict() for transaction in 
#         Transaction.query.filter(Transaction.acccount.user_id==user_id).all()]
#         return make_response(userTransactions, 200)

# api.add_resource(TransactionsByUserId, '/usertransactions/<int:user_id>')
# *** currently cannot query bc no userid in Transaction model

class Login(Resource):
    def post(self):
        user = User.query.filter(User.username == request.get_json()['username']).first()
        if user:
            user_pass = User.authenticate(user, request.get_json()['password'])
        else:
            return make_response({"error": "User not found"}, 400)
        if user_pass == True:
            login_user(user, remember=True)
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"error": "Username or password incorrect"}, 400)
    
api.add_resource(Login, '/login')

class Logout(Resource):
    def post(self):
        logout_user()
        return make_response({'message': '204: No Content'}, 204)

api.add_resource(Logout, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
