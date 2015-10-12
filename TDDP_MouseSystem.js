//=============================================================================
// TDDP_MouseSystem.js
// Version: 1.5.6
//=============================================================================

var Imported = Imported || {};
Imported.TDDP_MouseSystem = "1.5.6";

var TDDP = TDDP || {};
TDDP.MouseSystem = "1.5.6";

//=============================================================================
/*:
 * @plugindesc 1.5.6 Custom mouse cursors, highlight menu items on hover, custom event mouse interaction and much more! See Help.
 *
 * @author Tor Damian Design / Galenmereth
 *
 * @param ---Custom Cursor---
 * @desc This is a heading, no need to touch it.
 * @default
 *
 * @param Use Custom Cursor?
 * @desc Whether you want to use a custom mouse cursor image.
 * true => ON       false => OFF
 * @default false
 *
 * @param Custom Cursor Image
 * @desc The filename for the custom cursor. It looks for this in your project's Custom Cursor Folder.
 * @default default.png
 *
 * @param Custom Cursors Folder
 * @desc The folder you wish to store the custom cursors in. Must end with a forward slash. Default: img/cursors/
 * @default img/cursors/
 *
 * @param ---Auto Change Cursors---
 * @desc Options for automatically changing the mouse cursor when hovering over events with certain event commands in them.
 * @default
 *
 * @param Show Text Cursor
 * @desc Automatically show this custom cursor image when hovering over events with Show Text commands in them.
 *
 * @param Transfer Cursor
 * @desc Automatically show this custom cursor image when hovering over events with Transfer Player commands in them.
 *
 * @param Change Gold Cursor
 * @desc Automatically show this custom cursor image when hovering over events with Change Gold commands in them.
 *
 * @param Change Items Cursor
 * @desc Automatically show this custom cursor image when hovering over events with Change Items commands in them.
 *
 * @param Change Weapons Cursor
 * @desc Automatically show this custom cursor image when hovering over events with Change Weapons commands in them.
 *
 * @param Change Armors Cursor
 * @desc Automatically show this custom cursor image when hovering over events with Change Armors commands in them.
 *
 * @param ---Hover Select---
 * @desc This is a heading, no need to touch it.
 * @default
 *
 * @param Highlight On Hover
 * @desc Highlight menu items when hovering over them with the mouse.
 * true => ON       false => OFF
 * @default false
 *
 * @param Hover SE Cooldown
 * @desc Audio cooldown (in frames) between playing Cursor SE when Highlight On Hover is set to true. Default 4.
 * @default 4
 *
 * @param ---Interact To Activate---
 * @desc These are options for activating events by mouse interaction instead of player character.
 * @default
 *
 * @param Click Notetag
 * @desc The notetag used to trigger the event when it is clicked on.
 * Default: click_activate!
 * @default click_activate!
 *
 * @param Hover Notetag
 * @desc The notetag used to trigger the event when the mouse is over it.
 * Default: hover_activate!
 * @default hover_activate!
 *
 * @param Leave Notetag
 * @desc The notetag used to trigger the event when the mouse leaves it.
 * Default: leave_activate!
 * @default leave_activate!
 *
 * @param ---Mouse Icons---
 * @desc This is a heading, no need to touch it.
 * @default --------------------------------
 *
 * @param Hide Cursor
 * @desc Hide the default mouse cursor when an icon is shown.
 * true => ON       false => OFF
 * @default false
 *
 * @param Icon Offset X
 * @desc The icon's offset from the mouse horizontally.
 * Default: 9
 * @default 9
 *
 * @param Icon Offset Y
 * @desc The icon's offset from the mouse vertically.
 * Default: 14
 * @default 14
 *
 * @param ---Mouse Icon Tags---
 * @desc This is a heading, no need to touch it.
 * @default --------------------------------
 *
 * @param Icon Tag 1
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default quest: 191
 *
 * @param Icon Tag 2
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default chest: 210
 *
 * @param Icon Tag 3
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default door: 106
 *
 * @param Icon Tag 4
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default world_map: 190
 *
 * @param Icon Tag 5
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default potion: 176
 *
 * @param Icon Tag 6
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default poison: 177
 *
 * @param Icon Tag 7
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default four_leaf_clover: 182
 *
 * @param Icon Tag 8
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default notebook: 187
 *
 * @param Icon Tag 9
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default letter: 192
 *
 * @param Icon Tag 10
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default key: 195
 *
 * @param Icon Tag 11
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default key: 195
 *
 * @param Icon Tag 12
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default key: 195
 *
 * @param Icon Tag 13
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default key: 195
 *
 * @param Icon Tag 14
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default key: 195
 *
 * @param Icon Tag 15
 * @desc Set up an icon tag shortcut to be used with the Mouse Hover Icons notetag. See plugin Help for more information.
 * @default key: 195
 *
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Introduction / Table of contents
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * TDDP - MouseSystem is a collection of methods for modifying mouse-based
 * interaction in your games. You can set custom mouse cursors, show icons
 * beside the mouse when hovering over events, and more.
 *
 * Table of contents
 * -----------------
 * • Notetags - General how to use
 * • Custom Mouse Cursor - How to use
 * • Changing Custom Mouse Cursor during gameplay - How to use
 * • Highlight Menu Items On Hover - How to use
 * • Mouse Hover Icons - How to use
 * • Mouse Icon Tags - How to use
 * • Interact To Activate - How to use
 * • Click Switch - How to use
 * ~
 * • Changelog
 * • Terms & Conditions
 *
 * ==============================================================================
 * Notetags - General how to use
 * ==============================================================================
 * Notetags can be placed two places:
 * • In an event's Note box, in which case they will act for all pages of that
 *   event
 * • In a Comment event command anywhere on an event's page, in which case they
 *   will act only when that page is active. Page notetags will override the
 *   event's Note notetag if the property they affect is the same.
 *
 * ==============================================================================
 * Custom Mouse Cursor - How to use
 * ==============================================================================
 * To use custom mouse cursors, you first have to create the folder set in the
 * Custom Cursors Folder option, which by default is: img/cursors/
 *
 * Next you set the "Use Custom Cursor?" option to the value true.
 * By default the plugin will then look for the file "default.png" in the
 * "img/cursors/" folder; you can the image in the "Custom Cursor Image"
 * option and the cursors folder in the "Custom Cursors Folder" option.
 *
 * The images used for custom cursors can be up to 128x128 pixels, but for
 * browser compatibility reasons a maximum resolution of 32x32 is recommended.
 *
 * ==============================================================================
 * Changing Custom Mouse Cursor during gameplay - How to use
 * ==============================================================================
 * You can change the custom mouse cursor graphic during gameplay in several
 * ways.
 *
 * Using notetags on events:
 * -------------------------
 * To change the custom cursor when the mouse is hovering over an event, use
 * the following notetag:
 *
 *      hover_cursor filename.png;
 *
 * This will swap to the "filename.png" image file when the mouse hovers over
 * the event. You can omit the file extension(.png), in which case the plugin
 * will assume the .png extension. This means the above example could also be
 * written as
 *
 *      hover_cursor filename;
 *
 * The notetag can be placed in a Comment box on an event page, in which case
 * it only acts for that page. If you place it in the event's Note box, then it
 * acts for all pages of the event, but can be overridden on a per-page basis
 * using a Comment box.
 *
 * Using plugin command
 * --------------------
 * You can use plugin commands to change the custom mouse cursor image and
 * reset it to the default "Custom Mouse Image" option. The commands are:
 *
 *      SetCustomCursor filename.png
 *
 *      ResetCustomCursor
 *
 * ==============================================================================
 * Highlight Menu Items On Hover - How to use
 * ==============================================================================
 * If you set the Highlight On Hover option to true the default operation of
 * the mouse changes to automatically highlight a menu item when the mouse is
 * over it, and you then only have to click it once to activate it.
 * The default mouse functionality necessitates one click to highlight a menu
 * item and then another click to select it.
 *
 * Hover SE Cooldown option
 * ------------------------
 * This adds a cooldown (in frames) between each time the Cursor sound effect
 * from the System tab in the database is played. This is set to 4 by default
 * so as to not play too many instances of the sound effect at once when moving
 * the mouse over multiple menu items quickly in a row, which sounds jarring.
 *
 * ==============================================================================
 * Mouse Hover Icons - How to use
 * ==============================================================================
 * This lets you show an icon next to the mouse cursor when hovering over events
 * that contain the required notetag. To show an icon you have two choices: use
 * an icon index directly, or a Mouse Icon Tag (see below). To specify an icon
 * index directly, you use the following notetag:
 *
 *      hover_icon 5;
 *
 * Where 5 is the wanted icon index.
 *
 * There are also two modifier notetags you can use in event page comments to
 * override the default settings you set in the plugin options. They are:
 *
 *      hide_cursor!
 *          This command will hide the mouse cursor when it's over this event.
 *
 *      icon_offset 0 0;
 *          This will offset the icon's X and Y positions in pixels, overriding
 *          the default settings you set in the plugin options.
 *
 * ==============================================================================
 * Mouse Icon Tags
 * ==============================================================================
 * These settings act as convenient tags you can use instead of icon indexes
 * when using the Mouse Hover Icons notetag. Example use with notetag:
 *
 *      hover_icon quest;
 *
 * Using these for icons that are used repeatedly means that it's easier to
 * change the icon for these events later on by just changing the corresponding
 * Mouse Icon Tags.
 *
 * Setting up tags is easy. The values look like this:
 *
 *      quest: 5
 *
 * Anything before the colon : becomes the tag to be used in the notetag; the
 * number after it is the icon index to use.
 *
 * ==============================================================================
 * Interact To Activate - How to use
 * ==============================================================================
 * These notetags let the player interact with the event using the mouse cursor
 * instead of the player character.
 *
 * There are three options:
 * • click_activate!
 *      Triggers the event by clicking on it
 * • hover_activate!
 *      Triggers the event when the mouse hovers over the event
 * • leave_activate!
 *      Triggers the event when the mouse leaves the event
 *
 * This lets the player click and activate an event regardless of where they are
 * on the map. The player character won't move to the event when the event
 * contains the customizable notetag that enables this.
 *
 * The three notetags listed above can be customized in the options under the
 * Interact To Activate heading. They are:
 * • Click Notetag
 * • Hover Notetag
 * • Leave Notetag
 *
 * You should choose a notetag which you won't normally write in a comment
 * meant only for your own benefit, so using underscores and an exclamation
 * mark can be useful to make sure you don't accidentally type out the notetag.
 *
 * ==============================================================================
 * Click Switch - How to use
 * ==============================================================================
 * You can use the following notetag command to make an event set its
 * Self Switch to a given value when the user clicks/taps on it:
 *
 *      click_switch A true;
 *
 * Where A is the Self Switch to manipulate and true is the true/false value.
 * The notetag can be typed in the Note field and event Comments, just like the
 * others in this plugin.
 *
 * ==============================================================================
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Changelog:
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * • 1.5.6  All anon funcs are now registered on the TDDP_MouseSystem object for
 *          future compatibility.
 * • 1.5.5  Fixed problem with parsing comments; removed restriction on multiline
 *          comments.
 * • 1.5.4  Added more auto hover cursors and optimized lookup for them
 * • 1.5.3  Fixed issue where custom mouse cursor updated in menus based on map
 * • 1.5.2  Fixed issue where custom cursor and mouse icons didn't update if
 *          mouse moved over another event without any space in between them.
 * • 1.5.1  Not checking for events under mouse while $gameMessage has text
 *          on wait.
 * • 1.5.0  Notetag for click_switch SWITCH true/false; implemented
 * • 1.4.0  Merged in the Highlight Menu Item On Hover functionality from
 *          another script of mine, now a part of this one permanently.
 * • 1.3.0  Added support to change custom cursor on hover or with a Plugin
 *          Command. Vastly optimized fetching of notetag data by extending
 *          Game_Event instead of when hovering over events.
 * • 1.2.0  Added support for a custom cursor with options.
 * • 1.1.0  Added support for the Note field for events, which acts globally
 *          for all pages.
 * • 1.0.3  Added hide_icon! notetag and icon_offset 0 0; notetags and help.
 * • 1.0.2  Fixed bug with icon bitmap not being cleared due to typo.
 * • 1.0.1  Added Mouse Icon Tags.
 * • 1.0.0  Stable release.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
 * Attribution — You must give appropriate credit, provide a link to the license,
 * and indicate if changes were made. You may do so in any reasonable manner, but
 * not in any way that suggests the licensor endorses you or your use.
 *
 * No additional restrictions — You may not apply legal terms or technological
 * measures that legally restrict others from doing anything the license permits.
 */
//=============================================================================
// All anonymous/helper functions are registered on this object for the convenience of other plugins.
var TDDP_MouseSystem = {};
(function() {
    "use strict";
    //=============================================================================
    // TDDP_MouseSystem._ext
    //
    // Get default file extension from filename if none
    //=============================================================================
    TDDP_MouseSystem._ext = function(filename) {
        if (String(filename).split(".").length > 1) {
            return filename;
        } else {
            // Default filetype extension
            return filename + ".png";
        }
    }
    // TDDP_MouseSystem.TDDP_MouseSystem._ext = TDDP_MouseSystem._ext;
    //=============================================================================
    // Setting up parameters
    //=============================================================================
    var parameters = PluginManager.parameters('TDDP_MouseSystem');
    TDDP_MouseSystem.show_text_cursor        = String(parameters['Show Text Cursor']) || false;
    TDDP_MouseSystem.change_gold_cursor      = String(parameters['Change Gold Cursor']) || false;
    TDDP_MouseSystem.change_item_cursor      = String(parameters['Change Items Cursor']) || false;
    TDDP_MouseSystem.change_weapon_cursor    = String(parameters['Change Weapons Cursor']) || false;
    TDDP_MouseSystem.change_armor_cursor     = String(parameters['Change Armors Cursor']) || false;
    TDDP_MouseSystem.transfer_player_cursor  = String(parameters['Transfer Cursor']) || false;
    TDDP_MouseSystem.transfer_player_icon    = String(parameters['Transfer Icon']) || false;
    TDDP_MouseSystem.highlight_on_hover      = Boolean(parameters['Highlight On Hover'] === 'true' || false);
    TDDP_MouseSystem.audio_cooldown_on_hover = Number(parameters['Hover SE Cooldown'] || 4)
    TDDP_MouseSystem.hide_cursor             = Boolean(parameters['Hide Cursor']        === 'true' || false);
    TDDP_MouseSystem.icon_offset_x           = Number(parameters['Icon Offset X']);
    TDDP_MouseSystem.icon_offset_y           = Number(parameters['Icon Offset Y']);
    TDDP_MouseSystem.click_to_activate_note  = String(parameters['Click Notetag']);
    TDDP_MouseSystem.hover_to_activate_note  = String(parameters['Hover Notetag']);
    TDDP_MouseSystem.leave_to_activate_note  = String(parameters['Leave Notetag']);
    TDDP_MouseSystem.use_custom_cursor       = Boolean(parameters['Use Custom Cursor?'] === 'true' || false);
    TDDP_MouseSystem.custom_cursor_image     = TDDP_MouseSystem._ext(String(parameters['Custom Cursor Image']));
    TDDP_MouseSystem.custom_cursor_path      = String(parameters['Custom Cursors Folder']);
    TDDP_MouseSystem.mouse_icon_tags         = {}
    // Add all mouse icon tags
    for(var i = 1; i <= 15; ++i) {
        var tag = parameters['Icon Tag ' + i]
        if (!tag) continue;
        tag = tag.split(":");
        var key = tag[0];
        var val = tag[1].replace(' ', '');
        TDDP_MouseSystem.mouse_icon_tags[key] = val;
    }
    //=============================================================================
    // Game_Interpreter - register plugin commands
    //=============================================================================
    var Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Game_Interpreter_pluginCommand.call(this, command, args)
        if (command === 'SetCustomCursor') TDDP_MouseSystem._setCustomCursor(args);
        if (command === 'ResetCustomCursor') TDDP_MouseSystem._resetCustomCursor();
    };
    //=============================================================================
    // Helper functions
    //=============================================================================
    TDDP_MouseSystem._showCustomCursor = function(filename) {
        // The Math part after the ? in the url part is to force HTML to refresh the cursor value, since otherwise
        // the cursor gets stuck until click if the player moves it to certain areas on the window border, not
        // respecting the document style.
        document.body.style.cursor = ['url(', TDDP_MouseSystem.custom_cursor_path, filename, '?', Math.floor(Graphics.frameCount / 110),'), default'].join("");
    }
    TDDP_MouseSystem._setCustomCursor = function(filename) {
        TouchInput.customMouseCursor = filename || TDDP_MouseSystem.custom_cursor_image;
        TDDP_MouseSystem._showCustomCursor(TouchInput.customMouseCursor);
    }
    TDDP_MouseSystem._resetCustomCursor = function() {
        TDDP_MouseSystem._setCustomCursor();
    }
    TDDP_MouseSystem._showMouseCursor = function() {
        if (TDDP_MouseSystem.use_custom_cursor) {
            TDDP_MouseSystem._showCustomCursor(TouchInput.customMouseCursor || TDDP_MouseSystem.custom_cursor_image);
        } else {
            document.body.style.cursor = 'inherit';
        }
    }

    TDDP_MouseSystem._hideMouseCursor = function() { document.body.style.cursor = 'none'; }

    // Return only comment objects from a page's list objects
    TDDP_MouseSystem._filterComments = function(pageListObject) {
        var comments = (pageListObject.code == 108 || pageListObject.code == 408) ? true : false;
        return comments;
    }

    TDDP_MouseSystem._filterMessages = function(pageListObject) {
        return pageListObject.code == 401;
    }

    TDDP_MouseSystem._filterTransferPlayer = function(pageListObject) {
        return pageListObject.code == 201;
    }

    TDDP_MouseSystem._filterChangeGold = function(pageListObject) {
        return pageListObject.code == 125;
    }

    TDDP_MouseSystem._filterChangeItems = function(pageListObject) {
        return pageListObject.code == 126;
    }

    TDDP_MouseSystem._filterChangeWeapons = function(pageListObject) {
        return pageListObject.code == 127;
    }

    TDDP_MouseSystem._filterChangeArmors = function(pageListObject) {
        return pageListObject.code == 128;
    }

    TDDP_MouseSystem._isSceneMap = function() {
        return (SceneManager._scene instanceof Scene_Map);
    }

    // Find a given notetag either in a game_event's Note box or Comment
    // boxes on current page.
    TDDP_MouseSystem._findInEventNotetags = function(game_event, notetag, onMatch) {
        if (!game_event.page()) return false;
        var comments = game_event.page().list.filter(TDDP_MouseSystem._filterComments);
        var result     = null;
        var foundMatch = false;
        var matchInString = function(string) {
            result = string.match(notetag);
            if (result !== null) {
                foundMatch = true;
            }
        }
        // First see if there's a relevant page comment
        if (comments.length > 0) {
            comments.forEach(function(comment) {
                if (foundMatch) return;
                matchInString(comment.parameters[0]);
            })
        }
        // If nothing found in page comment, check Note box
        if (!foundMatch) {
            if (game_event.event().note) {
                matchInString(game_event.event().note);
            }
        }
        if (foundMatch){ onMatch.call(game_event, result); }
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // START - Highlight On Hover option
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (TDDP_MouseSystem.highlight_on_hover){
        //=============================================================================
        // TouchInput
        //
        // Changes:
        // * _onMouseMove (Overwrite)
        //      Always triggers instead of only on _mousePressed
        //=============================================================================
        TouchInput._onMouseMove = function(event) {
            // Checking for _mousePressed removed
            var x = Graphics.pageToCanvasX(event.pageX);
            var y = Graphics.pageToCanvasY(event.pageY);
            this._onMove(x, y);
        };

        //=============================================================================
        // Window_Selectable
        //
        // New:
        // * processMouseMoved()
        //      Checks if mouse is moved and within window, and calls onTouch(false) if
        //      so, to move the menu highlight
        // * cursorIsWithinWindow()
        //      Checks if mouse cursor is within local window boundaries
        //
        // Changes:
        // * update (Aliased)
        //      Added call to processMouseMoved()
        //=============================================================================
        var _Window_Selectable_update =
            Window_Selectable.prototype.update;
        Window_Selectable.prototype.update = function() {
            this.processMouseMoved();
            _Window_Selectable_update.call(this);
        };

        Window_Selectable.prototype.processMouseMoved = function() {
            if (this.isOpenAndActive() && TouchInput.isMoved() && this.cursorIsWithinWindow()) {
                this.onTouch(false);
            }
        };

        Window_Selectable.prototype.cursorIsWithinWindow = function() {
            var _x = this.canvasToLocalX(TouchInput.x);
            var _y = this.canvasToLocalY(TouchInput.y);
            if (_x > this.padding && _x <= this.width - this.padding) {
                if (_y > this.padding && _y < this.height - this.padding) {
                    return true;
                }
            }
            return false;
        }

        //=============================================================================
        // SoundManager
        //
        // New:
        // * _lastPlayCursor
        //      Static "class" variable to keep last played cursor frameCount
        //
        // Changes:
        // * playCursor (Aliased)
        //      Added functionality for cooldown on playing the playCursor SE
        //=============================================================================

        // Static var to keep track of last played cursor SE frame
        SoundManager._lastPlayCursor = 0;

        var _SoundManager_playCursor =
            SoundManager.playCursor;
        SoundManager.playCursor = function() {
            var _canPlay = SoundManager._lastPlayCursor > Graphics.frameCount
                || Graphics.frameCount > SoundManager._lastPlayCursor + TDDP_MouseSystem.audio_cooldown_on_hover;

            if (_canPlay) {
                _SoundManager_playCursor.call(this);
                SoundManager._lastPlayCursor = Graphics.frameCount;
            }
        };
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // END - Highlight On Hover option
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //=============================================================================
    // TouchInput
    //
    // New:
    // • TouchInput.cursorIcon
    //      New Sprite for containing the cursor icon to draw when hovering over
    //      events on the map with the right notetag.
    // • _checkForEventUnderMouse()
    // • _updateCursorIcon()
    // • _hideCursorIcon()
    // • _activateClickEvents()
    //
    // Changes:
    // • _onMouseMove()
    //      Call to _checkForEventUnderMouse() on move, as well as reposition
    //      cursorIcon if shown.
    //=============================================================================
    TouchInput.cursorIcon           = new Sprite();
    TouchInput.cursorIcon.drawIcon  = Window_Base.prototype.drawIcon;
    TouchInput.cursorIcon.bitmap    = new Bitmap(Window_Base._iconWidth, Window_Base._iconHeight);
    TouchInput.cursorIcon.contents  = TouchInput.cursorIcon.bitmap;
    TouchInput.cursorIcon.iconIndex = null;

    var _TouchInput_onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function(event) {
        _TouchInput_onMouseMove.call(this, event);

        this._checkCursorStatus(event.pageX, event.pageY);
    };

    TouchInput._checkCursorStatus = function(pageX, pageY) {
        // Check for events under mouse and perform actions, and get event in result
        var overEvent = this._checkForEventUnderMouse(pageX, pageY);

        // Check if leave activate is to be triggered for a previous event
        if (this._activeEvent && this._activeEvent.TDDP_MS.leaveActivate &&
                (!overEvent || overEvent !== this._activeEvent)) {
            this._activeEvent.start();
            this._activeEvent = false;
        }
        // Set active event
        this._activeEvent = overEvent;
        if (this.cursorIcon.iconIndex) {
            this.cursorIcon.x = Graphics.pageToCanvasX(pageX) +
                (this.cursorIcon.customOffsetX !== null ? this.cursorIcon.customOffsetX : TDDP_MouseSystem.icon_offset_x);
            this.cursorIcon.y = Graphics.pageToCanvasY(pageY) +
                (this.cursorIcon.customOffsetY !== null ? this.cursorIcon.customOffsetY : TDDP_MouseSystem.icon_offset_y);
            this.cursorIcon.visible = true;
        }
    }

    var _TouchInput_update = TouchInput.update;
    TouchInput.update = function() {
        _TouchInput_update.call(this);
        if (this._lastEventPageX == this._curEventPageX && this._lastEventPageY == this._curEventPageY) {
            this._checkCursorStatus(this._lastEventPageX, this._lastEventPageY);
        }
        this._lastEventPageX = this._curEventPageX;
        this._lastEventPageY = this._curEventPageY;
    }

    TouchInput._checkForEventUnderMouse = function(pageX, pageY) {
        if (SceneManager.isCurrentSceneStarted() && TDDP_MouseSystem._isSceneMap() && $gameMap !== null && $dataMap !== null && !$gameMessage.hasText()) {
            var x = $gameMap.canvasToMapX(Graphics.pageToCanvasX(pageX));
            var y = $gameMap.canvasToMapY(Graphics.pageToCanvasY(pageY));
            this._curEventPageX = pageX;
            this._curEventPageY = pageY;
            var _events = $gameMap.eventsXy(x, y);
            if (_events.length > 0) {
                var game_event = _events[_events.length - 1]; // Get topmost event
                if (game_event.TDDP_MS.hoverIcon) {
                    TouchInput._updateCursorIcon(game_event.TDDP_MS.hoverIcon);
                    if (TDDP_MouseSystem.hide_cursor) TDDP_MouseSystem._hideMouseCursor();
                } else {
                    TouchInput._hideCursorIcon();
                };
                if (game_event.TDDP_MS.hoverActivate && !$gameMessage.isBusy()) {
                    game_event.start();
                };
                if (game_event.TDDP_MS.hideCursor) {
                    TDDP_MouseSystem._hideMouseCursor();
                };
                if (game_event.TDDP_MS.customOffsetX && game_event.TDDP_MS.customOffsetY) {
                    TouchInput.cursorIcon.customOffsetX = game_event.TDDP_MS.customOffsetX;
                    TouchInput.cursorIcon.customOffsetY = game_event.TDDP_MS.customOffsetY;
                };
                if (TDDP_MouseSystem.use_custom_cursor) {
                    if (game_event.TDDP_MS.customCursor) {
                        TDDP_MouseSystem._showCustomCursor(game_event.TDDP_MS.customCursor);
                    } else {
                        TDDP_MouseSystem._resetCustomCursor();
                    }
                };
                if (game_event.TDDP_MS.hoverSwitch) {
                    var key = [$gameMap._mapId, game_event._eventId, game_event.TDDP_MS.hoverSwitch.key]
                    $gameSelfSwitches.setValue(key, game_event.TDDP_MS.hoverSwitch.val === 'true')
                };
                return game_event;
            }
        }
        TouchInput._hideCursorIcon();
        TDDP_MouseSystem._showMouseCursor();
        return false;
    };

    TouchInput._updateCursorIcon = function(iconIndex) {
        if (this.cursorIcon.iconIndex != iconIndex) {
            this.cursorIcon.iconIndex = iconIndex;
            this.cursorIcon.contents.clear();
            this.cursorIcon.drawIcon(iconIndex, 0, 0);
            this.cursorIcon.visible = false;
        }
    };

    TouchInput._hideCursorIcon = function() {
        this.cursorIcon.iconIndex     = null;
        this.cursorIcon.visible       = false;
        this.cursorIcon.customOffsetX = null;
        this.cursorIcon.customOffsetY = null;
    }

    var _TouchInput_onTrigger = TouchInput._onTrigger;
    TouchInput._onTrigger = function(x, y) {
        if (!TouchInput._activateClickEvents(x, y)) _TouchInput_onTrigger.call(this, x, y);
    };

    TouchInput._activateClickEvents = function(x, y) {
        var found_click_event = false;
        if (SceneManager.isCurrentSceneStarted() && $gameMap !== null && $dataMap !== null && !$gameMessage.isBusy()) {
            var x = $gameMap.canvasToMapX(Graphics.pageToCanvasX(x));
            var y = $gameMap.canvasToMapY(Graphics.pageToCanvasY(y));
            var _events = $gameMap.eventsXy(x, y);
            if (_events.length > 0) {
                var game_event = _events[_events.length - 1];
                if (game_event.TDDP_MS.clickActivate) {
                    game_event.start();
                    found_click_event = true;
                };
                if (game_event.TDDP_MS.clickSwitch) {
                    var key = [$gameMap._mapId, game_event._eventId, game_event.TDDP_MS.clickSwitch.key]
                    $gameSelfSwitches.setValue(key, game_event.TDDP_MS.clickSwitch.val === 'true')
                };
            }
        }
        return found_click_event;
    }
    //=============================================================================
    // Spriteset_Map
    //
    // New:
    // • createCursor()
    //      Draws Sprite container for the TouchInput.cursorIcon Sprite
    //
    // Changes:
    // • createScreenSprites()
    //      Added call to new createCursor() function
    //=============================================================================
    var _Spriteset_Map_createScreenSprites =
        Spriteset_Map.prototype.createScreenSprites;
    Spriteset_Map.prototype.createScreenSprites = function() {
        _Spriteset_Map_createScreenSprites.call(this);
        this.createCursor();
    };
    Spriteset_Map.prototype.createCursor = function() {
        this._cursorSprite = new Sprite();
        this._cursorSprite.setFrame(0, 0, Graphics.width, Graphics.height);
        this._cursorSprite.z = 10;
        this._cursorSprite.addChild(TouchInput.cursorIcon);
        this.addChild(this._cursorSprite);
    };
    //=============================================================================
    // Game_Event
    //
    // New:
    // • setupMouseSystemProperties()
    //      Caches TDDP MouseSystem specific notetag variables
    //
    // Changes:
    // • initMembers()
    //      Adding TDDP_MS object with params for caching of notetag data.
    // • setupPage()
    //      Calls new function setupMouseSystemProperties()
    //=============================================================================
    var _Game_Event_setupPage =
        Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        _Game_Event_setupPage.call(this);
        this.setupMouseSystemProperties();
    };
    Game_Event.prototype.setupMouseSystemProperties = function() {
        this.TDDP_MS               = {};
        this.TDDP_MS.hoverIcon     = false;
        this.TDDP_MS.clickActivate = false;
        this.TDDP_MS.hoverActivate = false;
        this.TDDP_MS.leaveActivate = false;
        this.TDDP_MS.hideCursor    = false;
        this.TDDP_MS.customOffsetX = false;
        this.TDDP_MS.customOffsetY = false;
        this.TDDP_MS.customCursor  = false;
        this.TDDP_MS.clickSwitch   = false;
        this.TDDP_MS.hoverSwitch   = false;
        TDDP_MouseSystem._findInEventNotetags(this, /hover_icon\s(.*?);/, function(result) {
            if (!result) return;
            result = result[result.length - 1];
            if (TDDP_MouseSystem.mouse_icon_tags[result]) {
                result = TDDP_MouseSystem.mouse_icon_tags[result];
            }
            this.TDDP_MS.hoverIcon = Number(result);
        });
        TDDP_MouseSystem._findInEventNotetags(this, TDDP_MouseSystem.click_to_activate_note, function() {
            this.TDDP_MS.clickActivate = true;
        });
        TDDP_MouseSystem._findInEventNotetags(this, TDDP_MouseSystem.hover_to_activate_note, function() {
            this.TDDP_MS.hoverActivate = true;
        });
        TDDP_MouseSystem._findInEventNotetags(this, TDDP_MouseSystem.leave_to_activate_note, function() {
            this.TDDP_MS.leaveActivate = true;
        });
        TDDP_MouseSystem._findInEventNotetags(this, 'hide_cursor!', function() {
            this.TDDP_MS.hideCursor = true;
        });
        TDDP_MouseSystem._findInEventNotetags(this, /icon_offset\s(.*?)\s(.*?);/, function(result) {
            this.TDDP_MS.customOffsetX = Number(result[1]);
            this.TDDP_MS.customOffsetY = Number(result[2]);
        });
        TDDP_MouseSystem._findInEventNotetags(this, /hover_cursor\s(.*?);/, function(result) {
            this.TDDP_MS.customCursor = TDDP_MouseSystem._ext(result[result.length - 1]);
        });
        TDDP_MouseSystem._findInEventNotetags(this, /click_switch\s(.*?)\s(.*?);/, function(result) {
            this.TDDP_MS.clickSwitch = {};
            this.TDDP_MS.clickSwitch.key = String(result[1]);
            this.TDDP_MS.clickSwitch.val = String(result[2]);
        });
        TDDP_MouseSystem._findInEventNotetags(this, /hover_switch\s(.*?)\s(.*?);/, function(result) {
            this.TDDP_MS.hoverSwitch = {};
            this.TDDP_MS.hoverSwitch.key = String(result[1]);
            this.TDDP_MS.hoverSwitch.val = String(result[2]);
        });
        // Auto cursor checks
        if (!this.page()) return false;
        var auto_filters = [
            // The order is the priority; the first match stops further lookup
            [TDDP_MouseSystem.transfer_player_cursor,    TDDP_MouseSystem._filterTransferPlayer],
            [TDDP_MouseSystem.change_gold_cursor,        TDDP_MouseSystem._filterChangeGold],
            [TDDP_MouseSystem.change_item_cursor,        TDDP_MouseSystem._filterChangeItems],
            [TDDP_MouseSystem.change_weapon_cursor,      TDDP_MouseSystem._filterChangeWeapons],
            [TDDP_MouseSystem.change_armor_cursor,       TDDP_MouseSystem._filterChangeArmors],
            [TDDP_MouseSystem.show_text_cursor,          TDDP_MouseSystem._filterMessages]
        ]
        for (var i=0, max=auto_filters.length; i < max; i++) {
            if (this.TDDP_MS.customCursor) break;
            var entry = auto_filters[i];
            var cursor = entry[0];
            var filter = entry[1];
            if (typeof cursor == "string") {
                var matches = this.page().list.filter(filter);
                if (matches.length > 0) {
                    this.TDDP_MS.customCursor = TDDP_MouseSystem._ext(cursor);
                }
            }

        }
    }
})();
