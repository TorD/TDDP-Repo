//=============================================================================
// TDDP_ResourceLog.js
// Version: 0.0.1
//=============================================================================

var Imported = Imported || {};
Imported.TDDP_ResourceLog = "0.0.1";

var TDDP = TDDP || {};
TDDP.ResourceLog = "0.0.1";
//=============================================================================
/*:
 * @plugindesc 0.0.1 Log all resources (pictures, sounds etc) used in your game.
 *
 * @author Tor Damian Design / Galenmereth
 *
 * @param Filename
 * @desc The filename for the file to output the log to in your project's root directory.
 * @default TDDP Resources in use
 *
 * @param Print to console
 * @desc Whether you want to print to the log window. Shows details in progress. Set to true to enable.
 * @default false
 */
(function() {
    //=============================================================================
    // Setting up parameters
    //=============================================================================
    var parameters = PluginManager.parameters('TDDP_ResourceLog');
    var outputFilename = String(parameters['Filename']);
    var printToConsole = Boolean(parameters['Print to console'] === 'true' || false);

    // Check if playtest, stop if not
    var isPlaytest = Utils.isOptionValid('test');
    if(!isPlaytest) return;

    // Setup
    var fs = require('fs');
    var files = {};
    var mapIndex = 0;
    if(printToConsole) console.log("========= TDDP Log Resources: Starting =========");
    if(printToConsole) console.log("=> Finding used resources...");

    // Get locale dir path
    var path = function(folder) {
        var path = window.location.pathname.replace(/\/[^\/]*$/, '/' + folder + '/');
        if (path.match(/^\/([A-Z]\:)/)) {
            path = path.slice(1);
        }
        return decodeURIComponent(path);
    }

    // Fetching data files
    var dataFiles = fs.readdirSync(path('data'));
    // Finding maps
    function isMap(filename) {
        filename.search("Map") >= 0;
    }
    var maps = dataFiles.filter(function(f){return f.search("Map") >= 0});
    if(printToConsole) console.log("=> Found " + maps.length + " maps. Parsing resources...");

    parseMaps();
    function parseMaps() {
        var mapId = parseInt(maps[mapIndex].replace( /[^\d]/g, '' ), 10);
        if(printToConsole) console.log("=> Parsing map " + mapId);
        var mapData = JSON.parse(fs.readFileSync(path('data') + maps[mapIndex]));
        if(mapIndex + 1 < maps.length) {
            mapIndex += 1;
            parseMapData(mapData);
        } else {
            return report();
        }
    }

    function parseMapData(mapData) {
        // Cycle events and load appropriate resources
        for(var i = 0, max = mapData.events.length; i < max; i++) {
            var event = mapData.events[i];
            if(!event) continue;
            for(var p = 0, pMax = event.pages.length; p < pMax; p++) {
                var page = event.pages[p];
                for(var l = 0, lMax = page.list.length; l < lMax; l++) {
                    var listEntry = page.list[l];
                    parseListEntryResources(listEntry);
                }
            }
        };
        parseMaps();
    }

    function parseListEntryResources(listEntry) {
        var code = listEntry.code;
        var parameters = listEntry.parameters;
        switch(code) {
            // Show Picture
            case 231:
                registerFile('picture', parameters[1]);
                break;
            // Play BGM
            case 241:
                registerFile('bgm', parameters[0]);
                break;
            // Play BGS
            case 245:
                registerFile('bgs', parameters[0]);
                break;
            case 249:
                registerFile('me', parameters[0]);
                break;
            // Play SE
            case 250:
                registerFile('se', parameters[0]);
                break;
            // Change Parallax
            case 284:
                registerFile('parallax', parameters[0]);
                break;
            // Show Text
            case 101:
                registerFile('face', parameters[0]);
                break;
            // Show Animation
            case 212:
                registerFile('animation', parameters[1]);
                break;
        }
    }

    function registerFile(type, file) {
        files[type] = files[type] || [];
        if(file.constructor === Object) {
            file = file.name;
        }
        if(files[type].indexOf(file) == -1) {
            files[type].push(file);
            if(printToConsole) console.log("- " + type.toUpperCase() + " " + file);
        }
    }

    var fileData = "";
    function report() {
        var header = "========= TDDP Log Resources: Report =========";
        if(printToConsole) console.log(header);
        fileData = header + "\n";
        for(var key in files) {
            if(files.hasOwnProperty(key)) {
                files[key] = files[key].sort();
                var section = "------------- " + key.toUpperCase() + " -------------";
                if(printToConsole) console.log(section);
                fileData += section + "\n";
                for(var i=0, max=files[key].length; i<max; i++) {
                    var entry = "- " + files[key][i]
                    if(printToConsole) console.log(entry);
                    fileData += entry + "\n";
                }
            }
        }
        fs.writeFileSync(path('') + outputFilename + ".txt", fileData);
    }
})();
