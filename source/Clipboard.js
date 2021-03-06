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
	},
	handlers:{
		onClearAll:"clearAll",
	},
	components:[
		{kind:"FittableRows", style:"width:100%", components:[
			{kind:enyo.Scroller, fit:true, components:[
				{name:"clipboardRepeater", kind:enyo.Repeater, onSetupItem:"renderClipboardComponent", components:[
					{name:"row", kind:onyx.Item, components:[
						{kind:"FittableColumns", ontap:"copy", classes:"vertically-centered", components:[
							{name:"visitUrlButton", kind:onyx.Button, content:$L("Go"), showing:false, ontap:"visitUrlTap"},
							{name:"text", allowHtml:true, classes:"clipboard-text", fit:true},
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
		var sanitize = function(string)
		{
			var getClean = function(c)
			{
				return {
					'<':'&lt;',
					'>':'&gt;',
					'&':'&amp;',
				}[c]
			}
			return string.replace(/[<>&]/g,getClean);
		}
		var index = event.index;
		var item = event.item;
		var text = sanitize(this.getItems()[index]);
		if(enyo.webOS.runTextIndexer)
		{
			item.$.text.setContent(enyo.webOS.runTextIndexer(text,{phoneNumber:true,emailAddress:true,webLink:true,schemalessWebLink:true,emoticon:false}));
		}
		else
		{
			item.$.text.setContent(text);
			if(this.getIsLink(text))
				item.$.visitUrlButton.show();
		}
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
		var gotClipboard = function(items)
		{
			if(items)
			{
				if(Ubiquity.Settings.openLinksAutomatically)
					if(!this.getInitialLoad() && items.length - 1 == this.getItems().length)
						if(this.getIsLink(items[0]))
							this.visitUrl(items[0]);
				this.setItems(items);
			}
			else
				this.setItems(new Array());

			this.setInitialLoad(false);
		}
		Ubiquity.backend.loadClipboard(gotClipboard.bind(this));
	},
	deleteItem:function(sender,event)
	{
		var items = this.getItems();
		items.splice(event.index,1);
		Ubiquity.backend.setClipboard(items);

		this.$.clipboardRepeater.getComponents()[event.index].$.row.addClass("fadeout");
	},
	copy:function(sender,event)
	{
		//TODO: how can I identify this element by name?
		var textItem = sender.node.getElementsByClassName('clipboard-text')[0];
		sender.addClass("enyo-selectable");
		if(document.selection)
		{
			var range = document.body.createTextRange();
			range.moveToElementText(textItem);
			range.select();
		}
		else
		{
			if(window.getSelection)
			{
				var range = document.createRange();
				range.selectNode(textItem);
				window.getSelection().addRange(range);
			}
		}
		if(enyo.webOS.addBannerMessage)
		{
			enyo.webOS.addBannerMessage("Selection Copied","{}" );
			document.execCommand("copy");
			sender.removeClass("enyo-selectable");
		}
	},
	paste:function()
	{
		if(this.$.input.getValue().length)
		{
			this.items.unshift(this.$.input.getValue());
			this.$.input.setValue("");
			this.focusInput();
			Ubiquity.backend.addToClipboard(this.getItems());
			this.itemsChanged();
		}
	},
	clearInput:function()
	{
		this.$.input.setValue("");
	},
	clearAll:function()
	{
		this.setItems([]);
		Ubiquity.backend.setClipboard(this.getItems());
		this.itemsChanged();
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
		//document.execCommand("copy");
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
