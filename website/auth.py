from flask import Blueprint, render_template

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return "<h1>Login (Placeholder)</h1>" 

@auth.route('/logout')
def logout():
    return "<h1>Logout (Placeholder)</h1>"

@auth.route('/sign-up')
def sign_up():
    return "<h1>Sign Up (Placeholder)</h1>"