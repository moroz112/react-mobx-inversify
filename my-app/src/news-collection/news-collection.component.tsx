import * as React from 'react';
import { resolve } from 'inversify-react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { NewsCollectionStore, NewsArticle } from './news-collection.store';

import {MainNewsComponent} from "../main-news/main-news.component";

import './news-collection.scss';
import { map, switchMap } from "rxjs/operators";
import { interval, Observable } from "rxjs";

@observer
export class NewsCollection extends React.Component {

    private _searchInputRef = React.createRef<HTMLInputElement>();
    private _searchInput: HTMLInputElement;

    @resolve(NewsCollectionStore)
    private readonly _newsCollectionStore: NewsCollectionStore;

    render() {
        const { collection, mainNews } = this._newsCollectionStore;

        return (
            <div className="collection-wrapper">
                <div className="search">
                    <input
                        type="text"
                        ref={this._searchInputRef}
                        // onChange={event => this._newsCollectionStore.updateNewsArticles(event.target.value)}
                    />
                </div>
                <div className="search-button">
                    <button onClick={this.searchArticles}>Search</button>
                </div>
                <MainNewsComponent news={mainNews} />
                <div className="collection">
                    {collection && collection.map(item =>
                        (
                            <div className="collection-item" key={item.title}>
                                <div className="collection-item__title">{item.title}</div>
                                <img className="collection-item__image" src={item.urlToImage} />
                                <div className="collection-item__description">{item.description}</div>
                            </div>
                        )
                    )}
                </div>
            </div>
        )
    }

    @action.bound
    private searchArticles() {
        this._newsCollectionStore.updateNewsArticles(this._searchInputRef.current.value)
    }
}