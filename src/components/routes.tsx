import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

//* common for services
import Auth from "../Root/pages/Auth/Auth"
import RequireAuth from "./RequireAuth/RequireAuth"

import { Loader } from "./UI/Loader/Loader"
const PageNotFound = lazy(() => import("../Error/PageNotFound"))
const Profile = lazy(() => import("../Root/pages/Profile/Profile"))

//* Pro service
const ProApp = lazy(() => import("../SealurPro/App"))

const Main = lazy(() => import("../SealurPro/components/Layout/ProMain/Main"))
const Core = lazy(() => import("../SealurPro/pages/Core/Core"))
const Snp = lazy(() => import("../SealurPro/pages/Snp/Snp"))
const Putg = lazy(() => import("../SealurPro/pages/Putg/Putg"))
const Putgm = lazy(() => import("../SealurPro/pages/Putgm/Putgm"))
const Survey = lazy(() => import("../SealurPro/pages/Survey/Survey"))
const List = lazy(() => import("../SealurPro/pages/List/List"))
const Orders = lazy(() => import("../SealurPro/pages/Orders/Orders"))

//* Pro service Admin
const Admin = lazy(() => import("../SealurPro/components/Layout/ProAdmin/Admin"))
const AdminSnp = lazy(() => import("../SealurPro/pages/Admin/Snp/Snp"))
const AdminPutg = lazy(() => import("../SealurPro/pages/Admin/Putg/Putg"))
const AdminPutgm = lazy(() => import("../SealurPro/pages/Admin/Putgm/Putgm"))
const AdminSurvey = lazy(() => import("../SealurPro/pages/Admin/Survey/Survey"))

//* Moment service
const MomentApp = lazy(() => import("../Moment/App"))

const MomentHome = lazy(() => import("../Moment/pages/Home/Home"))
const MomentMain = lazy(() => import("../Moment/components/layout/Main"))
const MomentFlange = lazy(() => import("../Moment/pages/Flange/Flange"))
const MomentFlangeResult = lazy(() => import("../Moment/pages/Flange/Result"))
const MomentCap = lazy(() => import("../Moment/pages/Cap/Cap"))
const MomentCapResult = lazy(() => import("../Moment/pages/Cap/Result"))

//* Moment service Admin
const MomentAdmin = lazy(() => import("../Moment/pages/Admin/Admin"))
const MomentAdminMaterials = lazy(() => import("../Moment/pages/Admin/Materials/Materials"))
const MomentAdminGaskets = lazy(() => import("../Moment/pages/Admin/Gaskets/Gaskets"))
const MomentAdminStandarts = lazy(() => import("../Moment/pages/Admin/Standarts/Standarts"))
const MomentAdminBolts = lazy(() => import("../Moment/pages/Admin/Bolts/Bolts"))

//* New Pro service
const NewProApp = lazy(() => import("../NewPro/App"))

const NewProMain = lazy(() => import("../NewPro/pages/Main/Main"))

//* Urls
export const ProAdminUrl = "/pro/admin"
export const ProUrl = "/pro"
export const ProfileUrl = "/"
export const OrderUrl = "/pro/orders"

export const MomentUrl = "/moment"

export const MyRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path='/auth' element={<Auth />} />
                <Route
                    path='/'
                    element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    }
                />

                {/* section pro  */}
                <Route path='/pro' element={<ProApp />}>
                    <Route path='' element={<Main />}>
                        <Route path='new' element={<NewProApp />}>
                            <Route index element={<NewProMain />} />
                        </Route>

                        <Route
                            path=''
                            element={
                                <RequireAuth>
                                    <Core />
                                </RequireAuth>
                            }
                        >
                            <Route index element={<Snp />} />
                            <Route path='putg' element={<Putg />} />
                            <Route path='putgm' element={<Putgm />} />
                        </Route>
                        <Route path='survey' element={<Survey />} />
                        <Route
                            path='list'
                            element={
                                <RequireAuth>
                                    <List />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='orders'
                            element={
                                <RequireAuth>
                                    <Orders />
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route
                        path='admin'
                        element={
                            <RequireAuth>
                                <Admin />
                            </RequireAuth>
                        }
                    >
                        <Route index element={<AdminSnp />} />
                        <Route path='putg' element={<AdminPutg />} />
                        <Route path='putgm' element={<AdminPutgm />} />
                    </Route>
                    <Route
                        path='admin/survey'
                        element={
                            <RequireAuth>
                                <AdminSurvey />
                            </RequireAuth>
                        }
                    />
                </Route>

                {/* moment pro  */}
                <Route
                    path='/moment'
                    element={
                        <RequireAuth>
                            <MomentApp />
                        </RequireAuth>
                    }
                >
                    <Route index element={<MomentHome />} />
                    <Route path='' element={<MomentMain />}>
                        <Route path='flange' element={<MomentFlange />}>
                            <Route path='result' element={<MomentFlangeResult />} />
                        </Route>
                        <Route path='cap' element={<MomentCap />}>
                            <Route path='result' element={<MomentCapResult />} />
                        </Route>
                    </Route>

                    <Route path='admin' element={<MomentAdmin />}>
                        <Route path='edit/materials' element={<MomentAdminMaterials />} />
                        <Route path='edit/gaskets' element={<MomentAdminGaskets />} />
                        <Route path='edit/standarts' element={<MomentAdminStandarts />} />
                        <Route path='edit/bolts' element={<MomentAdminBolts />} />
                    </Route>
                </Route>

                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </Suspense>
    )
}
