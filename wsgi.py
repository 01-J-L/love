import os
from main import app
from flask import Flask



if __name__ == '__main__':
  port = int(os.environ.get("PORT", 4000))
  app.run(host="0.0.0.0", port=port)