enyo.kind({
	name:"Ubiquity.Clipboard",
	kind:"Panels",
	arrangerKind:"CollapsingArranger",
	fit:true,
	published:{
		items:new Array(),
		urlPattern:/^https?:\/\//,
		popupWindow:null,
		draggable:false,
	},
	events:{
		onShowSettings:"",
	},
	components:[
		{kind:"FittableRows", style:"width:100%", components:[
			{kind:enyo.Scroller, classes:"recessed", touch:true, fit:true, components:[
				{name:"clipboardRepeater", kind:enyo.Repeater, onSetupItem:"renderClipboardComponent", components:[
					{name:"row", kind:onyx.Item, components:[
						{kind:"FittableColumns", components:[
							{name:"text", classes:"enyo-selectable", fit:true},
							{name:"visitUrlButton", kind:onyx.Button, content:"Go", showing:false, ontap:"visitUrlTap", classes:"onyx-affirmative"},
							{name:"deleteButton", kind:onyx.Button, content:"Go", ontap:"deleteTap", classes:"onyx-negative"},
						]},
					]},
				]},
			]},
			{kind:"onyx.Toolbar", components:[
				{kind:"onyx.InputDecorator", components:[
					{kind:"onyx.Input"},
				]},
				{kind:"onyx.Button", content:"Paste", disabled:true, classes:"onyx-affirmative"},
				{kind:"onyx.Button", content:"Refresh", ontap:"load"},
				{kind:"onyx.Button", content:"Settings", ontap:"doShowSettings"},
			]},
		]},
		{kind:"FittableRows", classes:"onyx", components:[
			{name:"WebView", kind:"enyo.WebView", style:"width:100%", fit:true, src:"about:blank"},
			{kind:"onyx.Toolbar", components:[
				{kind:"onyx.Grabber"},
				{content:"Toolbar!"}
			]},
		]},
	],
	create:function()
	{
		this.inherited(arguments);
		clipboard = this;
	},
	renderClipboardComponent:function(sender,event)
	{
		var index = event.index;
		var item = event.item;
		var text = this.getItems()[index];
		item.$.text.setContent(text);
		if(this.getIsLink(text))
			item.$.visitUrlButton.show();
		return true;
	},
	getIsLink:function(string)
	{
		return this.getUrlPattern().test(string);
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
	visitUrlTap:function(sender,event)
	{
		var URL = this.getItems()[event.index];
		this.$.WebView.setSrc(URL);
		this.setIndex(1);
		this.setDraggable(true);
		//It's not as simple as this. Apparently, if you do a cross domain popup,
		//it's a security exception to modify it afterwards.
		//
		//if(Ubiquity.Settings.openLinksInSharedWindow && this.getPopupWindow())
		//{
		//	this.popupWindow.location.href = URL;
		//}
		//else
		//	this.setPopupWindow(window.open(URL),"ubiquityPopup");
	},
	indexChanged:function()
	{
		this.inherited(arguments);
		if(this.getIndex() == 0)
		{
			this.setDraggable(false);
			this.$.WebView.setSrc("about:blank");
		}
	}
});
