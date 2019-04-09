import { ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';
import { SomeStore } from './someStore';


export const someModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<SomeStore>(SomeStore).toSelf().inSingletonScope();
});

export default someModule;