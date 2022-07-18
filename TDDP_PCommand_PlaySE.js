//=============================================================================
// TDDP_PCommand_PlaySE.js
// Version: 1.0.0
//=============================================================================
var Imported = Imported || {};
Imported.TDDP_PCommand_PlaySE = "1.0.0";
//=============================================================================
/*:
 * @plugindesc 1.0.0 Adds the PlaySE Plugin Command. Lets you play SE's with randomized pitch and volume from a range. See Help.
 *
 * @author Tor Damian Design / Galenmereth
 *
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Information
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * TDDP - MouseSystem is a collection of methods for modifying mouse-based
 * interaction in your games. You can set custom mouse cursors, show icons beside
 * the mouse when hovering over events, activate events by mouse, and more.
 *
 * For updates and easy to use documentation, please go to the plugin's website:
 * http://mvplugins.tordamian.com/?p=64
 *
 * There you can also download a PDF of the documentation for offline use, and
 * having the documentation in one cleanly presented place means you can always
 * be sure it's the most recent available.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This plugin is free for both non-commercial and commercial use.
 *
 * MIT License
 *
 * Copyright (c) 2019 Tor Damian Design
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function(){
    //=============================================================================
    // Game_Interpreter - register plugin commands
    //=============================================================================
    var Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Game_Interpreter_pluginCommand.call(this, command, args)
        if (command === 'PlaySE') _playSE(args);
    };

    function _playSE(args) {
        var settings = _setArgs(args);
        AudioManager.playStaticSe({
            "name": settings.name,
            "pan": settings.pan,
            "pitch": settings.pitch,
            "volume": settings.volume,
        });
    };

    function _setArgs(args) {
        var name   = args[0];
        var volume = eval(args[1]) || 100;
        var pitch  = eval(args[2]) || 100;
        var pan    = eval(args[3]) || 0;
        if(volume instanceof Array) {
            volume = getRandomRange(volume[0], volume[1]);
        }
        if(pitch instanceof Array) {
            pitch = getRandomRange(pitch[0], pitch[1]);
        }
        if(pan instanceof Array) {
            pan = getRandomRange(pan[0], pan[1]);
        }
        var settings = {
            name: name,
            volume: volume,
            pan: pan,
            pitch: pitch
        }
        return settings;
    }

    function getRandomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
})();
