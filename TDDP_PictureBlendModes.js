//=============================================================================
// TDDP_PictureBlendModes.js
// Version: 1.0.2
//=============================================================================
var Imported = Imported || {};
Imported.TDDP_PictureBlendModes = "1.0.2";

var TDDP = TDDP || {};
TDDP.PictureBlendModes = "1.0.2";
//=============================================================================
/*:
 * @plugindesc 1.0.2 Fix for Additive blend, and Plugin Command for setting more blend modes on pictures. See Help for use.
 *
 * @param Additive fix
 * @desc If set to true this will change the Additive blend mode to be stronger and like the one seen in VX Ace and earlier.
 * @default false
 *
 * @author Tor Damian Design / Galenmereth
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Introduction & Table of contents
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * This plugin adds a simple Plugin Command that youc an use to set the blend
 * mode of a picture number shown using the Show Picture event command.
 *
 * Table of contents
 * -----------------
 * • Plugin Command
 *      • SetPictureBlendMode picture_number blend_mode
 * • Available Blend Modes
 *      • Normal
 *      • Add
 *      • Multiply
 *      • Screen
 * • Installation & Compatibility
 * • Changelog
 * • Terms & Conditions
 *
 * ============================================================================
 * Plugin Command
 * ============================================================================
 * There is only one plugin command:
 * 
 * 
 * SetPictureBlendMode picture_number blend_mode
 * ----------------------------------------------------------------------------
 * Set the given picture number to have the given blend mode string.
 * Example of use:
 *
 *      SetPictureBlendMode 5 Overlay
 *
 * Note that the blend mode can be written any way you want, lowercase or
 * uppercase or capitalized are all ok.
 *
 * ============================================================================
 * Available Blend Modes
 * ============================================================================
 * There are only four available blend modes in WebGL at this time. They are
 *
 * 
 * Normal
 * ----------------------------------------------------------------------------
 * No blending, default.
 *
 * 
 * Add
 * ----------------------------------------------------------------------------
 * The blend mode also available in the Show Picture dialogue. This blend mode
 * simply adds pixel values of one layer with the other, resulting in a
 * brighter picture.
 *
 * 
 * Multiply
 * ----------------------------------------------------------------------------
 * Multiply blend mode multiplies the numbers for each pixel of the picture
 * with the corresponding pixel for the pixels below it.
 * The result is a darker picture.
 *
 * 
 * Screen
 * ----------------------------------------------------------------------------
 * With Screen blend mode the values of the pixels in the two layers are
 * inverted, multiplied, and then inverted again. This yields the opposite
 * effect to multiply. The result is a brighter picture.
 *
 * ============================================================================
 * Installation & Compatibility
 * ============================================================================
 * This plugin can be placed anywhere in your plugin list and should be
 * compatible with most plugins.
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Changelog:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * • 1.0.2  Added "Additive fix" option to improve the Additive blend mode
 * • 1.0.1  Added support for experimental reverse "darken" blend
 * • 1.0.0  Stable initial release.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * http://creativecommons.org/licenses/by/4.0/
 * 
 * You are free to:
 * ----------------
 * • Share — copy and redistribute the material in any medium or format
 * • Adapt — remix, transform, and build upon the material
 *
 * for any purpose, even commercially.
 * 
 * The licensor cannot revoke these freedoms as long as you follow the license
 * terms.
 *
 * Under the following terms:
 * --------------------------
 * Attribution — You must give appropriate credit, provide a link to the
 * license, and indicate if changes were made. You may do so in any reasonable
 * manner, but not in any way that suggests the licensor endorses you or your
 * use.
 *
 * No additional restrictions — You may not apply legal terms or technological
 * measures that legally restrict others from doing anything the license
 * permits.
 */
(function() {
    "use strict";
    //=============================================================================
    // Setting up parameters
    //=============================================================================
    var parameters = PluginManager.parameters('TDDP_PictureBlendModes');
    var useAdditiveFix = Boolean(parameters['Additive fix'] === 'true' || false);
    //=============================================================================
    // Game_Interpreter - register plugin commands
    //=============================================================================
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args)
        var args = args || [];
        if (command === 'SetPictureBlendMode') this.TDDP_setPictureBlendMode(args[0], args[1]);
    };

    Game_Interpreter.prototype.TDDP_setPictureBlendMode = function(pictureId, blendModeString) {
        var game_picture = $gameScreen.picture(pictureId);
        if(!game_picture) throw new Error("TDDP_SetPictureBlendMode: pictureID must be a number. It was " + blendModeString);
        // Only normal, add, multiply and screen are supported in WebGL by default
        var blendModes = [
            'NORMAL',
            'ADD',
            'MULTIPLY',
            'SCREEN',
            'OVERLAY',
            'DARKEN',
            'LIGHTEN',
            'COLOR_DODGE',
            'COLOR_BURN',
            'HARD_LIGHT',
            'SOFT_LIGHT',
            'DIFFERENCE',
            'EXCLUSION',
            'HUE',
            'SATURATION',
            'COLOR',
            'LUMINOSITY',
        ];
        game_picture._blendMode = blendModes.indexOf(String(blendModeString).toUpperCase());
    }

    /**
     * Maps Pixi blend modes to WebGL blend modes.
     *
     * @method mapBlendModes
     */
    PIXI.WebGLRenderer.prototype.mapBlendModes = function()
    {
        var gl = this.gl;

        if(!PIXI.blendModesWebGL)
        {
            PIXI.blendModesWebGL = [];

            PIXI.blendModesWebGL[PIXI.blendModes.NORMAL]        = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            if(useAdditiveFix) {
                PIXI.blendModesWebGL[PIXI.blendModes.ADD]           = [gl.DST_ALPHA, gl.DST_ALPHA];
            } else {
                PIXI.blendModesWebGL[PIXI.blendModes.ADD]           = [gl.SRC_ALPHA, gl.DST_ALPHA];
            }
            PIXI.blendModesWebGL[PIXI.blendModes.MULTIPLY]      = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.SCREEN]        = [gl.SRC_ALPHA, gl.ONE];
            PIXI.blendModesWebGL[PIXI.blendModes.OVERLAY]       = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.DARKEN]        = [gl.ONE_MINUS_DST_COLOR, gl.ONE, gl.FUNC_REVERSE_SUBTRACT];
            PIXI.blendModesWebGL[PIXI.blendModes.LIGHTEN]       = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.COLOR_DODGE]   = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.COLOR_BURN]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.HARD_LIGHT]    = [gl.ONE, gl.ONE, gl.FUNC_REVERSE_SUBTRACT];
            PIXI.blendModesWebGL[PIXI.blendModes.SOFT_LIGHT]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.DIFFERENCE]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.EXCLUSION]     = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.HUE]           = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.SATURATION]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.COLOR]         = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.LUMINOSITY]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
        }
    };

    /**
    * Sets-up the given blendMode from WebGL's point of view.
    *
    * @method setBlendMode
    * @param blendMode {Number} the blendMode, should be a Pixi const, such as PIXI.BlendModes.ADD
    */
    PIXI.WebGLBlendModeManager.prototype.setBlendMode = function(blendMode)
    {
        if(this.currentBlendMode === blendMode)return false;

        this.currentBlendMode = blendMode;

        var blendModeWebGL = PIXI.blendModesWebGL[this.currentBlendMode];
        this.gl.enable( this.gl.BLEND );
        this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
        this.gl.blendEquation(blendModeWebGL[2] || this.gl.FUNC_ADD);
        if(blendModeWebGL[3]) this.gl.blendEquation(blendModeWebGL[3]);

        return true;
    };
})();