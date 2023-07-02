import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import { styled } from "styled-components";

function App() {

  return (
    <BrowserRouter>
      <AppStyled>
        <Header />
        <Routes>
          <Route path="/" Component={Homepage} exact />
          <Route path="/coins/:id" Component={CoinPage} />
        </Routes>
      </AppStyled>
    </BrowserRouter>
  );
}

const AppStyled = styled.div`
    background-color: #14161a;
    color: white;
    min-height: 100vh;
`;

export default App;
