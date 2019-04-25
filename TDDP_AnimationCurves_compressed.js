var Imported = Imported || {};
Imported.TDDP_AnimationCurves = "1.0.3";

/*:
@author Tor Damian Design / Galenmereth
@plugindesc 1.0.3b Apply animation curves (easing functions) to Move Picture commands using simple Plugin Commands
@help
How it works
------------------------------------------------------------------------------
This plugin allows you to set animation curves (so-called easing functions)
to be used with Move Picture and Tint Picture events.

Demo mode
------------------------------------------------------------------------------
When playtesting your game, you can hit the demo key (default F11) to show
a visual representation of all the supported animation curves and their names.

If you hover over these with your mouse an animation plays, showing how the
curve affects a red ball's Y axis movement

General use
------------------------------------------------------------------------------
The Plugin Commands must be placed *before* the Move Picture or Tint Picture
events that they are to affect. They do not have to be placed within the same
event window, however, so you can put them in Common Events if you wish.

Once a Move Picture or Tint Picture event is fired off, the curves you
specified using the Plugin Commands are reset to use MV's default until you
add new Plugin Command entries.

Use the following Plugin Command syntax:
AnimationCurve <CurveFunction> <Property(optional)>

Example:
AnimationCurve QuadOut x

See the bottom of this help text for all available animation curves.

# Set curve for all properties
If you omit the property at the end in the Plugin Command (the x in the above
example), then the plugin will use the animation curve for all properties: x,
y, scaleX, scaleY, and opacity.

# Linear is the default fallback
When you do include a property, but have not added any Plugin Command entry
without a property, then all other properties are animated using linear
interpolation, which is MV's default.

# Different curves for different properties
This can be done by adding multiple Plugin Commands with an animation curve
for individual properties.

For example:
AnimationCurve ElasticInOut x
AnimationCurve QuadOut y
AnimationCurve CubicInOut opacity

If the above three PluginCommands are placed before a Move Picture event, then
the x, y and opacity properties are animated with their respective curves,
whilst the remainder (scaleX, scaleY) are animated with the default linear
interpolation.

Move Picture specific properties
------------------------------------------------------------------------------
The following properties are available for Move Picture events:

x, y, scaleX, scaleY, and opacity

scaleX corresponds to the "Width" property in the Move Picture event window,
and scaleY corresponds to the "Height" property.

Tint Picture specific properties
------------------------------------------------------------------------------
The following properties are available for Tint Picture events:

red, green, blue, gray

These correspond with the color sliders in the Tint Picture event window.

Supported animation curve functions
------------------------------------------------------------------------------
QuadIn      QuadOut      QuadInOut
CubicIn     CubicOut     CubicInOut
QuartIn     QuartOut     QuartInOut
QuintIn     QuintOut     QuintInOut
SineIn      SineOut      SineInOut
ExpoIn      ExpoOut      ExpoInOut
CircIn      CircOut      CircInOut
ElasticIn   ElasticOut   ElasticInOut
BackIn      BackOut      BackInOut
BounceIn    BounceOut    BounceInOut

Linear (MV default)

Key codes
------------------------------------------------------------------------------
Visit this URL for a complete overview:
https://keycode.info/

Some common key codes:
F10: 121
F11: 122 (default)
F12: 123

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

@param Demo hotkey
@desc Key code for the hotkey used to display ingame curve demo overlay. See help for codes. Default 122 = F11 key
@type number
@default 122

@param Plugin Command key
@desc The plugin's "key" to use in Plugin Commands. You can customize this if you want to type less, or have a conflict
@type string
@default AnimationCurve
*/

var TDDP_AnimationCurves={easingFunctions:{QuadIn:function(n,t,i,e){return i*(n/=e)*n+t},QuadOut:function(n,t,i,e){return-i*(n/=e)*(n-2)+t},QuadInOut:function(n,t,i,e){return(n/=e/2)<1?i/2*n*n+t:-i/2*(--n*(n-2)-1)+t},CubicIn:function(n,t,i,e){return i*(n/=e)*n*n+t},CubicOut:function(n,t,i,e){return i*((n=n/e-1)*n*n+1)+t},CubicInOut:function(n,t,i,e){return(n/=e/2)<1?i/2*n*n*n+t:i/2*((n-=2)*n*n+2)+t},QuartIn:function(n,t,i,e){return i*(n/=e)*n*n*n+t},QuartOut:function(n,t,i,e){return-i*((n=n/e-1)*n*n*n-1)+t},QuartInOut:function(n,t,i,e){return(n/=e/2)<1?i/2*n*n*n*n+t:-i/2*((n-=2)*n*n*n-2)+t},QuintIn:function(n,t,i,e){return i*(n/=e)*n*n*n*n+t},QuintOut:function(n,t,i,e){return i*((n=n/e-1)*n*n*n*n+1)+t},QuintInOut:function(n,t,i,e){return(n/=e/2)<1?i/2*n*n*n*n*n+t:i/2*((n-=2)*n*n*n*n+2)+t},SineIn:function(n,t,i,e){return-i*Math.cos(n/e*(Math.PI/2))+i+t},SineOut:function(n,t,i,e){return i*Math.sin(n/e*(Math.PI/2))+t},SineInOut:function(n,t,i,e){return-i/2*(Math.cos(Math.PI*n/e)-1)+t},ExpoIn:function(n,t,i,e){return 0==n?t:i*Math.pow(2,10*(n/e-1))+t},ExpoOut:function(n,t,i,e){return n==e?t+i:i*(1-Math.pow(2,-10*n/e))+t},ExpoInOut:function(n,t,i,e){return 0==n?t:n==e?t+i:(n/=e/2)<1?i/2*Math.pow(2,10*(n-1))+t:i/2*(2-Math.pow(2,-10*--n))+t},CircIn:function(n,t,i,e){return-i*(Math.sqrt(1-(n/=e)*n)-1)+t},CircOut:function(n,t,i,e){return i*Math.sqrt(1-(n=n/e-1)*n)+t},CircInOut:function(n,t,i,e){return(n/=e/2)<1?-i/2*(Math.sqrt(1-n*n)-1)+t:i/2*(Math.sqrt(1-(n-=2)*n)+1)+t},ElasticIn:function(n,t,i,e){var r=1.70158,o=0,a=i;if(0==n)return t;if(1==(n/=e))return t+i;if(o||(o=.3*e),a<Math.abs(i)){a=i;r=o/4}else r=o/(2*Math.PI)*Math.asin(i/a);return-a*Math.pow(2,10*(n-=1))*Math.sin((n*e-r)*(2*Math.PI)/o)+t},ElasticOut:function(n,t,i,e){var r=1.70158,o=0,a=i;if(0==n)return t;if(1==(n/=e))return t+i;if(o||(o=.3*e),a<Math.abs(i)){a=i;r=o/4}else r=o/(2*Math.PI)*Math.asin(i/a);return a*Math.pow(2,-10*n)*Math.sin((n*e-r)*(2*Math.PI)/o)+i+t},ElasticInOut:function(n,t,i,e){var r=1.70158,o=0,a=i;if(0==n)return t;if(2==(n/=e/2))return t+i;if(o||(o=e*(.3*1.5)),a<Math.abs(i)){a=i;r=o/4}else r=o/(2*Math.PI)*Math.asin(i/a);return n<1?a*Math.pow(2,10*(n-=1))*Math.sin((n*e-r)*(2*Math.PI)/o)*-.5+t:a*Math.pow(2,-10*(n-=1))*Math.sin((n*e-r)*(2*Math.PI)/o)*.5+i+t},BackIn:function(n,t,i,e){var r=1.70158;return i*(n/=e)*n*((r+1)*n-r)+t},BackOut:function(n,t,i,e){var r=1.70158;return i*((n=n/e-1)*n*((r+1)*n+r)+1)+t},BackInOut:function(n,t,i,e){var r=1.70158;return(n/=e/2)<1?i/2*(n*n*((1+(r*=1.525))*n-r))+t:i/2*((n-=2)*n*((1+(r*=1.525))*n+r)+2)+t},BounceIn:function(n,t,i,e){return i-TDDP_AnimationCurves.easingFunctions.BounceOut(e-n,0,i,e)+t},BounceOut:function(n,t,i,e){return(n/=e)<1/2.75?i*(7.5625*n*n)+t:n<2/2.75?i*(7.5625*(n-=1.5/2.75)*n+.75)+t:n<2.5/2.75?i*(7.5625*(n-=2.25/2.75)*n+.9375)+t:i*(7.5625*(n-=2.625/2.75)*n+.984375)+t},BounceInOut:function(n,t,i,e){return n<e/2?.5*TDDP_AnimationCurves.easingFunctions.BounceIn(2*n,0,i,e)+t:.5*TDDP_AnimationCurves.easingFunctions.BounceOut(2*n-e,0,i,e)+.5*i+t},Linear:function(n,t,i,e){return i*(n/e)+t}},nextEasingFunctions:void 0,origin:void 0,setEasingFunction:function(n,t){},demo:function(){}};!function(n){var t=$plugins.filter(function(n){return"TDDP_AnimationCurves"==n.name})[0].parameters,i=Number(t["Demo hotkey"]),e=String(t["Plugin Command key"]),r=void 0;n.nextEasingFunctions=function(){return r};var o={};function a(t,i){"string"==typeof t&&(!function(t){if(void 0===Object.keys(n.easingFunctions).find(function(n){return n==t}))throw new Error('TDDP_AnimationCurves | Invalid animation curve argument: "'+t+'". See plugin help for valid options.')}(t),t=n.easingFunctions[t]),function(n){if(!(c.indexOf(n)>=0))throw new Error('TDDP_AnimationCurves | Invalid target property: "'+n+'". See plugin help for valid options.')}(i=i||"general"),function(n,t){(r=r||{})[n]=t}(i,t)}n.origin=function(){return o},n.setEasingFunction=a;var u=void 0;function s(){if(u)return document.body.removeChild(u.view),void(u=void 0);!function(){var t=window.innerWidth,i=window.innerHeight,e=new PIXI.Application({width:t,height:i,autoResize:!0,resolution:devicePixelRatio,transparent:!0});u=e,e.view.style.overflow="hidden",e.view.style.position="absolute",e.view.style.top=0,e.view.style.left=0,e.view.style["z-index"]=999,document.body.appendChild(e.view);var r=new PIXI.Container;e.stage.addChild(r);var o=(new PIXI.Graphics).beginFill(3355443,.8).drawRect(0,0,t,i).endFill();r.addChild(o);var a=Object.keys(n.easingFunctions);a.pop();var s=a.length,c=Math.ceil(s/5),h=(t-50)/5,d=(i-10*c)/c;a.forEach(function(t,i){var o=n.easingFunctions[t],a=i%5,u=Math.floor(i/5),s=a*(h+10),c=u*(d+10),f=(new PIXI.Sprite).setTransform(s,c);f.interactive=!0,f.buttonMode=!0;var l=(new PIXI.Graphics).beginFill(13487565).drawRect(0,0,h,d).endFill();l.lineStyle(3,10066329).moveTo(15,d-15);for(var p=h+d/100,v=0;v<p;v++){var m=n.easingFunctions.Linear(v,15,h-30,p),I=o(v,d-15,-(d-30),p);l.lineTo(m,I)}f.addChild(l);var _=new PIXI.Text(t,{fontFamily:"Helvetica",fontSize:24,fill:16777215,align:"center",dropShadow:!0,dropShadowBlur:6,dropShadowDistance:2,dropShadowAlpha:.5});_.setTransform((h-_.width)/2,(d-_.height)/2),_.alpha=.85,f.addChild(_);var g=(new PIXI.Graphics).beginFill(8421631,.8).drawCircle(0,0,5).endFill().setTransform(15,d-15);f.addChild(g);var w=(new PIXI.Graphics).beginFill(15610675,.8).drawCircle(0,0,5).endFill().setTransform(15,d-15);f.addChild(w),f.on("pointerover",function(){var t=0,i=function(){t>=90&&e.ticker.remove(i);var r=n.easingFunctions.Linear(t,15,h-30,90),a=o(t,d-15,-(d-30),90);g.setTransform(r,a),r=o(t,15,h-30,90),a=d-15,w.setTransform(r,a),t++};e.ticker.add(i)}),r.addChild(f)})}()}n.demo=s;var c=["general","x","y","scaleX","scaleY","opacity","red","blue","green","gray"];function h(){if(r){var t=function(t,i,e,r,o,a){return(t[i]?t[i]:t.general?t.general:n.easingFunctions.Linear)(e,r,o,a)}.bind(this,r);return r=void 0,t}}o.Game_Interpreter={},o.Game_Interpreter.pluginCommand=Game_Interpreter.prototype.pluginCommand,Game_Interpreter.prototype.pluginCommand=function(n,t){o.Game_Interpreter.pluginCommand.call(this,n,t),n===e&&function(n){var t=n[0];t&&a(t,n[1])}(t)},o.Game_Picture={},o.Game_Picture.move=Game_Picture.prototype.move,o.Game_Picture.tint=Game_Picture.prototype.tint,Game_Picture.prototype.move=function(n,t,i,e,r,a,u,s){o.Game_Picture.move.call(this,n,t,i,e,r,a,u,s);var c=h(),d=[];t!=this._x&&d.push(function(n,i,e){this._x=c("x",i,n,t-n,e)}.bind(this,this._x)),i!=this._y&&d.push(function(n,t,e){this._y=c("y",t,n,i-n,e)}.bind(this,this._y)),e!=this._scaleX&&d.push(function(n,t,i){this._scaleX=c("scaleX",t,n,e-n,i)}.bind(this,this._scaleX)),r!=this._scaleY&&d.push(function(n,t,i){this._scaleY=c("scaleX",t,n,r-n,i)}.bind(this,this._scaleY)),a!=this._opacity&&d.push(function(n,t,i){this._opacity=c("opacity",t,n,a-n,i)}.bind(this,this._opacity)),this.updateMove=c?function(n,t){if(!(this._duration<0)){var i=n-this._duration;t.forEach(function(t){t(i,n)}),this._duration--}}.bind(this,s,d):Game_Picture.prototype.updateMove.bind(this)};var d=["red","green","blue","gray"];Game_Picture.prototype.tint=function(n,t){o.Game_Picture.tint.call(this,n,t);var i=h(),e=[];n.forEach(function(n,t){var r=d[t],o=this._tone[t];n!=this._tone[t]&&e.push(function(e,a){this._tone[t]=i(r,e,o,n-o,a)}.bind(this))}.bind(this)),this.updateTone=i?function(n,t){if(!(this._toneDuration<0)){var i=n-this._toneDuration;t.forEach(function(t){t(i,n)}),this._toneDuration--}}.bind(this,t,e):Game_Picture.prototype.updateTone.bind(this)},Utils.isOptionValid("test")&&document.addEventListener("keydown",function(n){n.keyCode==i&&s()})}(TDDP_AnimationCurves);