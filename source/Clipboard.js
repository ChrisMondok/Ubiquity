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
		initialLoad:true,
	},
	events:{
		onShowSettings:"",
		onLocalChangeMade:"",
	},
	components:[
		{kind:"FittableRows", style:"width:100%", components:[
			{kind:enyo.Scroller, classes:"recessed", fit:true, components:[
				{name:"clipboardRepeater", kind:enyo.Repeater, onSetupItem:"renderClipboardComponent", components:[
					{name:"row", kind:onyx.Item, components:[
						{kind:"FittableColumns", components:[
							{name:"text", classes:"enyo-selectable", fit:true},
							{name:"visitUrlButton", kind:onyx.Button, content:"Go", showing:false, ontap:"visitUrlTap", classes:"onyx-affirmative"},
							{name:"deleteButton", kind:onyx.Button, content:"Delete", ontap:"deleteItem", classes:"onyx-negative"},
						]},
					]},
				]},
			]},
			{kind:"FittableColumns", classes:"onyx-toolbar onyx-toolbar-inline", components:[
				{kind:"onyx.InputDecorator", fit:true, components:[
					{name:"input", kind:"onyx.Input", style:""},
				]},
				{kind:"onyx.Button", content:"Paste", classes:"onyx-affirmative", ontap:"paste"},
				{kind:"onyx.Button", content:"Refresh", ontap:"load"},
				{kind:"onyx.Button", content:"Settings", ontap:"doShowSettings"},
			]},
		]},
		{kind:"FittableRows", classes:"onyx", components:[
			{name:"WebView", kind:"enyo.WebView", style:"width:100%", fit:true, src:"about:blank"},
			{kind:"onyx.Toolbar", components:[
				{kind:"onyx.Grabber", ontap:"hideWebView"},
				{kind:"onyx.IconButton", src:"assets/icon-back.png"},
				{kind:"onyx.IconButton", src:"assets/icon-forward.png"},
				{kind:"onyx.IconButton", src:"assets/icon-popout.png", ontap:"popoutTapped"},
			]},
		]},
	],
	create:function()
	{
		this.inherited(arguments);
		clipboard = this;
	},
	rendered:function()
	{
		this.inherited(arguments);
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
			var parsed;
			if(cb.storage)
			{
				var unparsed = unescape(cb.storage);
				parsed = enyo.json.parse(unparsed);
				if(Ubiquity.Settings.openLinksAutomatically)
					if(!this.getInitialLoad() && parsed.length - 1 == this.getItems().length)
						if(this.getIsLink(parsed[0]))
							this.visitUrl(parsed[0]);
			}
			if(parsed)
			{
				this.setItems(parsed);
				console.log("Set items");
			}
			else
			{
				console.log("Empty items");
				this.setItems(new Array());
			}
			this.setInitialLoad(false);
		}
		villo.storage.get({privacy:true,title:"clipboard",callback:gotClipboard.bind(this)});
	},
	deleteItem:function(sender,event)
	{
		var items = this.getItems();
		items.splice(event.index,1);
		villo.storage.set({privacy:true,title:"clipboard",data:escape(enyo.json.stringify(items))});
		this.commitItems();
	},
	paste:function()
	{
		this.items.unshift(this.$.input.getValue());
		this.$.input.setValue("");
		this.focusInput();
		villo.storage.set({privacy:true,title:"clipboard",data:escape(enyo.json.stringify(this.getItems()))});
		this.commitItems();
	},
	commitItems:function()
	{
		this.doLocalChangeMade();
	},
	itemsChanged:function()
	{
		var items = this.getItems();
		this.$.clipboardRepeater.setCount(items.length);
	},
	visitUrlTap:function(sender,event)
	{
		var URL = this.getItems()[event.index];
		this.visitUrl(URL);
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
	visitUrl:function(URL)
	{
		if(Ubiquity.Settings.openLinksInSharedWindow)
		{
			this.$.WebView.setSrc(URL);
			this.setIndex(1);
			this.setDraggable(true);
		}
		else
			window.open(URL);
	},
	hideWebView:function()
	{
		this.setIndex(0);
	},
	indexChanged:function()
	{
		this.inherited(arguments);
		if(this.getIndex() == 0)
		{
			this.setDraggable(false);
			if(Ubiquity.Settings.clearWebViewOnHide)
				this.$.WebView.setSrc("about:blank");
		}
	},
	popoutTapped:function()
	{
		window.open(this.$.WebView.getSrc());
	},
	focusInput:function()
	{
		this.$.input.focus();
	}
});
