import { asClass, createContainer, InjectionMode } from "awilix";

export default class Setup {

    static getContainer() {

        return createContainer().loadModules(
            [
                "services/**/*.ts",
                "services/**/*.js"
            ],
            {
                cwd: __dirname,
                formatName: "camelCase",
                resolverOptions: {
                    injectionMode: InjectionMode.PROXY,
                    register: asClass
                }
            }
        );
    }

}