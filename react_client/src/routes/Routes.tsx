import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { WizardStep } from "../app/models/wizard";
import AboutPage from "../features/about/AboutPage";
import Activities from "../features/activities/activities";
import CreateActivity from "../features/activities/CreateActivity";
import Intervals from "../features/intervals/Intervals";
import Periods from "../features/periods/Periods";
import HorizontalLinearStepper from "../features/wizard/Wizard1";
import FormGroupElements from '../features/formgroup/FormGroup';
import Home from "../features/home/Home";
import { StepperElement } from "../app/models/stepperElement";

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