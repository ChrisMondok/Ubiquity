enyo.kind({
	name: "Ubiquity",
	kind:"Panels",
	arrangerKind:"LeftRightArranger",
	margin:0,
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
		onLoginComplete:"initializeClipboard",
		onLogoutComplete:"showLogin",
		onShowSettings:"showSettings",
		onGotMessage:"gotMessage",
		onLocalChangeMade:"sendMessage",
		onNewItemAdded:"sendNewItemMessage",
		onBack:"goBack",
		onClearTapped:"doClearAll",
	},
	statics:{
		ID:Math.random(),
		backend:undefined,
	},
	components:[
		{name:"Login", kind:"Ubiquity.Login"},
		{name:"Clipboard", kind:"Ubiquity.Clipboard"},
		{kind:"Ubiquity.Settings"}
	],
	create:function()
	{
		this.inherited(arguments);
		Ubiquity.backend = this.createComponent({kind:"Ubiquity.Backend.Villo"});
	},
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
	gotMessage:function(caller,response)
	{
		if(response.message.newItem && response.message.id != Ubiquity.ID)
		{
			var newItem = response.message.newItem;
			this.$.Clipboard.addTransientItem(unescape(newItem));
			if(enyo.webOS.isActivated && enyo.webOS.addBannerMessage)
			{
				if(!enyo.webOS.isActivated())
					enyo.webOS.addBannerMessage(unescape(response.message.newItem),"{}" );
			}
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

