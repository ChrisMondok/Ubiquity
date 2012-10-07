enyo.kind({
	name:"Ubiquity.Login",
	classes:"onyx centered vertically-centered",
	kind:"Scroller",
	events:{
		onVilloLoginComplete:"",
		onVilloLogoutComplete:"",
		onGotMessage:"",
	},
	handlers:{
		onVilloLoginComplete:"connectToMessaging",
		onRegisterComplete:"registerComplete",
	},
	components:[
		{classes:"centered-form", components:[
			{kind:"onyx.Groupbox", classes:"vertically-centered", fit:true, components:[
				{kind:"onyx.GroupboxHeader", content:"Log in to Villo"},
				{kind:"onyx.InputDecorator", components:[
					{name:"usernameInput", kind:"onyx.Input", style:"width:100%", placeholder:"Username"},
				]},
				{kind:"onyx.InputDecorator", components:[
					{name:"passwordInput", kind:"onyx.Input", type:"password", style:"width:100%", placeholder:"Password"},
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
	create:function()
	{
		this.inherited(arguments);
		villo.load({
			id:"com.chrismondok.ubiquity",
			version:"2.0.0",
			developer:"Chris Mondok",
			type:"mobile",
			title:"Ubiquity",
			push:true
		});
	},
	rendered:function()
	{
		this.inherited(arguments);
		this.redirect();
	},
	redirect:function()
	{
		if(villo.user.isLoggedIn())
		{
			this.$.usernameInput.setValue(villo.user.username);
			this.doVilloLoginComplete();
		}
	},
	login:function()
	{
		villo.user.login(
			{
				username:this.$.usernameInput.getValue(),
				password:this.$.passwordInput.getValue()
			},
			this.loginCallback.bind(this)
		);
		this.hideError();
	},
	logout:function()
	{
		villo.user.logout();
		this.doVilloLogoutComplete();
	},
	loginCallback:function(response)
	{
		if(response === true)
		{
			if(villo.user.isLoggedIn())
			{
				this.$.passwordInput.setValue("");
				this.doVilloLoginComplete();
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
		if(!villo.chat.isSubscribed(villo.user.username))
		{
			villo.chat.join({room:villo.user.username,callback:this.doGotMessage.bind(this),presence: {enabled:false}})
		}
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
