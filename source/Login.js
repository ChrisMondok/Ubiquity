enyo.kind({
	name:"Ubiquity.Login",
	classes:"onyx centered vertically-centered",
	kind:"Scroller",
	components:[
		{classes:"centered-form", components:[
			{kind:"onyx.Groupbox", classes:"vertically-centered", fit:true, components:[
				{kind:"onyx.GroupboxHeader", content:"Log in"},
				{kind:"onyx.InputDecorator", components:[
					{name:"usernameInput", kind:"onyx.Input", style:"width:100%", placeholder:"Username", onkeypress:"handleKeyPress"},
				]},
				{kind:"onyx.InputDecorator", components:[
					{name:"passwordInput", kind:"onyx.Input", type:"password", style:"width:100%", placeholder:"Password", onkeypress:"handleKeyPress"},
				]},
			]},
			{style:"text-align:center", components:[
				{kind:onyx.Button, content:"Log in", classes:"onyx-affirmative rowbutton", ontap:"login"},
				{name:"errorDrawer", open:false, kind:"onyx.Drawer", components:[
					{kind:"FittableColumns", classes:"error vertically-centered", components:[
						{kind:enyo.Image, src:"assets/warning.png"},
						{fit:true, name:"errorMessage", content:"An error occurred"},
					]},
				]},
			]},
		]},
	],
	showLoginPane:function()
	{
		this.$.panels.setIndex(0)
	},
	showRegisterPane:function()
	{
		this.$.panels.setIndex(1);
	},
	rendered:function()
	{
		this.inherited(arguments);
		Ubiquity.backend.init();
	},
	login:function()
	{
		var username = this.$.usernameInput.getValue();
		var password = this.$.passwordInput.getValue();
		Ubiquity.backend.login(username, password);
		this.hideError();
	},
	handleKeyPress:function(sender,event)
	{
		if(event.keyCode == 13)
			this.login();
	},
	showLoginError:function(message)
	{
		this.$.errorDrawer.setOpen(true);
		this.$.errorMessage.setContent(message);
	},
	connectToMessaging:function()
	{
		if(!Ubiquity.backend.isSubscribed())
			Ubiquity.backend.subscribe();
	},
	hideError:function()
	{
		this.$.errorDrawer.setOpen(false);
	}
});
