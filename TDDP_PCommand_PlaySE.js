//=============================================================================
// TDDP_PCommand_PlaySE.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.TDDP_PCommand_PlaySE = "1.0.0";

var TDDP = TDDP || {};
TDDP.PCommand_PlaySE = "1.0.0";
//=============================================================================
/*:
 * @plugindesc 1.0.0 Adds the PlaySE Plugin Command. Lets you play SE's with randomized pitch and volume from a range. See Help.
 *
 * @author Tor Damian Design / Galenmereth
 *
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * HOW TO USE
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Go to the third page of an Event entry and select Plugin Command under
 * Advanced.
 * Use the following syntax for this Plugin Command:
 *
 *      PlaySE NameOfSE volume pitch pan
 *
 * Any property after NameOfSE is optional as long as the preceding property is
 * set. This means that if you want to set the pitch, you must also set the
 * volume. If you want to set the pan, you must set the volume and pitch.
 * 
 * • NameOfSE is required.
 *
 * • Volume can be either a number or a range in Array format. If an Array, the
 *   volume will be set to a value between the two values. Examples:
 *      • PlaySE Sheep 80
 *          Plays the Sheep SE at volume 80, like normal.
 *      • PlaySE Sheep [40,100]
 *          Plays the Sheep SE at a random volume between 40 and 100.
 *
 * • Pitch is optional. Like volume, can be either a specific number or a range
 *   in Array format. Examples:
 *      • PlaySE Sheep 80 [80,150]
 *          Plays the Sheep SE at volume 80 and at a pitch between 80 and 150.
 *
 * • Pan is optional. Like pitch and volume, can be either a specific number
 *   (-100 is far left and 100 is far right), or a range in Array format.
 *   Example:
 *      • PlaySE Sheep 80 [80,150] [-100,100]
 *          Plays the Sheep SE at volume 80, a pitch between 80 and 150, and 
 *          the pan anywhere between -100 and 100.
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * CHANGELOG
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * • 1.0.0  Initial stable release
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * TERMS & CONDITIONS
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