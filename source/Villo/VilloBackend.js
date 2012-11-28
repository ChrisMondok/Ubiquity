enyo.kind({
	name:"Ubiquity.Backend.Villo",
	events:{
		onGotChanges:"",
	},
	init:function()
	{
		villo.load({
			id:"com.chrismondok.ubiquity",
			version:"2.0.0",
			developer:"Chris Mondok",
			type:"mobile",
			title:"Ubiquity",
			push:true
		});
	},
	isLoggedIn:function()
	{
		return villo.user.isLoggedIn();
	},
	getUsername:function()
	{
		return villo.user.username;
	},
	login:function(username, password, callback)
	{
		villo.user.login(
			{
				username:username,
				password:password
			},
			callback.bind(this)
		);
	},
	isSubscribed:function()
	{
		return villo.chat.isSubscribed(this.getUsername());
	},
	subscribe:function()
	{
		var gotMessage = function(response)
		{
			var newItem;
			if(response.message.newItem && response.message.id != Ubiquity.ID)
				newItem = unescape(response.message.newItem);
			this.doGotChanges({newItem:newItem});
		}

		villo.chat.join({room:this.getUsername(),callback:gotMessage.bind(this),presence: {enabled:false}})
	},
	unsubscribe:function()
	{
		villo.chat.leave(this.getUsername());
	},
	logout:function()
	{
		villo.user.logout();
	},
	loadClipboard:function(callback)
	{
		var clipboardLoaded = function(response)
		{
			var parsed;

			if(response.storage)
				parsed = enyo.json.parse(unescape(response.storage));

			callback(parsed);
		}
		villo.storage.get({privacy:true,title:"clipboard",callback:clipboardLoaded});
	},
	setClipboard:function(clipboardData)
	{
		villo.storage.set({
			privacy:true,
			title:"clipboard",
			data:escape(enyo.json.stringify(clipboardData))
		});
		this.sendMessage();
	},
	//This will diverge when we handle message sending locally.
	addToClipboard:function(clipboardData)
	{
		villo.storage.set({
			privacy:true,
			title:"clipboard",
			data:escape(enyo.json.stringify(clipboardData))
		});
		this.sendNewItemMessage(clipboardData[0]);
	},
	sendMessage:function()
	{
		villo.chat.send({room:villo.user.username,message:{"id":Ubiquity.ID}});
	},
	sendNewItemMessage:function(newItem)
	{
		villo.chat.send({room:villo.user.username,message:{
			"id":Ubiquity.ID,
			"newItem":escape(newItem)
		}});
	}
});
