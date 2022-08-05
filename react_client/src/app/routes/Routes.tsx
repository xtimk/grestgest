import { Route, Routes } from "react-router-dom";
import AboutPage from "../pages/about/AboutPage";
import Activities from "../pages/activities/activities";
import CreateActivity from "../pages/activities/CreateActivity";
import Intervals from "../pages/intervals/Intervals";
import Periods from "../pages/periods/Periods";
import Home from "../pages/home/Home";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/activities' element={<Activities />}></Route>
            <Route path='/about' element={<AboutPage />}></Route>
            {/* <Route path='/wizard' element={<HorizontalLinearStepper steps={createActivitySteps}/>}></Route> */}
            <Route path='/periods' element={<Periods />}></Route>
            <Route path='/intervals' element={<Intervals />}></Route>
            <Route path="/activities/create" element={<CreateActivity />}></Route>
        </Routes>
    )
}