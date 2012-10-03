enyo.kind({
	name:"Ubiquity.Settings",
	kind:"FittableRows",
	classes:"onyx",
	events:{
		onLogout:"",
		onBack:""
	},
	components:[
		{kind:"Scroller", fit:true, components:[
			{classes:"centered-form", components:[
				{kind:onyx.Groupbox, components:[
					{kind:"onyx.GroupboxHeader", content:"Account"},
					{kind:onyx.Button, content:"Log out", ontap:"doLogout", classes:"onyx-negative rowbutton"},
				]},
			]},
		]},
		{kind:"onyx.MoreToolbar", components:[
			{kind:"onyx.Button", content:"Back", ontap:"doBack"},
		]},
	],
})
