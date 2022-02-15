import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

import { Main } from "./Layout/Main"
import Core from "../pages/Core/Core"
import Auth from "../pages/Auth/Auth"
import RequireAuth from "./RequireAuth/RequireAuth"
// import ListsPage from "../pages/Lists/Lists"

const Snp = lazy(() => import("../pages/Snp/Snp"))
const Putg = lazy(() => import("../pages/Putg/Putg"))
const Putgm = lazy(() => import("../pages/Putgm/Putgm"))

const Survey = lazy(() => import("../pages/Survey/Survey"))
// const NotFoundPage = lazy(() => import("../pages/NotFound/NotFound"))

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />}>
                <Route path='/' element={<Core />}>
                    <Route index element={<Snp />} />
                    <Route path='putg' element={<Putg />} />
                    <Route path='putgm' element={<Putgm />} />
                </Route>
                <Route path='survey' element={<Survey />} />
            </Route>
            <Route path='/protected' element={<Main />}>
                <Route
                    index
                    element={
                        <RequireAuth>
                            <Core />
                        </RequireAuth>
                    }
                />
            </Route>
            <Route path='/auth/' element={<Auth />} />
            {/*     <Route path='*' element={<NotFoundPage />} /> */}
        </Routes>
    )
}
