enyo.kind({
	name:"Ubiquity.Backend.Villo",
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
});
