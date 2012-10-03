enyo.kind({
	name:"Ubiquity.Clipboard",
	kind:"FittableRows",
	classes:"onyx",
	fit:true,
	published:{
		items:new Array(),
	},
	events:{
		onShowSettings:"",
	},
	components:[
		{kind:enyo.Scroller, classes:"recessed", touch:true, fit:true, components:[
			{name:"clipboardRepeater", kind:enyo.Repeater, onSetupItem:"renderClipboardComponent", components:[
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
		{kind:"onyx.MoreToolbar", components:[
			{kind:"onyx.InputDecorator", components:[
				{kind:"onyx.Input"},
			]},
			{kind:"onyx.Button", content:"Paste", classes:"onyx-affirmative"},
			{kind:"onyx.Button", content:"Refresh", ontap:"load"},
			{kind:"onyx.Button", content:"Settings", ontap:"doShowSettings"},
		]}
	],
	create:function()
	{
		this.inherited(arguments);
		THIS = this;
	},
	renderClipboardComponent:function(sender,event)
	{
		var index = event.index;
		var item = event.item;
		item.$.text.setContent(this.getItems()[index]);
		return true;
	},
	menuTap:function(sender,event)
	{
	},
	load:function() // render
	{
		var gotClipboard = function(cb)
		{
			var newItems = cb.storage.replace(/\\\\/g,"\\").replace(/\\\"/g,"\"");
			this.setItems(enyo.json.parse(newItems));
		}
		villo.storage.get({privacy:true,title:"clipboard",callback:gotClipboard.bind(this)});
	},
	itemsChanged:function()
	{
		var items = this.getItems();
		this.$.clipboardRepeater.setCount(items.length);
	},
});
