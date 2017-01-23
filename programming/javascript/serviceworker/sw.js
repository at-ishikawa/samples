self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
});

self.addEventListener('message', function (event) {
  var message = event.data;
  console.log("SW Received Message: " + message);

  clients.matchAll().then(function (clients) {
    clients[0].postMessage('message');
  });
});
