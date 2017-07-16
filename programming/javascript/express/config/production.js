module.exports = {
    "log": {
        "appenders": {
            "all": {
                "type": "dateFile",
                "pattern": ".yyyy-MM-dd",
                "filename": "./storage/log/application.log"
            }
        },
        "categories": {
            "default": {
                "appenders": [
                    "all",
                ],
                "level": "info"
            }
        }
    }
};
