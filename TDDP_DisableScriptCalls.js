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
 * http://mvplugins.tordamian.com/plugins/minis/disable-script-calls/
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Changelog:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * • 1.0.0  Stable initial release.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This plugin is free for both non-commercial and commercial use. Please see
 * http://mvplugins.tordamian.com/terms-of-use for the full terms of use.
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
