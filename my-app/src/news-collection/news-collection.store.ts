import { injectable } from 'inversify';
import { observable, action } from 'mobx';
import { Observable, from, Subject, interval, of } from 'rxjs'
import { startWith, switchMapTo, switchMap, map, withLatestFrom, take } from "rxjs/operators";

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
    @observable
    private _mainNews: any;

    private mainNews$: any;

    queryResult$: Subject<NewsArticles> = new Subject();

    constructor() {
        this.queryResult$.pipe(
            startWith({articles: []})
        ).subscribe(result => {
            this._collection = result.articles
        });

        this.mainNews$ = this.queryResult$.pipe(
            switchMap((collection) => {

                return interval(1000).pipe(
                    map((intervalIndex) => {
                        return collection.articles[intervalIndex]
                    }),
                    take(collection.articles.length)
                )
            })
        ).subscribe(result => {
            this._mainNews = result
        });


        fetch(`https://newsapi.org/v2/top-headlines?q=trump&apiKey=7ea83aed32b241fb9eaa37d4aad3ac71`)
            .then(response => response.json())
            .then(result => this.queryResult$.next(result));


    }

    get collection() {
        return this._collection
    }

    get mainNews() {
        return this._mainNews
    }

    @action
    updateNewsArticles(query: string) {
        console.log('query', query);

        fetch(`https://newsapi.org/v2/top-headlines?q=${query}&apiKey=7ea83aed32b241fb9eaa37d4aad3ac71`)
            .then(response => response.json()).then(result => this.queryResult$.next(result))
    }
}
