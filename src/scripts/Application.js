/**
 * Application Module
 * @author Chris Nelson
 */

import AppConfig from 'config/AppConfig';
import AppEvents from 'config/AppEvents';
import PubSub from 'utilities/PubSub';
import breakpointChangeEvent from 'utilities/breakpointChangeEvent';
import AppState from 'models/AppState';
import MainNavView from 'views/MainNavView';
// import HomepageView from 'views/HomepageView';

const Application = {

	initialize: function() {
		// console.log('Application:initialize');

		this.$window = $(window);
		this.$document = $(document);
		this.$html = $('html');
		this.$body = $('body');

		this.$content = $('#content');
		this.$panels = this.$content.find('section.content-section');

		this.$mainnav = $('#mainnav');
		this.$links = this.$mainnav.find('a');

		this.bodyID = this.$body.attr('id');

		if (AppConfig.isIE9) {this.$html.addClass('ie9');}
		if (AppConfig.isIE10) {this.$html.addClass('ie10');}
		if (AppConfig.isIE11) {this.$html.addClass('ie11');}

		this.appState = new AppState();

		breakpointChangeEvent();

		this.initScrollControl();

		this.initViews();

		this._addEventListeners();

	},

	initScrollControl: function() {
		// console.log('initScrollControl');

		var jumpLinkStart = function(event) {
			console.log("jumpLinkScenes:start:", event);
		};

		var jumpLinkEnter = function(event) {
			console.log("jumpLinkScenes:enter:", event);
		};

		var jumpLinkEnd = function(event) {
			console.log("jumpLinkScenes:end:", event);
		};

		var jumpLinkLeave = function(event) {
			console.log("jumpLinkScenes:leave:", event);
		};

		var toggleNavStart = function(event) {
			console.log("toggleNavScenes:start:", event);
		};

		var toggleNavEnter = function(event) {
			console.log("toggleNavScenes:enter:", event);
		};

		var toggleNavEnd = function(event) {
			console.log("toggleNavScenes:end:", event);
		};

		var toggleNavLeave = function(event) {
			console.log("toggleNavScenes:leave:", event);
		};

		this.scrollController = new ScrollMagic.Controller({});
		this.jumpLinkScenes = [];
		this.toggleNavScenes = [];

		for (var i=0, len = this.$panels.length; i<len; i++) {
			this.jumpLinkScenes[i] = new ScrollMagic.Scene({
					triggerElement: this.$panels.eq(i),
					triggerHook: 'onLeave'
				})
				// .on("start", jumpLinkStart)
				// .on("enter", jumpLinkEnter)
				// .on("end", jumpLinkEnd)
				// .on("leave", jumpLinkLeave)
				.addIndicators()
				.setPin(this.$panels.eq(i))
				.addTo(this.scrollController);
			this.toggleNavScenes[i] = new ScrollMagic.Scene({
					triggerElement: this.$panels.eq(i),
					triggerHook: 0.25,//'onCenter',
					duration: '100%'
				})
				// .on("start", toggleNavStart)
				// .on("enter", toggleNavEnter)
				// .on("end", toggleNavEnd)
				// .on("leave", toggleNavLeave)
				.addIndicators()
				.setClassToggle(this.$links.eq(i), 'active')
				.addTo(this.scrollController);
		}

	},

	initViews: function() {
		// this.content1View = new Content1View({el: this.$panels.eq(0), controller: this});
		// this.content2View = new Content2View({el: this.$panels.eq(1), controller: this});
		// this.content3View = new Content3View({el: this.$panels.eq(2), controller: this});
		// this.content4View = new Content4View({el: this.$panels.eq(3), controller: this});
		// this.content5View = new Content5View({el: this.$panels.eq(4), controller: this});
		// this.content6View = new Content6View({el: this.$panels.eq(5), controller: this});
		this.mainnavView = new MainNavView({el: this.$mainnav, controller: this});
		// this.homepageView = new HomepageView({
		// 	controller: this,
		// 	el: $('#content')
		// });
	},

	_addEventListeners: function() {
		this.$window.on('resize', function(event) {
			this.$panels.css({width: '100%'});
		}.bind(this));
		PubSub.on(AppEvents.BREAKPOINT_CHANGE, this.onBreakpointChange, this);
	},

	_removeEventListeners: function() {
		PubSub.off(AppEvents.BREAKPOINT_CHANGE, this.onBreakpointChange, this);
	},

	onBreakpointChange: function(params) {
		// console.log('onBreakpointChange', params);
		// Store currentBreakpoint in a Backbone model
		this.appState.set({currentBreakpoint: AppConfig.currentBreakpoint});
	}

};

export default Application;
