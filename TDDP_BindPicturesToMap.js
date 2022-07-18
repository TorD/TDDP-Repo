//=============================================================================
// TDDP_BindPicturesToMap.js
// Version: 1.0.7
//=============================================================================
var Imported = Imported || {};
Imported.TDDP_BindPicturesToMap = "1.0.7";
//=============================================================================
/*:
 * @plugindesc 1.0.7 Plugin Commands for binding pictures to the map and/or changing what layer they're drawn on.
 *
 * @author Tor Damian Design / Galenmereth
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Information
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * The Bind Pictures To Map plugin lets you bind the movement of pictures to
 * the movement of the map rather than to the camera. You can also change what
 * "layer" a picture is drawn to, like below characters, or even below the
 * parallax layer.
 *
 * For updates and easy to use documentation, please go to the plugin's website:
 * http://mvplugins.tordamian.com/?p=54
 *
 * There you can also download a PDF of the documentation for offline use, and
 * having the documentation in one cleanly presented place means you can always
 * be sure it's the most recent available.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * In short: Completely free, including for commercial use.
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
(function() {
    "use strict";
    //=============================================================================
    // Game_Interpreter - register plugin commands
    //=============================================================================
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args)
        var args = args || [];
        if (command === 'BindPictureToMap')         this.bindPictureToMap(args[0], true, args[1]);
        if (command === 'UnbindPictureFromMap')       this.bindPictureToMap(args[0], false, args[1]);
        if (command === 'ChangePictureLayer')       this.changePictureLayer(args[0], args[1]);
        if (command === 'START_BindPicturesToMap')  this.bindAllPicturesToMap(args);
        if (command === 'STOP_BindPicturesToMap')   this.stopBindAllPicturesToMap();
    };

    var _Game_Interpreter_clear =
            Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        _Game_Interpreter_clear.call(this);
        this._bindAllPicturesToMap = this._bindAllPicturesToMapLayer = false;
    };

    Game_Interpreter.prototype.bindPictureToMap = function(pictureId, bindToMap, layer) {
        // Control first argument input, pictureId
        if(!pictureId) alert("BindPictureToMap requires the first parameter to be a valid picture Id");
        if(layer) {
            this.changePictureLayer(pictureId, layer)
        }
        var game_picture = $gameScreen.picture(pictureId)
        // Update picture_sprite
        var picture_sprite = SceneManager._scene._spriteset._pictureStorage[pictureId];
        if(picture_sprite) {
            if(game_picture && bindToMap != game_picture._bindToMap) {
                picture_sprite.loadBitmap();
            }
            picture_sprite.updateLayer();
        };
        if(game_picture) game_picture._bindToMap = bindToMap;
    };

    Game_Interpreter.prototype.changePictureLayer = function(pictureId, layer) {
        var layer = String(layer);
        if(!SceneManager._scene._spriteset._pictureContainer[layer]) {
            throw new Error("BindPictureToMap: " + layer + " is not a valid layer.");
        }
        var game_picture = $gameScreen.picture(pictureId)
        game_picture._layer = layer;
    }

    Game_Interpreter.prototype.bindAllPicturesToMap = function(args) {
        this._bindAllPicturesToMap = true;
        // Control second argument input, layer
        if(args && args[0]) {
            var layer = String(args[0]);
            if(!SceneManager._scene._spriteset._pictureContainer[layer]) {
                throw new Error("BindPicturesToMap: " + args[0] + " is not a valid layer.");
            }
            this._bindAllPicturesToMapLayer = layer;
        }
    }

    Game_Interpreter.prototype.stopBindAllPicturesToMap = function() {
        this._bindAllPicturesToMap      = false;
        this._bindAllPicturesToMapLayer = false;
    }

    //=============================================================================
    // Spriteset_Map
    //=============================================================================
    Spriteset_Map.prototype.createLowerLayer = function() {
        Spriteset_Base.prototype.createLowerLayer.call(this);
        this.createPicturesLayer('bottom', this._baseSprite);
        this.createParallax();
        this.createPicturesLayer('below_tilemap', this._baseSprite);
        this.createTilemap();
        this.createPicturesLayer('below_characters', this._tilemap);
        this.createCharacters();
        this.createPicturesLayer('above_characters', this._tilemap, 8);
        this.createShadow();
        this.createPicturesLayer('below_weather', this._tilemap, 8);
        this.createWeather();
        this.createPicturesLayer('top', this);
        this.createDestination();
    };

    // Modified
    Spriteset_Map.prototype.createDestination = function() {
        this._destinationSprite = new Sprite_Destination();
        this._destinationSprite.z = 9;
        this._pictureContainer['top'].addChild(this._destinationSprite);
    };

    // NEW
    Spriteset_Map.prototype.createPicturesLayer = function(layer, parent, z) {
        var z = z || 0;
        var container = new Sprite();
        // Set container props
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        var x = (Graphics.width - width) / 2;
        var y = (Graphics.height - height) / 2;
        container.setFrame(x, y, width, height);
        container.z = z;
        // Add to children
        parent.addChild(container);
        // Add binding
        this._pictureContainer[layer] = container;
    };

    // ALIAS
    var _Spriteset_Map_initialize =
            Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        this._pictureStorage   = {};
        this._pictureContainer = {};
        _Spriteset_Map_initialize.call(this);
    };

    var _Spriteset_Map_update =
            Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        this.updatePictures();
    }

    Spriteset_Map.prototype.updatePictures = function() {
        for (var i = 1; i <= $gameScreen.maxPictures(); i++) {
            var sprite = this._pictureStorage[i];
            if(!sprite.parent && sprite.picture()) {
                this._pictureStorage[i].update();
            }
        }
    }

    // OVERWRITE inherited
    Spriteset_Map.prototype.createPictures = function() {
        for (var i = 1; i <= $gameScreen.maxPictures(); i++) {
            this._pictureStorage[i] = new Sprite_Picture(i);
        }
    };

    //=============================================================================
    // Sprite_Picture
    //=============================================================================
    Sprite_Picture.prototype.updateLayer = function() {
        var picture = this.picture();
        var parent = this.parent;
        if(picture) {
            if(picture.layer()) {
                if(picture.layer() != parent) {
                    if(parent) parent.removeChild(this);
                    picture.layer().addChild(this);
                    // Sort parent on new entry by pic id
                    picture.layer().children.sort(function(a, b){return a._pictureId-b._pictureId});
                }
            }
        }
    };

    var _Sprite_Picture_updateOther =
            Sprite_Picture.prototype.updateOther;
    Sprite_Picture.prototype.updateOther = function() {
        _Sprite_Picture_updateOther.call(this);
        this.updateLayer();
    };

    // OVERWRITE inherited
    Sprite_Picture.prototype.loadBitmap = function() {
        var bitmap = ImageManager.loadPicture(this.picture()._name);
        bitmap.addLoadListener(this.bltLoadedBitmap.bind(this, bitmap));
        return;
    };

    // NEW
    Sprite_Picture.prototype._useLoopingBitmap = function() {
        return this.picture()._bindToMap && ($gameMap.isLoopHorizontal() || $gameMap.isLoopVertical());
    }

    // NEW
    Sprite_Picture.prototype.bltLoadedBitmap = function(sourceBitmap) {
        var picture = this.picture();
        picture.setDimensions(sourceBitmap);

        // Check if bitmap size is too large
        if(picture._width + picture._height > 8032) {
            throw new Error("Picture " + this._pictureId + "(" + this._pictureName + ") is too large for bitmaps bound to the map and looping enabled. Its height + width must be less than 8032 in total.");
        }

        // Set dimensions of new bitmap
        var bw = (this._useLoopingBitmap() && $gameMap.isLoopHorizontal() && picture._useHorizontalRepeat) ? picture._loopWidth : picture._width;
        var bh = (this._useLoopingBitmap() && $gameMap.isLoopVertical() && picture._useVerticalRepeat) ? picture._loopHeight : picture._height;
        this.bitmap = new Bitmap(bw, bh);

        // Blit original bitmap
        this.bitmap.blt(sourceBitmap, 0, 0, sourceBitmap.width, sourceBitmap.height, 0, 0);

        // Only used and performed when on a map scene
        if (SceneManager._scene instanceof Scene_Map && this._useLoopingBitmap()) {
            // Make a copy for horizontal offscreen scrolls into view
            if($gameMap.isLoopHorizontal() && picture._useHorizontalRepeat) {
                this.bitmap.blt(sourceBitmap, 0, 0, sourceBitmap.width, sourceBitmap.height, picture._horSpacing, 0);
            }
            // Make a copy for vertical offscreen scrolling into view
            if($gameMap.isLoopVertical() && picture._useVerticalRepeat) {
                this.bitmap.blt(sourceBitmap, 0, 0, sourceBitmap.width, sourceBitmap.height, 0, picture._verSpacing);
            }
            // Make a copy if horizontal + vertical is scrolled into view
            if($gameMap.isLoopHorizontal() && $gameMap.isLoopVertical()
                    && picture._useHorizontalRepeat && picture._useVerticalRepeat) {
                this.bitmap.blt(sourceBitmap, 0, 0, sourceBitmap.width, sourceBitmap.height, picture._horSpacing, picture._verSpacing);
            }
        }

    };
    //=============================================================================
    // Game_Picture
    //=============================================================================
    var _Game_Picture_initBasic =
            Game_Picture.prototype.initBasic;
    Game_Picture.prototype.initBasic = function() {
        _Game_Picture_initBasic.call(this);
        this._bindToMap = $gameMap._interpreter._bindAllPicturesToMap;
        if($gameMap._interpreter._bindAllPicturesToMapLayer) {
            this._layer = $gameMap._interpreter._bindAllPicturesToMapLayer;
        } else {
            this._layer = 'top';
        }
    };
    /**
    * Get current layer object
    */
    Game_Picture.prototype.layer = function() {
        if(!SceneManager._scene._spriteset) return null;
        return SceneManager._scene._spriteset._pictureContainer[this._layer];
    }
    /**
    * Extensions to show function to set additional properties
    */
    var _Game_Picture_show =
            Game_Picture.prototype.show;
    Game_Picture.prototype.show = function(name, origin, x, y, scaleX,
            scaleY, opacity, blendMode) {
        _Game_Picture_show.call(this, name, origin, x, y, scaleX,
            scaleY, opacity, blendMode);

        // Origin coords
        this._originX = this._x;
        this._originY = this._y;

        // Only used and performed when on a map scene
        if (SceneManager._scene instanceof Scene_Map) {
            // Map offsets for resolutions that offset the map's drawing start. Used only when binding pictures to map
            this._mapOffsX = Math.max(SceneManager._screenWidth - ($gameMap.width() * $gameMap.tileWidth()), 0);
            this._mapOffsY = Math.max(SceneManager._screenHeight - ($gameMap.height() * $gameMap.tileHeight()), 0);
        }
    };
    /**
    * Set dimensions based on a bitmap. Gets called by Sprite_Picture
    */
    Game_Picture.prototype.setDimensions = function(bitmap) {
        this._width = bitmap.width;
        this._height = bitmap.height;

        // Only used and performed when on a map scene
        if (SceneManager._scene instanceof Scene_Map) {
            // Horizontal and  vertical spacing for repeating textures
            this._horSpacing = $gameMap.width() * $gameMap.tileWidth();
            this._verSpacing = $gameMap.height() * $gameMap.tileHeight();
        }

        // Check if we need horizontal and vertical repeating
        this._useHorizontalRepeat = this._width < this._horSpacing * 2;
        this._useVerticalRepeat = this._height < this._verSpacing * 2;

        // Set requested bitmap width based on repeating
        this._loopWidth = this._useHorizontalRepeat ? this._horSpacing * 2 : this._width;
        this._loopHeight = this._useVerticalRepeat ? this._verSpacing * 2 : this._height;
    }
    /**
    * Extensions to updateMove when binding pictures to map
    */
    var _Game_Picture_updateMove =
            Game_Picture.prototype.updateMove;
    Game_Picture.prototype.updateMove = function() {
        _Game_Picture_updateMove.call(this);
        if(this._bindToMap) {
            var mw = ($gameMap.width() * $gameMap.tileWidth());
            var mh = ($gameMap.height() * $gameMap.tileHeight());
            var dx = Math.abs($gameMap.displayX());
            var dy = Math.abs($gameMap.displayY());
            var ox = dx * $gameMap.tileWidth();
            var oy = dy * $gameMap.tileHeight();
            this._x = this._originX - ox;
            this._y = this._originY - oy;
            if (this._useHorizontalRepeat && ox >= mw) {
                this._x += mw;
            }else {
                this._x += this._mapOffsX;
            }
            if (this._useVerticalRepeat && oy >= mh) {
                this._y += mh;
            }else {
                this._y += this._mapOffsY;
            }
        }
    };
    //=============================================================================
    // Game_Picture
    //=============================================================================
    /**
    * Fix to displayX's returned decimal value to hinder JS rounding errors
    */
    Game_Map.prototype.displayX = function() {
        return Math.ceil10(this._displayX, -8);
    };
    /**
    * Fix to displayY's returned decimal value to hinder JS rounding errors
    */
    Game_Map.prototype.displayY = function() {
        return Math.ceil10(this._displayY, -8);
    };
    //=============================================================================
    // Math additions
    //=============================================================================
    /**
    * Decimal adjustment of a number.
    *
    * @param {String}  type  The type of adjustment.
    * @param {Number}  value The number.
    * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
    * @returns {Number} The adjusted value.
    */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }

})();
