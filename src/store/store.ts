import { init, RematchDispatch, RematchRootState } from "@rematch/core"
import immerPlugin from "@rematch/immer"
import { models, RootModel } from "./models"

// TODO убрать devtools
export const store = init<RootModel>({
    name: "root",
    models,
    plugins: [immerPlugin()],
    redux: {
        devtoolOptions: {
            actionSanitizer: action => action,
            disabled: false,
        },
    },
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
