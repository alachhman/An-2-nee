"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.guildID = exports.client = void 0;
var helpers = require("./helpers");
require('dotenv').config();
var Discord = require('discord.js');
exports.client = new Discord.Client();
exports.guildID = "453732177058988034";
var commands = require("./commands");
var helpers_1 = require("./helpers");
exports.client.once('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    var registeredCommandList, commandList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Ready!');
                return [4 /*yield*/, helpers.getApp(exports.guildID).commands.get()];
            case 1:
                registeredCommandList = _a.sent();
                console.log(registeredCommandList);
                commandList = [
                    commands.ping,
                    commands.embed,
                    commands.ms,
                    commands.mp
                ];
                //
                // for (let command of commandList) {
                //     await command.registerCommand();
                // }
                return [4 /*yield*/, helpers_1.getApp(exports.guildID).commands.post({
                        data: {
                            name: "mp",
                            description: "Get exact names to use in the /ms command",
                            options: [
                                {
                                    name: "name",
                                    description: "The name of a trainer.",
                                    required: true,
                                    type: 3
                                }
                            ]
                        }
                    })];
            case 2:
                //
                // for (let command of commandList) {
                //     await command.registerCommand();
                // }
                _a.sent();
                exports.client.ws.on('INTERACTION_CREATE', function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, name, options, command, args, _i, commandList_1, x;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = interaction.data, name = _a.name, options = _a.options;
                                command = name.toLowerCase();
                                args = {};
                                if (options) {
                                    options.forEach(function (x) {
                                        var name = x.name, value = x.value;
                                        args[name] = value;
                                    });
                                }
                                _i = 0, commandList_1 = commandList;
                                _b.label = 1;
                            case 1:
                                if (!(_i < commandList_1.length)) return [3 /*break*/, 4];
                                x = commandList_1[_i];
                                if (!(x._name === command)) return [3 /*break*/, 3];
                                return [4 /*yield*/, x.execute(interaction, args)];
                            case 2:
                                _b.sent();
                                _b.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
exports.client.login(process.env.STAGINGTOKEN);
//# sourceMappingURL=index.js.map