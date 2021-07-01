import {getApp} from "./helpers";
import {guildID} from "./index";

export class Command<T, U, V> {
    private readonly _name: string;
    private readonly _description: string;
    private readonly _options: T;
    private readonly _callback: (U, V) => void;

    constructor(name: string, description: string, options: T, callback: (U, V) => void) {
        this._name = name;
        this._description = description;
        this._options = options;
        this._callback = callback;
    }

    async registerCommand(): Promise<void> {
        await getApp(guildID).commands.post({
            name: this._name,
            descriptions: this._description,
            options: this._options ?? []
        });

    }

    async execute(interaction: any, args?: any): Promise<void> {
        this._callback(interaction, args)
    }
}
