enyo.kind({
	name:"Ubiquity.Clipboard",
	kind:"FittableRows",
	classes:"onyx",
	fit:true,
	events:{
		onShowSettings:"",
	},
	components:[
		{kind:enyo.Scroller, fit:true, components:[
			{kind:enyo.Repeater, count:5, onSetupItem:"renderClipboardComponent", components:[
				{name:"row", kind:onyx.Item, components:[
					{kind:"FittableColumns", components:[
						{name:"text", classes:"enyo-selectable", fit:true},
						{kind:onyx.MenuDecorator, onSelect:"menuItemChosen", components:[
							{content:"Menu"},
							{kind:onyx.Menu, components:[
								{content:"Copy"},
								{content:"Visit URL", disabled:true},
								{content:"Delete"},
							]},
						]}
					]},
				]},
			]},
		]},
		{kind:"onyx.Toolbar", components:[
			{kind:"onyx.InputDecorator", components:[
				{kind:"onyx.Input"},
			]},
			{kind:"onyx.Button", content:"Paste", classes:"onyx-affirmative"},
			{kind:"onyx.Button", content:"Settings", ontap:"doShowSettings"},
		]}
	],
	renderClipboardComponent:function(sender,event)
	{
		var index = event.index;
		var item = event.item;
		item.$.text.setContent("Item "+index);
		return true;
	},
	menuTap:function(sender,event)
	{
	},
});
