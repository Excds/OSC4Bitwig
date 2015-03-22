// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

loadAPI (1);
load ("framework/helper/ClassLoader.js");
load ("framework/daw/ClassLoader.js");
load ("osc/ClassLoader.js");
load ("Config.js");

host.defineController ("Open Sound Control", "OSC", "2.00", "94DD41B0-EFEE-11E3-AC10-0800200C9A66", "Jürgen Moßgraber");
host.defineMidiPorts (1, 0);

var model = null;
var parser = null;
var writer = null;

String.prototype.getBytes = function ()
{
	var bytes = [];
	for (var i = 0; i < this.length; i++)
		bytes.push (this.charCodeAt(i));
	return bytes;
};

function init ()
{
    Config.init ();

    var scales = new Scales (0, 128, 128, 1);
    scales.setChromatic (true);
	model = new Model (70, scales, 8, 8, 8);

	parser = new OSCParser (model, Config.receiveHost, Config.receivePort);
    writer = new OSCWriter (model, Config.sendHost, Config.sendPort);

    scheduleTask (function ()
    {
        writer.flush (true);
    }, null, 1000);

	println ("Initialized.");
}

function exit ()
{
}

function flush ()
{
    writer.flush ();
}
