/**
 * Base View
 */

const BaseView = Backbone.View.extend({

	model: null,

	template: null,

	initialize: function(options) {
		console.log('BaseView:initialize');
		this.controller = options.controller;
		this.render();
	},

	render: function() {
		console.log('BaseView:render');
		// this.$el.html('');
	}

});

export default BaseView;
