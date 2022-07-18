//=============================================================================
// TDDP_ManageDashing
//=============================================================================
/*:
 * @plugindesc 1.0.1 Lets you manage the dashing mode in your game with simple plugin options.
 * @author Tor Damian Design / Galenmereth
 *
 * @param Disable Auto-dash
 * @desc If set to true this disables touch and mouse input to cause auto-dashing behavior. Can still use dash button.
 * @default false
 *
 * @param Force Dashing
 * @desc This forces dashing to be on in the game. This wil also remove the superfluous "Always Dash" game option if true.
 * @default false
 *
 * @param Disable Dashing
 * @desc If set to true this disables dashing in the game. This will also remove the "Always Dash" game option.
 * @default false
 *
 * @param Remove Always Dash Option
 * @desc If set to true this removes the "Always Dash" option from the game's options.
 * @default false
 *
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Information
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * TDDP_ManageDashing lets you manage the dashing mode in your game with simple
 * plugin options.
 *
 * For updates and easy to use documentation, please go to the plugin's website:
 * http://mvplugins.tordamian.com/?p=292
 *
 * There you can also download a PDF of the documentation for offline use, and
 * having the documentation in one cleanly presented place means you can always
 * be sure it's the most recent available.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This plugin is free for both non-commercial and commercial use. Please see
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
 var Imported = Imported || {};
 Imported.TDDP_ManageDashing = "1.0.1";

 var TDDP_ManageDashing = {};
 (function($) {
    "use strict";

    $.pluginParameters = PluginManager.parameters('TDDP_ManageDashing');
    $.disableAutoDash  = Boolean($.pluginParameters['Disable Auto-dash'] === 'true' || false);
    $.disableDashing   = Boolean($.pluginParameters['Disable Dashing'] === 'true' || false);
    $.forceDashing     = Boolean($.pluginParameters['Force Dashing'] === 'true' || false);
    $.removeDashOption = Boolean($.pluginParameters['Remove Always Dash Option'] === 'true' || false);

    /**
    * Whether Always Dash option should be shown
    */
    $.showDashOption = function() {
        if (this.forceDashing || this.disableDashing || this.removeDashOption) return false;
        return true;
    }
    /**
    * Extended check for dashing based on plugin parameters
    */
    $.dashing = function(gamePlayer) {
        if (this.forceDashing) return true;
        if (this.disableDashing) return false;
        if (this.disableAutoDash) {
            return gamePlayer.isDashButtonPressed();
        } else {
            // Default behavior
            return ( gamePlayer.isDashButtonPressed() || $gameTemp.isDestinationValid() );
        }
    }
    ///////////////////////////////////////////////////////////////////////////////
    // Window_Options modifications                                              //
    ///////////////////////////////////////////////////////////////////////////////
    /**
    * Add check to see if Dash option should be removed
    */
    Window_Options.prototype.addGeneralOptions = function() {
        if ($.showDashOption()) this.addCommand(TextManager.alwaysDash, 'alwaysDash');
        this.addCommand(TextManager.commandRemember, 'commandRemember');
    };
    ///////////////////////////////////////////////////////////////////////////////
    // Game_Player modifications                                                 //
    ///////////////////////////////////////////////////////////////////////////////
    /**
    * Alter functionality so that touch input doesn't force auto dash
    */
    Game_Player.prototype.updateDashing = function() {
        if (this.isMoving()) {
            return;
        }
        if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
            this._dashing = $.dashing(this);
        } else {
            this._dashing = false;
        }
    };
    /**
    * Extend with a check to see if the Always Dash option is available
    */
    Game_Player.prototype.isDashButtonPressed = function() {
        var shift = Input.isPressed('shift');
        // If Dash option is removed, don't respect Always Dash option settings.
        if (ConfigManager.alwaysDash && $.showDashOption()) {
            return !shift;
        } else {
            return shift;
        }
    };
})(TDDP_ManageDashing);
