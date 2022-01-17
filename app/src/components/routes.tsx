import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import { Main } from "./Layout/Main"
import Core from "../pages/Core/Core"
// import AuthPage from "../pages/Auth/Auth"
// import ListsPage from "../pages/Lists/Lists"

const Snp = lazy(() => import("../pages/Snp/Snp"))
const Putg = lazy(() => import("../pages/Putg/Putg"))
const Putgm = lazy(() => import("../pages/Putgm/Putgm"))
// const NotFoundPage = lazy(() => import("../pages/NotFound/NotFound"))

export const MyRoutes = () => {
    return (
        <Suspense fallback='loading...'>
            <Routes>
                <Route path='/' element={<Main />}>
                    <Route path='/' element={<Core />}>
                        <Route index element={<Snp />} />
                        <Route path='putg' element={<Putg />} />
                        <Route path='putgm' element={<Putgm />} />
                    </Route>
                </Route>
                {/*<Route path='/auth/' element={<AuthPage />} />
                <Route path='*' element={<NotFoundPage />} /> */}
            </Routes>
        </Suspense>
    )
}
