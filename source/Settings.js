enyo.kind({
	name:"Ubiquity.Settings",
	kind:"FittableRows",
	classes:"onyx",
	events:{
		onLogout:"",
		onBack:""
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
						{content:"Open links in shared window", fit:true},	
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
		this.$.autoLinkToggle.setValue(this.getOpenLinksAutomatically());
		enyo.setCookie("openLinksAutomatically",this.getOpenLinksAutomatically());
	},
	openLinksInSharedWindowChanged:function()
	{
		this.$.sharedWindowToggle.setValue(this.getOpenLinksInSharedWindow());
		enyo.setCookie("openLinksInSharedWindow",this.getOpenLinksInSharedWindow());
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
