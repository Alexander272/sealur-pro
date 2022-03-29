import { init, RematchDispatch, RematchRootState } from "@rematch/core"
import immerPlugin from "@rematch/immer"
import { models, ProModel } from "./models"

// TODO убрать devtools
export const store = init<ProModel>({
    name: "pro",
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
export type Dispatch = RematchDispatch<ProModel>
export type ProState = RematchRootState<ProModel>
