import { computed, observable } from 'mobx';
import { injectable } from "inversify";

@injectable()
export class SomeStore {

    @observable
    private _someValue: string = "Anton";

    @computed
    get somevalue(): string {
        return this._someValue
    }
}