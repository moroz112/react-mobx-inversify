import * as React from 'react';
import { resolve } from 'inversify-react'
import { observer } from 'mobx-react';

import { NewsArticle } from "../news-collection/news-collection.store";
import { map, switchMap } from "rxjs/operators";
import { interval, Observable } from "rxjs";

export interface MainNewsComponentProps {
    news: NewsArticle
}

@observer
export class MainNewsComponent extends React.Component<MainNewsComponentProps> {

    render() {
        const {news} = this.props;

        return (news
                ? <div className="main-news">
                    <div className="main-news__title">{news.title}</div>
                    <img className="main-news__image" src={news.urlToImage}/>
                    <div className="main-news__description">{news.description}</div>
                  </div>
                : null
        )
    }
}