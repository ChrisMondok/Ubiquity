enyo.kind({
	name: "Ubiquity",
	kind:"Panels",
	draggable:false,
	fit: true,
	events:
	{
	},
	handlers:
	{
		onVilloLoginComplete:"initializeClipboard",
		onShowSettings:"showSettings",
		onGotMessage:"gotMessage",
	},
	components:[
		{kind:"Ubiquity.Login"},
		{name:"Clipboard", kind:"Ubiquity.Clipboard"},
		{kind:"Ubiquity.Settings"}
	],
	initializeClipboard:function()
	{
		this.$.Clipboard.load();
		this.goToClipboard();
	},
	goToClipboard:function()
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
		setTimeout(loadClipboard.bind(this),1000);
	},
});

