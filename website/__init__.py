from flask import Flask
from datetime import datetime

def create_app():

    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'mels&jl06282025'  


    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    @app.context_processor
    def inject_year():
        return {'current_year': datetime.utcnow().year}

    return app