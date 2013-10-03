var serial = function(options){

	if(options === undefined || options === null){
		console.error("You need to pass an options objects");
		return false;
	}

	console.log("Started " + Date.now()*1000 );

	if(options.serialPort !== undefined && options.serialPort !== null){
		serial.prototype.options.serialPort = options.serialPort;
	}

	if(options.baudRate !== undefined && options.baudRate !== null){
		serial.prototype.options.baudRate = options.baudRate;
	}

	if(options.parser !== undefined && options.parser !== null){
		serial.prototype.options.parser = options.parser;
	}

	if(options.connectImmediately !== undefined && options.connectImmediately !== null){

		if(options.connectImmediately){
			serial.prototype.connect();
		}

	}

};

serial.prototype.buffer = "";

serial.prototype.options = {
	serialPort : undefined,
	baudRate : 9600,
	parser : "\n",
	readLength : 1,
	connectionId : undefined
}

serial.prototype.ab2str = function(buf) {

	return String.fromCharCode.apply(null, new Uint8Array(buf));

}

serial.prototype.str2ab = function(str) {

	var buf = new ArrayBuffer(str.length); // 2 bytes for each char
	var bufView = new Uint8Array(buf);

	for (var i=0, strLen=str.length; i<strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}

	return buf;

}

serial.prototype.write = function(string){

	buffer = serial.prototype.str2ab(string + serial.prototype.options.parser);

	chrome.serial.write(serial.prototype.options.connectionId, buffer, function(res){
		console.log(res);
	});

}

serial.prototype.read = function(info){

		// console.log(info);

		var uint8View = serial.prototype.ab2str(new Uint8Array(info.data));

		if(uint8View !== serial.prototype.options.parser){
			
			serial.prototype.buffer += uint8View;

		} else {

			console.log(serial.prototype.buffer);

			window.dispatchEvent(new CustomEvent('serial', { 'detail': serial.prototype.buffer}));

			serial.prototype.buffer = "";

		}

	chrome.serial.read(serial.prototype.options.connectionId, serial.prototype.options.readLength, serial.prototype.read);

}

serial.prototype.flush = function(){
	chrome.serial.flush(serial.prototype.options.connectionId, function(){
		console.log("Flushed");
	})
}

serial.prototype.connect = function(){

	chrome.serial.open(serial.prototype.options.serialPort, {
	
		bitrate : serial.prototype.options.baudRate,
	
	}, function(result){
		console.log("Connected to " + serial.prototype.options.serialPort + " @ " + serial.prototype.options.baudRate);
		serial.prototype.options.connectionId = result.connectionId
		chrome.serial.read(serial.prototype.options.connectionId, serial.prototype.options.readLength, serial.prototype.read);

	});
}