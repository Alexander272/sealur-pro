import { Models } from "@rematch/core"
import { addit } from "./addit"
import { snp } from "./snp"

export interface ProModel extends Models<ProModel> {
    addit: typeof addit
    snp: typeof snp
}

export const models: ProModel = {
    addit,
    snp,
}
