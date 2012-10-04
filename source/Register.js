enyo.kind({
	name:"Ubiquity.Register",
	events:{
		onCancelRegister:"",
		onRegisterComplete:"",
	},
	components:[
		{classes:"centered-form", components:[
			{kind:onyx.Groupbox, components:[
				{kind:"onyx.GroupboxHeader", content:"Register with Villo"},
				{kind:"onyx.InputDecorator", components:[
					{name:"username", kind:"onyx.Input", style:"width:100%", placeholder:"Username"},
				]},
				{kind:"onyx.InputDecorator", components:[
					{name:"password", kind:"onyx.Input", type:"password", style:"width:100%", placeholder:"Password"},
				]},
				{kind:"onyx.InputDecorator", components:[
					{name:"password_confirm", kind:"onyx.Input", type:"password", style:"width:100%", placeholder:"Confirm password"},
				]},
				{kind:"onyx.InputDecorator", components:[
					{name:"email", kind:"onyx.Input", style:"width:100%", placeholder:"Email address"},
				]},
			]},
			{style:"text-align:center", components:[
				{kind:onyx.Button, content:"Register", style:"width:50%", classes:"onyx-affirmative", ontap:"register"},
				{kind:onyx.Button, content:"Cancel", style:"width:50%", classes:"onyx-negative", ontap:"doCancelRegister"},
			]},
			{content:"Please note: registration is pretty much completely untested."},
		]},
	],
	register:function()
	{
		var registerCallback = function(params)
		{
			if(params === true)
				this.doRegisterComplete();
			else
			{
				alert("A registration error occurred");
			}
		}
		villo.user.register(
		{
			username:this.$.username.getValue(),
			password:this.$.username.getValue(),
			password_confirm:this.$.username.getValue(),
			email:this.$.username.getValue(),
			fourvalue:true,
			callback:registerCallback.bind(this)
		});
	},
});
