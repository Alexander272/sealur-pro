import { Models } from "@rematch/core"
import { addit } from "./addit"
import { list } from "./list"
import { putg } from "./putg"
import { putgm } from "./putgm"
import { snp } from "./snp"

export interface ProModel extends Models<ProModel> {
    addit: typeof addit
    snp: typeof snp
    putg: typeof putg
    putgm: typeof putgm
    list: typeof list
}

export const models: ProModel = {
    addit,
    snp,
    putg,
    putgm,
    list,
}
