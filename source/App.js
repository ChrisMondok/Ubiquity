enyo.kind({
	name: "Ubiquity",
	fit:true,
	published:
	{
		backendKind:"Ubiquity.Backend.Node",
		backend:null,
	},
	events:
	{
		onOpenLinksAutomaticallyChanged:"",
		onOpenLinksInSharedWindowChanged:"",
	},
	handlers:
	{
		onLogout:"logout",
		onLogoutComplete:"showLogin",
		onShowSettings:"showSettings",
		onGotNewItem:"gotNewItem",
		onBack:"goBack",
		onClearTapped:"doClearAll",
		onLoginComplete:"loginComplete",
		onGotClipboard:"gotClipboard",
	},
	statics:{
		ID:Math.random(),
		backend:undefined,
	},
	components:[
		{name:"Panels", kind:"Panels", arrangerKind:"LeftRightArranger", margin:0, classes:"onyx enyo-fit", draggable:false, fit:true, components:[
			{name:"Login", kind:"Ubiquity.Login"},
			{name:"Clipboard", kind:"Ubiquity.Clipboard"},
			{kind:"Ubiquity.Settings"}
		]},
	],
	create:function()
	{
		this.inherited(arguments);
		if(!this.getBackend())
			this.setBackend(this.createComponent({kind:this.backendKind}));
	},
	loginComplete:function()
	{
		this.showClipboard();
	},
	showLogin:function()
	{
		this.$.Panels.setIndex(0);
		this.$.Clipboard.setItems([]);
	},
	showClipboard:function()
	{
		this.$.Panels.setIndex(1);
	},
	showSettings:function()
	{
		this.$.Panels.setIndex(2);
	},
	gotNewItem:function(caller,changes)
	{
		var newItem = changes.newItem;
		this.$.Clipboard.addTransientItem(newItem);
		if(enyo.webOS.isActivated && enyo.webOS.addBannerMessage)
		{
			if(!enyo.webOS.isActivated())
				enyo.webOS.addBannerMessage(newItem,"{}" );
		}
	},
	gotClipboard:function(sender,data)
	{
		this.$.Clipboard.setItems(data.clipboard);
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
	backendChanged:function(oldBackend)
	{
		if(oldBackend)
		{
			oldBackend.unsubscribe();
			//log out?
		}
		Ubiquity.backend = this.getBackend();
	}
});

