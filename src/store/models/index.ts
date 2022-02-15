import { Models } from "@rematch/core"
import { flange } from "./flange"
import { user } from "./user"

export interface RootModel extends Models<RootModel> {
    user: typeof user
    flange: typeof flange
}

export const models: RootModel = {
    user,
    flange,
}
