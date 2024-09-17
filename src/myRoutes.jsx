import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
const myRoutes=()=>(
<Routes>
    <Route path="/" element={<NavBar/>}></Route>
</Routes>
)

export default myRoutes;