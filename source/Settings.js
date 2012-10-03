enyo.kind({
	name:"Ubiquity.Settings",
	kind:"FittableRows",
	classes:"onyx",
	events:{
		onLogout:"",
		onBack:""
	},
	statics:{
		openLinksAutomatically:false,
		openLinksInSharedWindow:false,
	},
	published:{
		openLinksAutomatically:false,
		openLinksInSharedWindow:false,
	},
	components:[
		{kind:"Scroller", fit:true, components:[
			{classes:"centered-form", components:[
				{kind:onyx.Groupbox, components:[
					{kind:"onyx.GroupboxHeader", content:"Account"},
					{kind:onyx.Button, content:"Log out", ontap:"doLogout", classes:"onyx-negative rowbutton"},
				]},
				{kind:onyx.Groupbox, components:[
					{kind:"onyx.GroupboxHeader", content:"Local settings"},
					{kind:"FittableColumns", style:"padding:8px", components:[
						{content:"Automatically open links", fit:true},	
						{name:"autoLinkToggle", kind:"onyx.ToggleButton", onChange:"autoLinkToggleChanged"},
					]},
					{kind:"FittableColumns", style:"padding:8px", components:[
						{content:"Open links inside app", fit:true},	
						{name:"sharedWindowToggle", kind:"onyx.ToggleButton", onChange:"sharedWindowToggleChanged"},
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
		enyo.setCookie("openLinksAutomatically",value);
	},
	openLinksInSharedWindowChanged:function()
	{
		value = this.getOpenLinksInSharedWindow();
		this.$.sharedWindowToggle.setValue(value);
		Ubiquity.Settings.openLinksInSharedWindow = value;
		enyo.setCookie("openLinksInSharedWindow",value);
	},
	autoLinkToggleChanged:function(sender,event)
	{
		this.setOpenLinksAutomatically(sender.getValue())
	},
	sharedWindowToggleChanged:function(sender,event)
	{
		this.setOpenLinksInSharedWindow(sender.getValue());
	},
})
