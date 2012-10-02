enyo.kind({
	name:"Ubiquity.Register",
	events:{
		onCancelRegister:"",
	},
	components:[
		{kind:onyx.Groupbox, classes:"centered-form", components:[
			{kind:"onyx.GroupboxHeader", content:"Register with Villo"},
			{kind:"onyx.InputDecorator", components:[
				{kind:"onyx.Input", style:"width:100%", placeholder:"Username"},
			]},
			{kind:"onyx.InputDecorator", components:[
				{kind:"onyx.Input", type:"password", style:"width:100%", placeholder:"Password"},
			]},
			{kind:"onyx.InputDecorator", components:[
				{kind:"onyx.Input", type:"password", style:"width:100%", placeholder:"Confirm password"},
			]},
			{kind:"onyx.InputDecorator", components:[
				{kind:"onyx.Input", style:"width:100%", placeholder:"Email address"},
			]},
		]},
		{classes:"centered-form", style:"text-align:center", components:[
			{kind:onyx.Button, content:"Cancel", classes:"onyx-negative", ontap:"doCancelRegister"},
			{kind:onyx.Button, content:"Register", classes:"onyx-affirmative"},
		]},
	],
});
