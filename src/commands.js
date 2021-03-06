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
exports.ms = exports.mp = exports.embed = exports.ping = void 0;
var Discord = require('discord.js');
var Command_1 = require("./Command");
var helpers = require("./helpers");
var fetch = require("node-fetch");
exports.ping = new Command_1.Command("ping", "Test Command", null, function (interaction, args) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, helpers.reply(interaction, "pong")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.embed = new Command_1.Command("embed", "Displays an embed", [
    {
        name: "name",
        description: "Your Name",
        required: true,
        type: 3
    },
    {
        name: "age",
        description: "Your Age",
        type: 4
    }
], function (interaction, args) { return __awaiter(void 0, void 0, void 0, function () {
    var embed, arg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                embed = new Discord.MessageEmbed().setTitle("Test");
                for (arg in args) {
                    embed.addField(arg, args[arg]);
                }
                return [4 /*yield*/, helpers.reply(interaction, { embed: embed })];
            case 1:
                _a.sent();
                console.log(args);
                return [2 /*return*/];
        }
    });
}); });
exports.mp = new Command_1.Command("mp", "Get exact names to use in the /ms command", [
    {
        name: "name",
        description: "The name of a trainer.",
        required: true,
        type: 3
    }
], function (interaction, args) { return __awaiter(void 0, void 0, void 0, function () {
    var trainerList, trainers, embed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:3000/api/trainer?name=" + args.name).then(function (response) {
                    return response.json();
                })];
            case 1:
                trainerList = _a.sent();
                trainers = [];
                trainerList.map(function (x) { return x.name; }).forEach(function (y) {
                    if (!trainers.includes(y)) {
                        trainers.push(y);
                    }
                });
                embed = new Discord.MessageEmbed().setTitle("Results");
                embed.addField("Trying using /ms on these:", trainers.join("\n"));
                return [4 /*yield*/, helpers.reply(interaction, { embed: embed })];
            case 2:
                _a.sent();
                console.log(args);
                return [2 /*return*/];
        }
    });
}); });
exports.ms = new Command_1.Command("ms", "Search for a PM trainer.", [
    {
        name: "name",
        description: "The trainer you want to look for.",
        required: true,
        type: 3
    }
], function (interaction, args) { return __awaiter(void 0, void 0, void 0, function () {
    var trainerList, trainer, embed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("http://localhost:3000/api/trainer?name=" + encodeURIComponent(args.name.toLowerCase().trim())).then(function (response) {
                    return response.json();
                })];
            case 1:
                trainerList = _a.sent();
                trainerList.forEach(function (x) {
                    console.log(x.name.toLowerCase() + " | " + args.name.toLowerCase());
                });
                trainer = trainerList.filter(function (x) { return x.name.toLowerCase() == args.name.toLowerCase(); })[0];
                embed = new Discord.MessageEmbed().setTitle(trainer.name);
                embed.setImage("https://gamepress.gg" + trainer.imageLink);
                return [4 /*yield*/, helpers.reply(interaction, { embed: embed })];
            case 2:
                _a.sent();
                console.log(args);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=commands.js.map