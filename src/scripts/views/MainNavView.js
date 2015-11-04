/**
 * MainNav View
 */

const MainNavView = Backbone.View.extend({

	events: {
		'click a' : 'onNavClick'
	},

	initialize: function(options) {
		this.controller = options.controller;
		this.scrollController = options.controller.scrollController;

		this.scrollController.scrollTo(function(newpos) {
			TweenMax.to(window, 0.6, {scrollTo: {y: newpos}});
		});

	},

	onNavClick: function(event) {
		event.preventDefault();
		var $target = $(event.currentTarget);
		var id = $target.attr('href');
		this.scrollController.scrollTo(id);
	}

});

export default MainNavView;
