import { Route, Routes } from "react-router-dom";
import AboutPage from "../features/about/AboutPage";
import Activities from "../features/activities/activities";
import CreateActivity from "../features/activities/CreateActivity";
import Intervals from "../features/intervals/Intervals";
import Periods from "../features/periods/Periods";
import Home from "../features/home/Home";

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