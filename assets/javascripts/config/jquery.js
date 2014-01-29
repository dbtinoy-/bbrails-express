$.fn.toggleWrapper = function toggleWrapper(options, init) {
  var backgroundColor
    , zindex
    , offset
    , width
    , height;

  init = init == null ? true: init;
  options = options || {};

  if (init) {
    backgroundColor = this.css('backgroundColor');
    zindex = this.css('zIndex');

    _.defaults(options, {
        className:        ''
      , backgroundColor:  _.indexOf(['transparent', 'rgba(0, 0, 0, 0)'], backgroundColor) < 0 ? backgroundColor : 'white'
      , zindex:           _.indexOf([0, '0', 'auto'], zindex) >= 0 ? 1000 : Number(zindex)
      });

    offset = this.offset();
    width = this.outerWidth(false);
    height = this.outerHeight(false);

    return $('<div></div>')
      .appendTo('body')
      .addClass(options.className)
      .attr('data-wrapper', true)
      .css({
        width: width
      , height: height
      , top: offset.top
      , left: offset.left
      , position: 'absolute'
      , zIndex: options.zindex + 1
      , backgroundColor: options.backgroundColor
      });

  } else {
    return $('[data-wrapper]').remove();
  }
};