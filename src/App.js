import LeftPanel from './components/leftPanel/LeftPanel';
import LoginEmployee from './pages/loginEmployee/LoginEmployee';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './generalStyles.scss';


function App() {
    return (
        <>
            {/* <LoginEmployee/>
<LeftPanel/> */}
            <Router>
                <Routes>
                    <Route path="/LeftPanel" element={<LeftPanel/>}/>
                    <Route path="/" element={<LoginEmployee/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
