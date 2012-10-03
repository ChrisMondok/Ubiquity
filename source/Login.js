enyo.kind({
	name:"Ubiquity.Login",
	classes:"onyx centered",
	kind:"FittableRows",
	fit:true,
	events:{
		onVilloLoginComplete:"",
		onGotMessage:"",
	},
	handlers:{
		onVilloLoginComplete:"connectToMessaging",
	},
	components:[
		{
			name:"waitPopup",
			kind:"onyx.Popup", style:"text-align:center", floating:true, centered:true, scrim:true, modal:true, autoDismiss:false, components:[
			{kind:onyx.Spinner},
			{name:"waitMessage", content:"Please wait"},
		]},
		{name:"errorPopup", kind:"onyx.Popup", style:"text-align:center", floating:true, centered:true, scrim:true, modal:true, components:[
			{name:"errorMessage", content:"Please wait"},
			{kind:onyx.Button, content:"Ok", ontap:"hideErrorPopup"},
		]},
		{name:"panels", kind:enyo.Panels, fit:true, arrangerKind:"CardSlideInArranger", draggable:false, components:[
			{components:[
				{classes:"centered-form", components:[
					{kind:onyx.Groupbox, components:[
						{kind:"onyx.GroupboxHeader", content:"Log in to Villo"},
						{kind:"onyx.InputDecorator", components:[
							{name:"usernameInput", kind:"onyx.Input", style:"width:100%", placeholder:"Username"},
						]},
						{kind:"onyx.InputDecorator", components:[
							{name:"passwordInput", kind:"onyx.Input", type:"password", style:"width:100%", placeholder:"Password"},
						]},
					]},
					{classes:"centered-form", style:"text-align:center", components:[
						{kind:onyx.Button, content:"Log in", classes:"onyx-affirmative", ontap:"login"},
						{kind:onyx.Button, content:"Register", ontap:"showRegisterPane"},
					]},
				]},
			]},
			{kind:"Ubiquity.Register", onCancelRegister:"showLoginPane"},
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
		enyo.asyncMethod(this,this.redirect);
	},
	rendered:function()
	{
		this.inherited(arguments);
		this.$.waitMessage.setContent("Connecting to villo.");
		this.$.waitPopup.show();
	},
	redirect:function()
	{
		this.$.waitPopup.hide();
		if(villo.user.isLoggedIn())
		{
			this.doVilloLoginComplete();
		}
		else
			this.$.panels.setIndex(0);
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
	},
	loginCallback:function(response)
	{
		if(response === true)
		{
			if(villo.user.isLoggedIn())
				this.doVilloLoginComplete();
		}
		else
		{
			this.$.errorMessage.setContent("Check username and password");
			this.$.errorPopup.show()
		}
	},
	hideErrorPopup:function()
	{
		this.$.errorPopup.hide();
	},
	connectToMessaging:function()
	{
		if(!villo.chat.isSubscribed(villo.user.username))
		{
			villo.chat.join({room:villo.user.username,callback:this.doGotMessage.bind(this),presence: {enabled:false}})
		}
	},
});
