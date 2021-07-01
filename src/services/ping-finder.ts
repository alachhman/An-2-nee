import {injectable} from "inversify";


@injectable()
// @ts-ignore
export class PingFinder {

    private regexp = 'ping';

    public isPing(stringToSearch: string): boolean {
        return stringToSearch.search(this.regexp) >= 0;
    }
}
