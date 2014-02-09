$.fn.toggleWrapper = toggleWrapper = (options, init) ->
  backgroundColor = undefined
  zindex = undefined
  offset = undefined
  width = undefined
  height = undefined
  init = (if not init? then true else init)
  options = options or {}
  if init
    backgroundColor = @css('backgroundColor')
    zindex = @css('zIndex')
    _.defaults options,
      className: ''
      backgroundColor: (if _.indexOf([
        'transparent'
        'rgba(0, 0, 0, 0)'
      ], backgroundColor) < 0 then backgroundColor else 'white')
      zindex: (if _.indexOf([
        0
        '0'
        'auto'
      ], zindex) >= 0 then 1000 else Number(zindex))

    offset = @offset()
    width = @outerWidth(false)
    height = @outerHeight(false)
    $('<div></div>').appendTo('body').addClass(options.className).attr('data-wrapper', true).css
      width: width
      height: height
      top: offset.top
      left: offset.left
      position: 'absolute'
      zIndex: options.zindex + 1
      backgroundColor: options.backgroundColor

  else
    $('[data-wrapper]').remove()