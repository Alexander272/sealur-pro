import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

//* common for services
import Auth from "../Auth/pages/Auth/Auth"
import RequireAuth from "./RequireAuth/RequireAuth"

import { Loader } from "./UI/Loader/Loader"
// const NotFoundPage = lazy(() => import("../pages/NotFound/NotFound"))

//* Pro service
const ProApp = lazy(() => import("../SealurPro/App"))

const Main = lazy(() => import("../SealurPro/components/Layout/ProMain/Main"))
const Core = lazy(() => import("../SealurPro/pages/Core/Core"))
// import ListsPage from "../pages/Lists/Lists"
const Snp = lazy(() => import("../SealurPro/pages/Snp/Snp"))
const Putg = lazy(() => import("../SealurPro/pages/Putg/Putg"))
const Putgm = lazy(() => import("../SealurPro/pages/Putgm/Putgm"))
const Survey = lazy(() => import("../SealurPro/pages/Survey/Survey"))

//* Pro service Admin
const Admin = lazy(() => import("../SealurPro/components/Layout/ProAdmin/Admin"))
const AdminSnp = lazy(() => import("../SealurPro/pages/Admin/Snp/Snp"))
const AdminPutg = lazy(() => import("../SealurPro/pages/Admin/Putg/Putg"))
const AdminPutgm = lazy(() => import("../SealurPro/pages/Admin/Putgm/Putgm"))

export const MyRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path='/auth/' element={<Auth />} />
                {/*     <Route path='*' element={<NotFoundPage />} /> */}

                <Route path='/' element={<ProApp />}>
                    <Route path='/' element={<Main />}>
                        <Route path='/' element={<Core />}>
                            <Route index element={<Snp />} />
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
                </Route>
            </Routes>
        </Suspense>
    )
}
