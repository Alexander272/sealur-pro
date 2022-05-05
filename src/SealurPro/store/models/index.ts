import { Models } from "@rematch/core"
import { addit } from "./addit"
import { list } from "./list"
import { putg } from "./putg"
import { snp } from "./snp"

export interface ProModel extends Models<ProModel> {
    addit: typeof addit
    snp: typeof snp
    putg: typeof putg
    list: typeof list
}

export const models: ProModel = {
    addit,
    snp,
    putg,
    list,
}
