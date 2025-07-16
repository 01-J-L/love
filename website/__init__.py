

from flask import Flask
from datetime import datetime
from flask_mail import Mail

mail = Mail()

def create_app():

    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'mels&jl06282025'  

    # --- ADDED: Email Configuration ---
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = "enemyslayer0909@gmail.com"
    app.config['MAIL_PASSWORD'] = "vhia pxov vvzl lgpm"
    app.config['MAIL_DEFAULT_SENDER'] = ("J.L. website", "enemyslayer0909@gmail.com")

    mail.init_app(app)

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    @app.context_processor
    def inject_year():
        return {'current_year': datetime.utcnow().year}

    return app