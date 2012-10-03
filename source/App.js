enyo.kind({
	name: "Ubiquity",
	kind:"Panels",
	classes:"onyx",
	draggable:false,
	arrangerKind:"CardSlideInArranger",
	fit: true,
	events:
	{
		onOpenLinksAutomaticallyChanged:"",
		onOpenLinksInSharedWindowChanged:"",
	},
	handlers:
	{
		onLogout:"logout",
		onVilloLoginComplete:"initializeClipboard",
		onShowSettings:"showSettings",
		onGotMessage:"gotMessage",
		onBack:"goBack",
	},
	components:[
		{name:"Login", kind:"Ubiquity.Login"},
		{name:"Clipboard", kind:"Ubiquity.Clipboard"},
		{kind:"Ubiquity.Settings"}
	],
	initializeClipboard:function()
	{
		this.$.Clipboard.load();
		this.showClipboard();
	},
	showLogin:function()
	{
		this.setIndex(0);
	},
	showClipboard:function()
	{
		this.setIndex(1);
	},
	showSettings:function()
	{
		this.setIndex(2);
	},
	gotMessage:function()
	{
		this.$.Clipboard.load();
		var loadClipboard = function()
		{
			this.$.Clipboard.load();
		}
		//this is what we like to call a nasty hack.
		//AFAIK, we can't tell when the remote settings have changed,
		//so we assume it takes less than a second.
		setTimeout(loadClipboard.bind(this),1000)
	},
	logout:function()
	{
		this.showLogin();
		this.$.Login.logout();
	},
	goBack:function()
	{
		this.previous();
	},
});

