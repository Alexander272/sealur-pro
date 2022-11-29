import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

//* common for services
import Auth from "../Root/pages/Auth/Auth"
import RequireAuth from "./RequireAuth/RequireAuth"

import { Loader } from "./UI/Loader/Loader"
const PageNotFound = lazy(() => import("../Error/PageNotFound"))
const Main = lazy(() => import("../Root/components/Layout/Main"))
const Home = lazy(() => import("../Root/pages/Home/Home"))
const Profile = lazy(() => import("../Root/pages/Profile/Profile"))
const Services = lazy(() => import("../Root/pages/Services/Services"))
const Users = lazy(() => import("../Root/pages/Users/Users"))

//* Pro service
const ProApp = lazy(() => import("../SealurPro/App"))

const ProMain = lazy(() => import("../SealurPro/components/Layout/ProMain/Main"))
const ProCore = lazy(() => import("../SealurPro/pages/Core/Core"))
const ProSnp = lazy(() => import("../SealurPro/pages/Snp/Snp"))
const ProPutg = lazy(() => import("../SealurPro/pages/Putg/Putg"))
const ProPutgm = lazy(() => import("../SealurPro/pages/Putgm/Putgm"))
const ProSurvey = lazy(() => import("../SealurPro/pages/Survey/Survey"))
const ProList = lazy(() => import("../SealurPro/pages/List/List"))
const ProOrders = lazy(() => import("../SealurPro/pages/Orders/Orders"))

//* Pro service Admin
const ProAdmin = lazy(() => import("../SealurPro/components/Layout/ProAdmin/Admin"))
const ProAdminSnp = lazy(() => import("../SealurPro/pages/Admin/Snp/Snp"))
const ProAdminPutg = lazy(() => import("../SealurPro/pages/Admin/Putg/Putg"))
const ProAdminPutgm = lazy(() => import("../SealurPro/pages/Admin/Putgm/Putgm"))
const ProAdminSurvey = lazy(() => import("../SealurPro/pages/Admin/Survey/Survey"))

//* Moment service
const MomentApp = lazy(() => import("../Moment/App"))

const MomentHome = lazy(() => import("../Moment/pages/Home/Home"))
const MomentMain = lazy(() => import("../Moment/components/layout/Main"))
const MomentFlange = lazy(() => import("../Moment/pages/Flange/Flange"))
const MomentFlangeForm = lazy(() => import("../Moment/pages/Flange/Form"))
const MomentFlangeResult = lazy(() => import("../Moment/pages/Flange/Result"))
const MomentCap = lazy(() => import("../Moment/pages/Cap/Cap"))
const MomentCapForm = lazy(() => import("../Moment/pages/Cap/Form"))
const MomentCapResult = lazy(() => import("../Moment/pages/Cap/Result"))
const MomentFloatingHead = lazy(() => import("../Moment/pages/FloatingHead/FloatingHead"))
const MomentFloatingHeadFrom = lazy(() => import("../Moment/pages/FloatingHead/Form"))
const MomentFloatingHeadResult = lazy(() => import("../Moment/pages/FloatingHead/Result"))
const MomentDevCooling = lazy(() => import("../Moment/pages/DevCooling/DevCooling"))
const MomentDevCoolingForm = lazy(() => import("../Moment/pages/DevCooling/Form"))
const MomentDevCoolingResult = lazy(() => import("../Moment/pages/DevCooling/Result"))
const MomentGasCooling = lazy(() => import("../Moment/pages/GasCooling/GasCooling"))
const MomentGasCoolingForm = lazy(() => import("../Moment/pages/GasCooling/Form"))
const MomentGasCoolingResult = lazy(() => import("../Moment/pages/GasCooling/Result"))
const MomentExCircle = lazy(() => import("../Moment/pages/ExCircle/ExCircle"))
const MomentExCircleForm = lazy(() => import("../Moment/pages/ExCircle/Form"))
const MomentExCircleResult = lazy(() => import("../Moment/pages/ExCircle/Result"))
const MomentExRect = lazy(() => import("../Moment/pages/ExRect/ExRect"))
const MomentExRectForm = lazy(() => import("../Moment/pages/ExRect/Form"))
const MomentExRectResult = lazy(() => import("../Moment/pages/ExRect/Result"))

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
export const ProfileUrl = "/profile"
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
                            <Main />
                        </RequireAuth>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path='services' element={<Services />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='users/:page' element={<Users />} />
                </Route>

                {/* section pro  */}
                <Route path='/pro' element={<ProApp />}>
                    <Route path='' element={<ProMain />}>
                        <Route path='new' element={<NewProApp />}>
                            <Route index element={<NewProMain />} />
                        </Route>

                        <Route
                            path=''
                            element={
                                <RequireAuth>
                                    <ProCore />
                                </RequireAuth>
                            }
                        >
                            <Route index element={<ProSnp />} />
                            <Route path='putg' element={<ProPutg />} />
                            <Route path='putgm' element={<ProPutgm />} />
                        </Route>
                        <Route path='survey' element={<ProSurvey />} />
                        <Route
                            path='list'
                            element={
                                <RequireAuth>
                                    <ProList />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='orders'
                            element={
                                <RequireAuth>
                                    <ProOrders />
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route
                        path='admin'
                        element={
                            <RequireAuth>
                                <ProAdmin />
                            </RequireAuth>
                        }
                    >
                        <Route index element={<ProAdminSnp />} />
                        <Route path='putg' element={<ProAdminPutg />} />
                        <Route path='putgm' element={<ProAdminPutgm />} />
                    </Route>
                    <Route
                        path='admin/survey'
                        element={
                            <RequireAuth>
                                <ProAdminSurvey />
                            </RequireAuth>
                        }
                    />
                </Route>

                {/* moment */}
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
                            <Route index element={<MomentFlangeForm />} />
                            <Route path='result' element={<MomentFlangeResult />} />
                        </Route>
                        <Route path='flange/result' element={<MomentFlangeResult />} />
                        <Route path='cap' element={<MomentCap />}>
                            <Route index element={<MomentCapForm />} />
                            <Route path='result' element={<MomentCapResult />} />
                        </Route>
                        <Route path='floating-head' element={<MomentFloatingHead />}>
                            <Route index element={<MomentFloatingHeadFrom />} />
                            <Route path='result' element={<MomentFloatingHeadResult />} />
                        </Route>
                        <Route path='dev-cooling' element={<MomentDevCooling />}>
                            <Route index element={<MomentDevCoolingForm />} />
                            <Route path='result' element={<MomentDevCoolingResult />} />
                        </Route>
                        <Route path='gas-cooling' element={<MomentGasCooling />}>
                            <Route index element={<MomentGasCoolingForm />} />
                            <Route path='result' element={<MomentGasCoolingResult />} />
                        </Route>
                        <Route path='express-circle' element={<MomentExCircle />}>
                            <Route index element={<MomentExCircleForm />} />
                            <Route path='result' element={<MomentExCircleResult />} />
                        </Route>
                        <Route path='express-rectangle' element={<MomentExRect />}>
                            <Route index element={<MomentExRectForm />} />
                            <Route path='result' element={<MomentExRectResult />} />
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
