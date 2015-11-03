/**
 * Homepage View
 */

import BaseView from 'views/BaseView';

const HomepageView = BaseView.extend({

	initialize: function(options) {
		this._super(options);
		console.log('HomepageView:initialize');
	},

	render: function() {
		this._super();
		console.log('HomepageView:render');
		return this.$el;
	}

});

export default HomepageView;
