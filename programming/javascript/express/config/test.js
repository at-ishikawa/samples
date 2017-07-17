module.exports = {
    "database": {
        "database": "testing"
    },
    "log": {
        "appenders": {
            "out": {
                "type": "stdout"
            }
        },
        "categories": {
            "default": {
                "appenders": [
                    "out"
                ],
                "level": "debug"
            }
        }
    }
};
