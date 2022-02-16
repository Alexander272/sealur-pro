import { Models } from "@rematch/core"
import { addit } from "./addit"
import { user } from "./user"

export interface RootModel extends Models<RootModel> {
    user: typeof user
    addit: typeof addit
}

export const models: RootModel = {
    user,
    addit,
}
