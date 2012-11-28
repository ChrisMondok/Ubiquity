enyo.kind({
	name:"Ubiquity.Login",
	classes:"onyx centered vertically-centered",
	kind:"Scroller",
	events:{
		onLoginComplete:"",
		onLogoutComplete:"",
	},
	handlers:{
		onLoginComplete:"connectToMessaging",
		onRegisterComplete:"registerComplete",
	},
	components:[
		{classes:"centered-form", components:[
			{kind:"onyx.Groupbox", classes:"vertically-centered", fit:true, components:[
				{kind:"onyx.GroupboxHeader", content:"Log in to Villo"},
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
		this.redirect();
	},
	redirect:function()
	{
		if(Ubiquity.backend.isLoggedIn())
		{
			this.$.usernameInput.setValue(Ubiquity.backend.getUsername());
			this.doLoginComplete();
		}
	},
	login:function()
	{
		var username = this.$.usernameInput.getValue();
		var password = this.$.passwordInput.getValue();
		Ubiquity.backend.login(username, password,this.loginCallback.bind(this));
		this.hideError();
	},
	logout:function()
	{
		Ubiquity.backend.logout();
		this.doLogoutComplete();
	},
	handleKeyPress:function(sender,event)
	{
		if(event.keyCode == 13)
			this.login();
	},
	loginCallback:function(response)
	{
		if(response === true)
		{
			if(Ubiquity.backend.isLoggedIn())
			{
				this.$.passwordInput.setValue("");
				this.doLoginComplete();
			}
			else
			{
				this.$.errorDrawer.setOpen(true);
				this.$.errorMessage.setContent("Login failed");
			}
		}
		else
		{
			this.$.errorDrawer.setOpen(true);
			this.$.errorMessage.setContent("Check username and password");
		}
	},
	connectToMessaging:function()
	{
		if(!Ubiquity.backend.isSubscribed())
			Ubiquity.backend.subscribe();
	},
	registerComplete:function()
	{
		this.$.usernameInput.setValue(this.$.registerPane.$.username.getValue());
		this.$.passwordInput.setValue(this.$.registerPane.$.password.getValue());
		this.showLoginPane();
		this.login();
	},
	hideError:function()
	{
		this.$.errorDrawer.setOpen(false);
	}
});
