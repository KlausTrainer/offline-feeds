var YfrBars = function() {

  this.templates = {};

  this.$templates = document.querySelectorAll('template');

  this.postList = document.querySelector('.posts');

  this._init();
};

YfrBars.prototype._init = function() {
  if ('content' in document.createElement('template')) {
    Array.prototype.forEach.call(
      this.$templates,
      function(template) {
        this.templates[template.dataset.templatename] = template;
      }.bind(this));
  }

};

YfrBars.prototype.render = function(templateName, data) {
  var tmpl = this.templates[templateName],
    elements = tmpl.content.querySelectorAll('[data-content]');

  Array.prototype.forEach.call(elements, function(element) {
    element.innerHTML = data[element.dataset.content];
  });

  this.postList.appendChild(document.importNode(tmpl.content, true));
};

window.yfrBars = new YfrBars();
