enyo.kind({
	name:"enyo.WebView",
	kind:enyo.Control,
	classes:"enyo-webview",
	published:{
		tag:"iframe",
		src:"",
	},
	srcChanged:function()
	{
		this.inherited(arguments);
		this.setNodeProperty("src",this.getSrc());
	},
	create:function()
	{
		this.inherited(arguments);
		webview = this;
	},
});