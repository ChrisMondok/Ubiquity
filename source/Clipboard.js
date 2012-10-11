enyo.kind({
	name:"Ubiquity.Clipboard",
	kind:"Panels",
	arrangerKind:"CollapsingArranger",
	classes:"onyx",
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
		onNewItemAdded:""
	},
	handlers:{
		onClearAll:"clearAll",
	},
	components:[
		{kind:"FittableRows", style:"width:100%", components:[
			{kind:enyo.Scroller, fit:true, components:[
				{name:"clipboardRepeater", kind:enyo.Repeater, onSetupItem:"renderClipboardComponent", components:[
					{name:"row", kind:onyx.Item, components:[
						{kind:"FittableColumns", classes:"vertically-centered", components:[
							{name:"visitUrlButton", kind:onyx.Button, content:$L("Go"), showing:false, ontap:"visitUrlTap"},
							{name:"text", classes:"enyo-selectable clipboard-text", fit:true},
							{name:"deleteButton", kind:onyx.Button, content:$L("Delete"), ontap:"deleteItem", classes:"onyx-negative"},
						]},
					]},
				]},
			]},
			{kind:"onyx.MoreToolbar", components:[
				{kind:"onyx.InputDecorator", style:"min-width:16ex;", fit:true, components:[
					{name:"input", kind:"onyx.Input", style:"width:100%", onkeypress:"handleKeyPress"},
					//{kind:"onyx.IconButton", style:"margin:-1ex 0ex", ontap:"clearInput", src:"assets/clear.png"},
				]},
				{kind:"onyx.Button", content:$L("Paste"), classes:"onyx-affirmative", ontap:"paste"},
				{kind:"onyx.Button", content:$L("Refresh"), ontap:"load"},
				{kind:"onyx.Button", content:$L("Settings"), ontap:"doShowSettings"},
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
				this.setItems(parsed);
			else
				this.setItems(new Array());
			this.setInitialLoad(false);
		}
		villo.storage.get({privacy:true,title:"clipboard",callback:gotClipboard.bind(this)});
	},
	deleteItem:function(sender,event)
	{
		var items = this.getItems();
		items.splice(event.index,1);
		villo.storage.set({privacy:true,title:"clipboard",data:escape(enyo.json.stringify(items))});
		this.doLocalChangeMade();

		this.$.clipboardRepeater.getComponents()[event.index].$.row.addClass("fadeout");
	},
	paste:function()
	{
		this.items.unshift(this.$.input.getValue());
		this.$.input.setValue("");
		this.focusInput();
		villo.storage.set({privacy:true,title:"clipboard",data:escape(enyo.json.stringify(this.getItems()))});
		this.itemsChanged();
		this.doNewItemAdded();
	},
	clearInput:function()
	{
		this.$.input.setValue("");
	},
	clearAll:function()
	{
		this.setItems([]);
		villo.storage.set({privacy:true,title:"clipboard",data:escape(enyo.json.stringify(this.getItems()))});
		this.itemsChanged();
		this.doLocalChangeMade();
	},
	addTransientItem:function(input)
	{
		this.items.unshift(input);
		this.itemsChanged();
		this.indicateNew();
	},
	indicateNew:function()
	{
		var newestComponent = this.$.clipboardRepeater.getComponents()[0];
		newestComponent.$.row.addClass("slidein");
		/*
		 var components = this.$.clipboardRepeater.getComponents();
		for(c in components)
			components[c].$.row.addClass("slide");
		*/
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
	},
	handleKeyPress:function(sender,event)
	{
		if(event.keyCode == 13)
			this.paste();
	},
});
