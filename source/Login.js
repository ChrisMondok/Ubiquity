enyo.kind({
	name:"Ubiquity.Login",
	kind:enyo.Panels,
	draggable:false,
	classes:"onyx centered",
	events:{
		onVilloLoginComplete:"",
	},
	components:[
		{components:[
			{kind:onyx.Groupbox, classes:"centered-form", components:[
				{kind:"onyx.GroupboxHeader", content:"Log in to Villo"},
				{kind:"onyx.InputDecorator", components:[
					{kind:"onyx.Input", style:"width:100%", placeholder:"Username"},
				]},
				{kind:"onyx.InputDecorator", components:[
					{kind:"onyx.Input", type:"password", style:"width:100%", placeholder:"Password"},
				]},
			]},
			{classes:"centered-form", style:"text-align:center", components:[
				{kind:onyx.Button, content:"Log in", classes:"onyx-affirmative", ontap:"doVilloLoginComplete"},
				{kind:onyx.Button, content:"Register", ontap:"showRegisterPane"},
			]},
		]},
		{kind:"Ubiquity.Register", onCancelRegister:"hideRegisterPane"},
	],
	showRegisterPane:function()
	{
		this.next();
	},
	hideRegisterPane:function()
	{
		this.previous()
	},
});
