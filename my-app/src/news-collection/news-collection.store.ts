import { injectable } from 'inversify';
import { observable, action } from 'mobx';
import { Observable, from, Subject } from 'rxjs'
import { startWith, switchMapTo, switchMap } from "rxjs/operators";

export interface NewsArticle {
    source: Object,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}
export interface NewsArticles {
    articles: Array<NewsArticle>
}

@injectable()
export class NewsCollectionStore {
    @observable
    private _collection: any;

    private _queryResult$: Subject<NewsArticles> = new Subject();

    constructor() {
        this._queryResult$.pipe(
            startWith({articles: []})
        ).subscribe(result => {
            this._collection = result.articles
        });


        fetch(`https://newsapi.org/v2/top-headlines?q=trump&apiKey=7ea83aed32b241fb9eaa37d4aad3ac71`)
            .then(response => response.json())
            .then(result => this._queryResult$.next(result));


    }

    get collection() {
        return this._collection
    }

    @action
    updateNewsArticles(query: string) {
        console.log('query', query);

        fetch(`https://newsapi.org/v2/top-headlines?q=${query}&apiKey=7ea83aed32b241fb9eaa37d4aad3ac71`)
            .then(response => response.json()).then(result => this._queryResult$.next(result))
    }
}
