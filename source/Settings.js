enyo.kind({
	name:"Ubiquity.Settings",
	kind:"FittableRows",
	classes:"onyx",
	events:{
		onLogout:"",
		onBack:"",
		onClearAll:"",
	},
	statics:{
		openLinksAutomatically:false,
		openLinksInSharedWindow:false,
		clearWebViewOnHide:false,
	},
	published:{
		openLinksAutomatically:false,
		openLinksInSharedWindow:false,
		clearWebViewOnHide:false,
	},
	components:[
		{kind:"Scroller", fit:true, components:[
			{classes:"centered-form", components:[
				{kind:onyx.Groupbox, components:[
					{kind:"onyx.GroupboxHeader", content:"Account"},
					{classes:"row-padding", components:[
						{kind:onyx.Button, content:"Log out", ontap:"doLogout", classes:"rowbutton"},
					]},
					{classes:"row-padding", components:[
						{kind:onyx.Button, content:"Clear all pastes", ontap:"", classes:"rowbutton onyx-negative"},
					]},
				]},
				{kind:onyx.Groupbox, components:[
					{kind:"onyx.GroupboxHeader", content:"Local settings"},
					{kind:"FittableColumns", classes:"row-padding", components:[
						{content:"Open links inside app", fit:true},	
						{name:"sharedWindowToggle", kind:"onyx.ToggleButton", onChange:"sharedWindowToggleChanged"},
					]},
					{kind:"FittableColumns", classes:"row-padding", components:[
						{content:"Clear web view when hiding", fit:true},	
						{name:"clearWebViewToggle", kind:"onyx.ToggleButton", onChange:"clearWebViewToggleChanged"},
					]},
					{kind:"FittableColumns", classes:"row-padding", components:[
						{content:"Automatically open links", fit:true},	
						{name:"autoLinkToggle", kind:"onyx.ToggleButton", onChange:"autoLinkToggleChanged"},
					]},

				]},
			]},
		]},
		{kind:"onyx.MoreToolbar", components:[
			{kind:"onyx.Button", content:"Back", ontap:"doBack"},
		]},
	],
	create:function()
	{
		this.inherited(arguments);
		var olacookie = enyo.getCookie("openLinksAutomatically");
		if(olacookie)
			this.setOpenLinksAutomatically(olacookie == "true");
		var oliswcookie = enyo.getCookie("openLinksInSharedWindow");
		if(oliswcookie)
			this.setOpenLinksInSharedWindow(oliswcookie == "true");
		settings = this

	},
	openLinksAutomaticallyChanged:function()
	{
		value = this.getOpenLinksAutomatically();
		this.$.autoLinkToggle.setValue(value);
		Ubiquity.Settings.openLinksAutomatically = value;
		enyo.setCookie("openLinksAutomatically",value);
	},
	openLinksInSharedWindowChanged:function()
	{
		value = this.getOpenLinksInSharedWindow();
		this.$.sharedWindowToggle.setValue(value);
		Ubiquity.Settings.openLinksInSharedWindow = value;
		enyo.setCookie("openLinksInSharedWindow",value);
	},
	clearWebViewOnHideChanged:function()
	{
		value = this.getClearWebViewOnHide();
		this.$.clearWebViewToggle.setValue(value);
		Ubiquity.Settings.clearWebViewOnHide = value;
		enyo.setCookie("clearWebViewOnHide",value);
	},
	autoLinkToggleChanged:function(sender,event)
	{
		this.setOpenLinksAutomatically(sender.getValue())
	},
	sharedWindowToggleChanged:function(sender,event)
	{
		this.setOpenLinksInSharedWindow(sender.getValue());
	},
	clearWebViewToggleChanged:function(sender,event)
	{
		this.setClearWebViewOnHide(sender.getValue());
	},
})
