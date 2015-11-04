/**
 * Homepage View
 */

const HomepageView = Backbone.View.extend({

	model: null,

	template: null,

	// events: {
		
	// },

	initialize: function(options) {
		// console.log('HomepageView:initialize');
		this.controller = options.controller;
		this.render();
	},

	render: function() {
		console.log('HomepageView:render');

		return this.$el;
	}

});

export default HomepageView;
