import logging
import sys
from flask import Flask, jsonify
from pythonjsonlogger import jsonlogger

app = Flask(__name__)

app.logger.handlers.clear()
app.logger.setLevel(logging.INFO)

logHandler = logging.StreamHandler(sys.stdout)
formatter = jsonlogger.JsonFormatter('%(asctime)s %(levelname)s %(message)s')
logHandler.setFormatter(formatter)
app.logger.addHandler(logHandler)


@app.route("/")
def hello():
    app.logger.info({
        'message':'Hello World',
        'method': 'hello'
    })
    return "Hello World!"

if __name__ == "__main__":
    app.run(host='0.0.0.0')
