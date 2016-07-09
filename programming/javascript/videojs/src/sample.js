import videojs from 'video.js';

const onPlayerReady = (player, options) => {
  player.addClass('vjs-sample');
}

const sample = function(options) {
  console.log(options);
  this.ready(() => {
    console.log('sample ready');
    var defaultOptions = {};
    onPlayerReady(this, videojs.mergeOptions(defaultOptions, options));
  });
}

videojs.plugin('sample', sample);
sample.VERSION = '__VERSION__';

export default sample;
