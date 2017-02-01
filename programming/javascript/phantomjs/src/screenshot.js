var casper = require('casper').create();

var userAgents = {
  'desktop': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
//  'mobile': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};

var urls = [
  'https://github.com/',
];

casper.start()
  .each(Object.keys(userAgents), function(self, userAgent) {

    self.userAgent(userAgent);
    self.each(urls, function (self, url) {
      self.thenOpen(url).then(function() {
        this.capture(device + '/github.png');
      })
    });
  });

casper.run();
