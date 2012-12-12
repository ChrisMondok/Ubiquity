enyo.kind({
	name:"Ubiquity.Backend.Node",
	published:{
		token:undefined,
		socket:null,
		host:"ws://spire:1337",
		queue:null,
	},
	events:{
		onGotClipboard:"",
		onLoginComplete:"",
		onLogoutComplete:"",
		onConnected:"",
		onDisconnected:"",
	},
	handlers:{
		onConnected:"sendQueue",
	},
	create:function()
	{
		this.inherited(arguments)
		this.setQueue(new Array());
	},
	gotMessage:function(message)
	{
		var data = JSON.parse(message.data)

		if(data.token)
			this.setToken(data.token);

		if(data.clipboard)
			this.doGotClipboard({clipboard:data.clipboard});

		if(data.message)
			alert(data.message);

		console.log(data);
	},
	sendObject:function(object)
	{
		var token = this.getToken();

		if(token)
			object.token = token;

		if(this.getSocket())
			this.getSocket().send(JSON.stringify(object));
		else
			this.getQueue().push(JSON.stringify(object));
	},
	init:function()
	{
		this.setupSocket()
	},
	isLoggedIn:function()
	{
		return this.getToken() && true;
	},
	getUsername:function()
	{
		throw("getUsername not implemented");
	},
	login:function(username, password)
	{
		var message = {
			function:"login",
			username:username,
			password:password
		};
		this.sendObject(message);
	},
	isSubscribed:function()
	{
		console.log("IsSubscribed: "+(this.getSocket() && true));
		return this.getSocket() && true;
	},
	subscribe:function()
	{
		this.setupSocket();
	},
	unsubscribe:function()
	{
		this.closeSocket();
	},
	logout:function()
	{
		throw("logout not implemented");
	},
	loadClipboard:function()
	{
		this.sendObject({function:"getClipboard"});
	},
	setClipboard:function(clipboardData)
	{
		throw("setClipboard not implemented");
	},
	addToClipboard:function(item)
	{
		this.sendObject({function:"addItem", newItem:item});
	},

	setupSocket:function()
	{
		console.log("Connecting websocket");
		var socket = new WebSocket(this.getHost());

		//socket.onopen = this.sendQueue.bind(this); //socket isn't ready yet? The docs say that it will be.

		socket.onclose = function(){
			this.setSocket(undefined);
		}.bind(this);

		socket.onmessage = this.gotMessage.bind(this);

		this.setSocket(socket);
	},
	closeSocket:function()
	{
		this.getSocket().close();
	},

	sendQueue:function()
	{
		var queue = this.getQueue();
		var socket = this.getSocket();

		while(queue.length)
			socket.send(queue.pop());
	},

	tokenChanged:function()
	{
		if(this.getToken())
		{
			localStorage.setItem("token",this.getToken());
			this.doLoginComplete();
			this.loadClipboard();
		}
		else
		{
			localStorage.removeItem("token");
			this.doLogoutComplete();
		}
	},
	socketChanged:function()
	{
		if(this.getSocket())
			this.doConnected();
		else
			this.doDisconnected();
	}
});
