enyo.kind({
	name: "Ubiquity",
	kind:"Panels",
	classes:"onyx",
	draggable:false,
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
		onVilloLogoutComplete:"gotMessage",
		onShowSettings:"showSettings",
		onGotMessage:"gotMessage",
		onLocalChangeMade:"sendMessage",
		onNewItemAdded:"sendNewItemMessage",
		onBack:"goBack",
		onClearTapped:"doClearAll",
	},
	statics:{
		ID:Math.random()
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
		this.$.Clipboard.focusInput();
	},
	showSettings:function()
	{
		this.setIndex(2);
	},
	gotMessage:function(caller,response)
	{
		if(response.message.newItem && response.message.id != Ubiquity.ID)
		{
			var newItem = response.message.newItem;
			this.$.Clipboard.addTransientItem(unescape(newItem));
		}

		var loadClipboard = function()
		{
			this.$.Clipboard.load();
		}
			
		//this is what we like to call a nasty hack.
		//AFAIK, we can't tell when the remote settings have changed,
		//so we assume it takes less than a second.
		setTimeout(loadClipboard.bind(this),1000)
	},
	sendMessage:function()
	{
		villo.chat.send({room:villo.user.username,message:{"id":Ubiquity.ID}});
	},
	sendNewItemMessage:function()
	{
		villo.chat.send({room:villo.user.username,message:{
			"id":Ubiquity.ID,
			"newItem":escape(this.$.Clipboard.getItems()[0])
		}});
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
	doClearAll:function()
	{
		this.waterfall("onClearAll");
	},
});

