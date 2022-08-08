import { Route, Routes } from "react-router-dom";
import AboutPage from "../pages/about/About";
import CreateActivity from "../pages/activities/CreateActivity";
import Intervals from "../pages/intervals/Intervals";
import Periods from "../pages/periods/Periods";
import Home from "../pages/home/Home";
import Activities from "../pages/activities/activities";
import CreateInterval from "../pages/intervals/CreateInterval";
import CreatePeriod from "../pages/periods/CreatePeriod";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Root */}
            <Route path='/' element={<Home />}></Route>
            {/* Activities routes */}
            <Route path='/activities' element={<Activities />}></Route>
            <Route path="/activities/create" element={<CreateActivity />}></Route>
            {/* Periods routes */}
            <Route path='/periods' element={<Periods />}></Route>
            <Route path='/periods/create' element={<CreatePeriod />}></Route>
            {/* Intervals routes */}
            <Route path='/intervals' element={<Intervals />}></Route>
            <Route path="/intervals/create" element={<CreateInterval />}></Route>
            {/* About routes */}
            <Route path='/about' element={<AboutPage />}></Route>
            {/* <Route path='/wizard' element={<HorizontalLinearStepper steps={createActivitySteps}/>}></Route> */}
        </Routes>
    )
}