#Chrome App Serial Data Library

#####A simple Js library that makes serial communication within a packaged Chrome/Chromebook app a little easier.

This library was written as part of our ongoing 3D printer project, This is the serial library we're using to get Chrome talking to our printer but it can be used for anything that relies on serial data for communication like An Arduino, for example.

###Usage

First, we need to include the library in our HTML page for our Chrome App.

```HTML
<script src="serial.js"></script>
```

Once that's loaded, we want to initialise the library. We do this by calling the constructor and passing through the settings we'll need to make a connection.

```Javascript
var device = new serial({serialPort : "/dev.tty-something", baudRate : 19200, parser : "\n", connectImmediately : true})
```

The above code is the minimum for making a connection. The parser can be any UTF character you're expecting to symbolise the end of a communication - typically, this will be a newline ("\n") or a return carriage ("\r"). If connectImmediately is included and is true, as soon as the variables have been set, the specified port will be opened and will immediately being listening for data. If connectImmediately is false, you can open the port and start listening with `device.connect()`.

When enough information is recieved, an event will be dispatched to the window object that we can listen for and will contain the the data...

```Javascript
window.addEventListener('serial', function(e){console.log(e.details), false})
```

Once we have that in place, we can begin reading and writing data...

```Javascript
var device = new serial({serialPort : "/dev.tty-something", baudRate : 19200, parser : "\n"});
window.addEventListener('serial', function(){
	console.log(e.details); //"World" - Assuming your device will write world when recieving "Hello"
}, false);

device.write("Hello");
```

###Methods

####connect()
Will connect to the device specified set when calling the constructor 'new serial({options})'

#####Possible options
Mandatory
+ serialPort : "The port to connect to the device with"

Optional
+ baudRate : INT - If not passed, the default Baud rate will be 9600
+ parser : "\n || \r etc." - If not passed "\n" is default
+ connectImmediately : true/false - If false, you can connect with the `connect()` method.

####write(string/int/float/array)
Writes the data passed to it to the connected device

####flush()
Will clear any bytes in the ports I/O buffers.

####close()
Close the current connection.


