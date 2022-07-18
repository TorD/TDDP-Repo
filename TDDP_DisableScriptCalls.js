//=============================================================================
// TDDP_DisableScriptCalls
// Version: 1.0.0
//=============================================================================
/*:
 * @plugindesc 1.0.0 Disables all Script calls in your game's events by default.
 * @author Tor Damian Design / Galenmereth
 *
 * @param Force Code
 * @desc If you write this code anywhere in your Script calls, the Script call will be called like normal.
 * @default FORCE!
 *
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Information
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * TDDP_DisableScriptCalls is a tiny script that disables all the Script calls
 * in your events. An optional Force Code parameter can be configured to allow
 * individual Script calls to still be called. Useful for debugging / testing.
 *
 * For updates and easy to use documentation, please go to the plugin's website:
 * http://mvplugins.tordamian.com/?p=290
 *
 * There you can also download a PDF of the documentation for offline use, and
 * having the documentation in one cleanly presented place means you can always
 * be sure it's the most recent available.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * In short: Completely free, including for commercial use.
 * A big thank you to Degica for making this plugin free for commercial use for
 * everyone!
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
var TDDP_DisableScriptCalls = {};
(function() {
    "use strict";
    var parameters = PluginManager.parameters('TDDP_DisableScriptCalls');
    TDDP_DisableScriptCalls.forceValue = String(parameters['Force Code']);
    Game_Interpreter.prototype.command355 = function() {
        // This is the normal functionality of command355
        var script = this.currentCommand().parameters[0] + '\n';
        while (this.nextEventCode() === 655) {
            this._index++;
            script += this.currentCommand().parameters[0] + '\n';
        }
        // We now check if the force code is found; if not we ignore
        var result = script.match(TDDP_DisableScriptCalls.forceValue);
        if (result !== null) {
            script = script.replace(TDDP_DisableScriptCalls.forceValue);
            eval(script);
        }
        return true;
    };
})();
