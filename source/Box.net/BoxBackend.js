enyo.kind({
	name:"Ubiquity.Backend.Box",
	published:{
		apiKey:"467cwldp0c8jesx6fq0ua8zcd09ru590",
	},
	events:{
		onGotChanges:"",
	},
	processResponse:function(inSender,inResponse)
	{
		debugger;
	},
	processError:function(inSender,inResponse)
	{
		debugger;
	},
	init:function()
	{
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'https%3A%2F%2Fwww.box.net%2Fapi%2F1.0%2Frest%3Faction%3Dget_ticket%26api_key%3D" + this.getApiKey() + "'&amp;format=json&amp;diagnostics=true";
		console.log(url);
		var ajax = new enyo.Ajax({
			url:url,
		});

		ajax.response(this,"processResponse");
		ajax.error(this,"processError");
		ajax.go();
	},
	isLoggedIn:function()
	{
		throw("Not implemented!");
	},
	getUsername:function()
	{
		throw("Not implemented!");
	},
	login:function(username, password, callback)
	{
		throw("Not implemented!");
	},
	isSubscribed:function()
	{
		throw("Not implemented!");
	},
	subscribe:function()
	{
		throw("Not implemented!");
	},
	unsubscribe:function()
	{
		throw("Not implemented!");
	},
	logout:function()
	{
		villo.user.logout();
	},
	loadClipboard:function(callback)
	{
		throw("Not implemented!");
	},
	setClipboard:function(clipboardData)
	{
		throw("Not implemented!");
	},
	addToClipboard:function(clipboardData)
	{
		throw("Not implemented!");
	},
	sendMessage:function()
	{
		throw("Not implemented!");
	},
	sendNewItemMessage:function(newItem)
	{
		throw("Not implemented!");
	}
});
