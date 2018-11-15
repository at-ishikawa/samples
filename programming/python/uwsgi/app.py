from logging import getLogger
from logging.config import fileConfig
from flask import Flask


fileConfig('logging.ini');

app = Flask(__name__)


@app.route("/")
def hello():
    logger = getLogger('info')
    logger.info({
        'message':'info',
        'method': 'hello'
    })

    logger = getLogger('error')
    logger.error({
        'message':'error',
        'method': 'hello'
    })
    return "Hello World!"

if __name__ == "__main__":
    app.run(host='0.0.0.0')
