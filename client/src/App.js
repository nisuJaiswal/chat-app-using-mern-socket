import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import './App.css'

function App() {
  return (
    <>
      <div className="App">

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/chat' element={<Chat />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
