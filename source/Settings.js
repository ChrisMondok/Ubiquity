enyo.kind({
	name:"Ubiquity.Settings",
	classes:"onyx-dark",
	events:{
		onLogout:""
	},
	components:[
		{kind:onyx.Button, content:"Log out", ontap:"doLogout", classes:"onyx-negative"},
	],
})
