enyo.kind({
	name: "Ubiquity",
	kind:"Panels",
	arrangerKind:"LeftRightArranger",
	margin:0,
	classes:"onyx",
	draggable:false,
	fit: true,
	published:
	{
		backendKind:"Ubiquity.Backend.Villo",
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
		onLoginComplete:"initializeClipboard",
		onLogoutComplete:"showLogin",
		onShowSettings:"showSettings",
		onGotChanges:"gotChanges",
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
		if(!this.getBackend())
			this.setBackend(this.createComponent({kind:this.backendKind}));
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
	gotChanges:function(caller,changes)
	{
		if(changes.newItem)
		{
			var newItem = changes.newItem;
			this.$.Clipboard.addTransientItem(newItem);
			if(enyo.webOS.isActivated && enyo.webOS.addBannerMessage)
			{
				if(!enyo.webOS.isActivated())
					enyo.webOS.addBannerMessage(newItem,"{}" );
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

