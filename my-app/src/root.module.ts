import { Container } from "inversify";
import { someModule } from "./some-module";

export const rootContainer = new Container();

rootContainer.load(
    someModule
);
