import { ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';
import { SomeStore } from './someStore';
import { NewsCollectionStore } from './news-collection/news-collection.store';


export const someModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<SomeStore>(SomeStore).toSelf().inSingletonScope();
    bind<NewsCollectionStore>(NewsCollectionStore).toSelf().inSingletonScope();
});