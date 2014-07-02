(function () {
  var ns = $.namespace('pskl.rendering.frame');

  ns.TiledFrameRenderer = function (container, zoom) {
    this.container = container;
    this.setZoom(zoom);

    this.displayContainer = document.createElement('div');
    this.displayContainer.classList.add('tiled-frame-container');
    container.get(0).appendChild(this.displayContainer);

    this.cachedImageProcessor = new pskl.model.frame.CachedFrameProcessor();
    this.cachedImageProcessor.setFrameProcessor(this.frameToDataUrl_.bind(this));
  };

  ns.TiledFrameRenderer.prototype.frameToDataUrl_ = function (frame) {
    var canvas = new pskl.utils.FrameUtils.toImage(frame, this.zoom);
    return canvas.toDataURL('image/png');
  };

  ns.TiledFrameRenderer.prototype.render = function (frame) {
    var imageSrc = this.cachedImageProcessor.get(frame, this.zoom);
    this.displayContainer.style.backgroundImage = 'url(' + imageSrc + ')';
  };

  ns.TiledFrameRenderer.prototype.show = function () {
    if (this.displayContainer) {
      this.displayContainer.style.display = 'block';
    }
  };

  ns.TiledFrameRenderer.prototype.setZoom = function (zoom) {
    this.zoom = zoom;
  };

  ns.TiledFrameRenderer.prototype.getZoom = function () {
    return this.zoom;
  };
})();