import {getApp} from "./helpers";
import {guildID} from "./index";

export class Command<T, U, V> {
    public _name: string;
    public _description: string;
    public _options: T;
    public _callback: (interaction: U, args: V) => void;

    constructor(name: string, description: string, options: T, callback: (U, V) => void) {
        this._name = name;
        this._description = description;
        this._options = options;
        this._callback = callback;
    }

    async registerCommand() {
        await getApp(guildID).commands.post({
            data: {
                name: this._name,
                description: this._description,
                options: this._options ?? []
            },
        });
    }

    async execute(interaction: any, args?: any): Promise<void> {
        this._callback(interaction, args)
    }
}
