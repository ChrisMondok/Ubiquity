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
		onVilloLoginComplete:"goToClipboard",
		onShowSettings:"showSettings",
	},
	components:[
		{kind:"Ubiquity.Login"},
		{name:"Clipboard", kind:"Ubiquity.Clipboard"},
		{content:"Settings panel"}
	],
	goToClipboard:function()
	{
		this.setIndex(1);
	},
	showSettings:function()
	{
		this.setIndex(2);
	},
});

