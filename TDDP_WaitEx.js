var Imported = Imported || {};
Imported.TDDP_WaitEx = "1.0.1";

/*:
@author Tor Damian Design / Galenmereth
@plugindesc 1.0.1 Use minutes, seconds, milliseconds and variables, alone or combined, for Wait events using a simple Plugin Command syntax.
@help
How it works
------------------------------------------------------------------------------
In a PluginCommand, simply type the plugin command key (default is "Wait") and
then any combination of time units. They will all be converted and added
together automatically. Example:

PluginCommand: Wait 2m 30s

This would cause a Wait command of 2 minutes (7,200 frames) plus 30 seconds
(1,800 frames) for a Wait event of 9,000 frames total.

You can combine time units however many times and in whatever order you want.
The following is valid, even if impractical:

PluginCommand: Wait 15s 1m 2m

You can use variables with any of the time units:

PluginCommand: Wait v5m v6s 30f

This would wait variable 5's value in minutes, variable 6's value in
seconds, and 30 frames.

There are alternative aliases for the time units (see below) if you want more
verbosity. For example:

Plugin Command: Wait 1minute 25seconds

Frames is the default value, so if you simply want to wait for a variable's
amount of frames, you can write this:

Plugin Command: Wait v1

Available units of time
------------------------------------------------------------------------------
Unit         | Valid keys       | Example usage
- - - - - - -|- - - - - - - - - | - - - - - - - - - - - - - - - - - - - - - - 
Frames       | f, frames, blank | 5f, 5frames, 5
Minutes      | m, min, minutes  | 2m, 2min, 2minutes
Seconds      | s, sec, seconds  | 8s, 8sec, 8seconds
Milliseconds | ms, milliseconds | 300ms, 300milliseconds

Note: Keep in mind that ~16 milliseconds will pass for each internal "tick"
in MV's engine, so wait times that aren't multiples of 16 when using milliseconds
will not be entirely precise.


Changelog
------------------------------------------------------------------------------
Date       | Version | Description
- - - - - -|- - - - -|- - - - - - - - - - - - - - - - - - - - - - - - - - - - 
04/05/2019 | 1.0.1   | Add support for no time unit, defaulting to frames


License
------------------------------------------------------------------------------
In short: Completely free, including for commercial use. Please consider
donating for further development of plugins and other material if you find
this plugin useful. See https://mvplugins.tordamian.com

MIT License

Copyright (c) 2019 Tor Damian Design

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@param pluginCommand
@text Plugin Command key
@desc The Plugin Command keyword to use. Default is "Wait", but you can change this if you need to.
@type string
@default Wait

*/

/**
 * @namespace TDDP_WaitEx
 */
var TDDP_WaitEx = {};

(function($) {
	"use strict";
	//=============================================================================
	// Set up internal helper methods
	//=============================================================================
	/**
	 * Convert units (minutes, seconds, frames and milliseconds) to frames
	 * @param {string} unit Type of unit
	 * @param {Number} num Number to convert
	 * @return {Number}
	 */
	function convertUnitToFrames(unit, num) {
		switch (unit) {
			case "m":
			case "min":
			case "minutes":
				return num * 60 * 60;
			
			case "s":
			case "sec":
			case "seconds":
				return num * 60;

			case "f":
			case "frames":
				return num;

			case "ms":
			case "milliseconds":
				return num / 16.666666666666668;
			
			default:
				return num;
		}
	}

	/**
	 * Parse an array of Plugin Command arguments.
	 * Format: (v?)(num)(unit)
	 * @param {str[]} args 
	 * @return {Number} frames total
	 */
	function parseArgsToFrames(args) {
		var framesTotal = 0;
		var regex = /(v?)(\d+)(\D*)/i;

		args.forEach(function(str) {
			var match = regex.exec(str);

			if (match) {
				var dynamicKey = match[1];
				var num = Number(match[2]);
				var unit = match[3];

				if (dynamicKey && dynamicKey.toLocaleLowerCase() == "v") {
					num = $gameVariables.value(num);
				}

				framesTotal += convertUnitToFrames(unit, num);
			}
		});

		return framesTotal;
	}

	/**
	 * Handle Plugin Command
	 * @param {string[]} args 
	 */
	function handleCommand(args) {
		var waitTimeInFrames = parseArgsToFrames(args);

		this.wait(waitTimeInFrames);
	}

	//=============================================================================
	// Parse parameters
	//=============================================================================
	$.pluginCommand = PluginManager.parameters("TDDP_WaitEx").pluginCommand;

	//=============================================================================
	// Set up general variables
	//=============================================================================
	var origin = {};
	//=============================================================================
	// Game_Interpreter - register plugin command
	//=============================================================================
	origin.Game_Interpreter = {};
	origin.Game_Interpreter.prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;

	/**
	 * @param {string} command
	 * @param {string[]} args
	 */
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		origin.Game_Interpreter.prototype_pluginCommand.call(this, command, args);

		if (command === $.pluginCommand) handleCommand.call(this, args);
	}
})(TDDP_WaitEx)