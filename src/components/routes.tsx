import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

//* common for services
import Auth from "../pages/Auth/Auth"
import RequireAuth from "./RequireAuth/RequireAuth"

import { Loader } from "./UI/Loader/Loader"
// const NotFoundPage = lazy(() => import("../pages/NotFound/NotFound"))

//* Pro service
import { Main } from "./Layout/ProMain/Main"
import Core from "../pages/pro/Core/Core"
// import ListsPage from "../pages/Lists/Lists"
const Snp = lazy(() => import("../pages/pro/Snp/Snp"))
const NewSnp = lazy(() => import("../pages/pro/Snp/NewSnp"))
const Putg = lazy(() => import("../pages/pro/Putg/Putg"))
const Putgm = lazy(() => import("../pages/pro/Putgm/Putgm"))
const Survey = lazy(() => import("../pages/pro/Survey/Survey"))

//* Pro service Admin
const Admin = lazy(() => import("./Layout/ProAdmin/Admin"))
const AdminSnp = lazy(() => import("../pages/pro/Admin/Snp/Snp"))
const AdminPutg = lazy(() => import("../pages/pro/Admin/Putg/Putg"))
const AdminPutgm = lazy(() => import("../pages/pro/Admin/Putgm/Putgm"))

export const MyRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path='/auth/' element={<Auth />} />
                {/*     <Route path='*' element={<NotFoundPage />} /> */}

                <Route path='/' element={<Main />}>
                    <Route path='/' element={<Core />}>
                        <Route index element={<Snp />} />
                        <Route path='test' element={<NewSnp />} />
                        <Route path='putg' element={<Putg />} />
                        <Route path='putgm' element={<Putgm />} />
                    </Route>
                    <Route path='survey' element={<Survey />} />
                </Route>
                <Route path='/admin' element={<Admin />}>
                    <Route index element={<AdminSnp />} />
                    <Route path='putg' element={<AdminPutg />} />
                    <Route path='putgm' element={<AdminPutgm />} />
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
            </Routes>
        </Suspense>
    )
}
