enyo.kind({
	name:"Ubiquity.Register",
	events:{
		onCancelRegister:"",
	},
	components:[
		{classes:"centered-form", components:[
			{kind:onyx.Groupbox, components:[
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
			{style:"text-align:center", components:[
				{kind:onyx.Button, content:"Register", style:"width:50%" ,disabled:true, classes:"onyx-affirmative"},
				{kind:onyx.Button, content:"Cancel", style:"width:50%", classes:"onyx-negative", ontap:"doCancelRegister"},
			]},
		]},
	],
});
