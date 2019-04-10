import * as React from 'react';
import { resolve } from 'inversify-react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { NewsCollectionStore } from './news-collection.store';

@observer
export class NewsCollection extends React.Component {

    private _searchInputRef = React.createRef<HTMLInputElement>();
    private _searchInput: HTMLInputElement;

    @resolve(NewsCollectionStore)
    private readonly _newsCollectionStore: NewsCollectionStore;

    render() {
        const { collection, updateNewsArticles } = this._newsCollectionStore;
        const someStr = collection ? JSON.stringify(collection) : null;

        return (
            <div>
                <div className="search">
                    <input type="text" ref={this._searchInputRef} />
                </div>
                <div className="search-button">
                    <button onClick={this.searchArticles}>Search</button>
                </div>
                Collection: {someStr}
            </div>
        )
    }

    @action.bound
    private searchArticles() {
        this._newsCollectionStore.updateNewsArticles(this._searchInputRef.current.value)
    }
}