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
var _this = this;
var pokemonFolder = "C:\\Users\\Anthony\\WebstormProjects\\An-2-nee\\src\\Data\\Pokemon\\";
// @ts-ignore
var cheerio = require("cheerio");
// @ts-ignore
var axios = require("axios");
// @ts-ignore
var index = require("../Data/index.json");
// @ts-ignore
var fs = require('fs');
var getPokemonList = function () { return __awaiter(_this, void 0, void 0, function () {
    var linkArr;
    return __generator(this, function (_a) {
        linkArr = [];
        index.forEach(function (x) {
            x.pokemon.forEach(function (y) {
                linkArr.push(y.link);
            });
        });
        return [2 /*return*/, linkArr];
    });
}); };
var getPokemonData = function (links) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        links.map(function (x) { return __awaiter(_this, void 0, void 0, function () {
            var body, $, pokemonName, filename, trainer, dataTable, pokemonTyping, _a, _b, weakness, role, rarityImage, rarity, gender, moves, otherForms, movesTable, Sync, SyncTable, SyncMove, passives, passivesDom, baseStats, maxStats, baseStatGroup, _c, _d, maxStatGroup, _e, _f, grid, gridData, _g, _h, pokemon, objectString;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, axios.get(x)];
                    case 1:
                        body = _j.sent();
                        $ = cheerio.load(body.data);
                        pokemonName = $("#page-title > h1")
                            .text()
                            .split(" & ")[1];
                        filename = pokemonName
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/\(|\)/g, "");
                        trainer = $(".sync-pair-trainer")
                            .text()
                            .trim();
                        dataTable = $("#pokemon-table");
                        pokemonTyping = [];
                        _b = (_a = $(dataTable.find("tbody > tr:nth-child(1) > td > span"))).each;
                        return [4 /*yield*/, function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var type;
                                    return __generator(this, function (_a) {
                                        type = $(this).attr("class");
                                        pokemonTyping.push(type.replace("-type", ""));
                                        return [2 /*return*/];
                                    });
                                });
                            }];
                    case 2:
                        _b.apply(_a, [_j.sent()]);
                        weakness = $(dataTable.find("tbody > tr:nth-child(2) > td > span"))
                            .attr("class")
                            .replace("-type", "");
                        role = $(dataTable.find(".role-image > a")).text();
                        rarityImage = $(dataTable.find(".base-potential-image > img")).attr("src");
                        rarity = "";
                        if (rarityImage.includes("3-star")) {
                            rarity = "3";
                        }
                        if (rarityImage.includes("4-star")) {
                            rarity = "4";
                        }
                        if (rarityImage.includes("5-star")) {
                            rarity = "5";
                        }
                        gender = $(dataTable.find(".pokemon-gender-cell > a")).text();
                        moves = [];
                        otherForms = $(".pokemon-title")
                            .text()
                            .split("\n")
                            .filter(function (x) { return x !== ""; })
                            .map(function (x) { return x
                            .replace(trainer + " & ", "")
                            .replace("Sygna Suit ", ""); });
                        movesTable = $(".view-moves-on-pokemon-node.pokemon-node-moves-container > div.views-row.pokemon-node-move > div.move-pokemon-page-container");
                        movesTable.each(function () {
                            var move_name = $(this)
                                .find(".move-pokemon-page-title > a")
                                .text();
                            var move_type = $(this)
                                .find(".move-type > td")
                                .text()
                                .trim();
                            var move_category = $(this)
                                .find(".move-category > td > img")
                                .attr("src")
                                .split("/")
                                .pop()
                                .split(".")[0]
                                .replace(/%20/g, " ");
                            var move_power = {
                                min_power: parseInt($(this)
                                    .find(".move-pokemon-page-power > span.min-power")
                                    .text()),
                                max_power: parseInt($(this)
                                    .find(".move-pokemon-page-power > span.max-power")
                                    .text())
                            };
                            var move_accuracy = parseInt($(this)
                                .find(".move-accuracy > th:contains('Accuracy') + td")
                                .text());
                            var move_target = $(this)
                                .find(".move-target > th:contains('Target') + td")
                                .text();
                            var move_cost = $(this).find(".pokemon-cost-box-PG").length > 0
                                ? parseInt($(this).find(".pokemon-cost-box-PG").length)
                                : "";
                            var move_uses = $(this).find(".move-uses > td > a").length > 0
                                ? parseInt($(this)
                                    .find(".move-uses > td > a")
                                    .text())
                                : "";
                            var move_effect = $(this)
                                .find(".move-effect")
                                .text();
                            var move_unlock_requirements = [];
                            $(this)
                                .find(".field--name-field-move-unlock-requirements > .field__items > .field__item")
                                .each(function () {
                                move_unlock_requirements.push($(this)
                                    .find(".move-unlock-requirements-text")
                                    .text());
                            });
                            moves.push({
                                name: move_name,
                                type: move_type,
                                category: move_category,
                                power: move_power,
                                accuracy: move_accuracy,
                                target: move_target,
                                cost: move_cost,
                                uses: (typeof move_uses === "string") ? parseInt(move_uses) : move_uses,
                                effect: move_effect,
                                unlock_requirements: move_unlock_requirements
                            });
                        });
                        Sync = $(".sync-move-pokemon-page-container");
                        SyncTable = $(Sync).find(".sync-move-pokemon-page-left");
                        SyncMove = {
                            name: $(Sync).find(".sync-move-pokemon-page-title > a").text(),
                            type: $(SyncTable).find(".sync-type > td").text().replace("\n", ""),
                            category: $(SyncTable).find(".sync-category > td > img")
                                .attr("src")
                                .split("/")
                                .pop()
                                .split(".")[0]
                                .replace(/%20/g, " "),
                            power: {
                                min_power: parseInt($(SyncTable).find(".min-power").text()),
                                max_power: parseInt($(SyncTable).find(".max-power").text())
                            },
                            target: $(SyncTable).find("> table > tbody > tr:nth-child(5) > td").text(),
                            effect_tag: $(SyncTable).find("> table > tbody > tr:nth-child(6) > td").text(),
                            description: $(Sync).find(".sync-move-pokemon-page-right > p").text()
                        };
                        passives = [];
                        passivesDom = $(".view.view-passive-skill-on-pokemon-node > div.view-content > div.views-row");
                        passivesDom.each(function () {
                            passives.push({
                                name: $(this).find(".passive-title").text(),
                                description: $(this).find(".passive-skill-effect").text().replace("\n", "").replace("\n", "")
                            });
                        });
                        baseStats = [];
                        maxStats = [];
                        _d = (_c = $("#pokemon-stats > div.tab-content-stats.base-stat-bars")
                            .find(".stat-text")).each;
                        return [4 /*yield*/, function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var stat;
                                    return __generator(this, function (_a) {
                                        stat = $(this).text().split("\n");
                                        if (stat.length > 1) {
                                            stat.pop();
                                            baseStats.push(stat);
                                        }
                                        return [2 /*return*/];
                                    });
                                });
                            }];
                    case 3:
                        baseStatGroup = _d.apply(_c, [_j.sent()]);
                        _f = (_e = $("#pokemon-stats > div.tab-content-stats.max-stat-bars")
                            .find(".stat-text")).each;
                        return [4 /*yield*/, function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var stat;
                                    return __generator(this, function (_a) {
                                        stat = $(this).text().split("\n");
                                        if (stat.length > 1) {
                                            stat.pop();
                                            maxStats.push(stat);
                                        }
                                        return [2 /*return*/];
                                    });
                                });
                            }];
                    case 4:
                        maxStatGroup = _f.apply(_e, [_j.sent()]);
                        grid = [];
                        _h = (_g = $("#sort-table > tbody").find("tr")).each;
                        return [4 /*yield*/, function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var bonus, syncOrbCost, energyCost, reqSyncLevel, gridPos;
                                    return __generator(this, function (_a) {
                                        bonus = $(this)
                                            .find("td.views-field.views-field-nothing-1")
                                            .text();
                                        syncOrbCost = $(this)
                                            .find("td.views-field.views-field-field-sync-orb-cost")
                                            .text();
                                        energyCost = $(this)
                                            .find("td.views-field.views-field-field-energy-cost")
                                            .text();
                                        reqSyncLevel = $(this)
                                            .find("td.views-field.views-field-field-unlocks-at-sync-level")
                                            .text();
                                        gridPos = $(this)
                                            .find("td.views-field.views-field-nothing-2")
                                            .text();
                                        grid.push({
                                            bonus: bonus.replace(/(\r\n|\n|\r)/gm, ""),
                                            syncOrbCost: syncOrbCost.trim(),
                                            energyCost: energyCost.trim(),
                                            reqSyncLevel: (reqSyncLevel === " ") ? "1" : reqSyncLevel,
                                            gridPos: gridPos.trim()
                                        });
                                        return [2 /*return*/];
                                    });
                                });
                            }];
                    case 5:
                        gridData = _h.apply(_g, [_j.sent()]);
                        pokemon = {
                            name: pokemonName,
                            trainer: trainer,
                            typing: pokemonTyping,
                            weakness: weakness,
                            role: role,
                            rarity: rarity,
                            gender: gender,
                            otherForms: otherForms,
                            moves: moves,
                            syncMove: SyncMove,
                            passives: passives,
                            stats: {
                                base: baseStats,
                                max: maxStats
                            },
                            grid: grid
                        };
                        objectString = JSON.stringify(pokemon);
                        fs.writeFileSync(pokemonFolder + filename + "-" + trainer + ".json", objectString);
                        console.log(pokemon.name + " has been written");
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
getPokemonList().then(function (x) { return getPokemonData(x); }).then(function (y) { return console.log("done."); });
// getPokemonData(["https://gamepress.gg/pokemonmasters/pokemon/alder-volcarona"]).then(x => console.log("done."));
//# sourceMappingURL=ScrapePokemon.js.map