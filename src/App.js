import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Movies from "./components/Filmes";
import Serie from "./components/Series";
import Home from "./components/Home";

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    list-style:none;
    color: #111111;
  }
`;

const Header = styled.header`
  padding: 0.5vw;
  display: flex;
  justify-content: space-between;

  border-bottom: 2px solid blue;
  background-color: white;
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;

  margin-right: 1.5vw;
  padding: 0.5vw;
  font-size: 1.6vw;
`;

const Title = styled.h1`
  padding: 0.5vw;
  font-size: 2.5vw;
`;

const Item = styled.li`
  margin-left: 3vw;
  text-align: center;
  font-size: 1.3vw;

  &:hover {
    font-weight: 900;
  }
`;

const Filmes = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header>
        <Title>Filmes.Com</Title>
        <Ul>
          <Item>
            <Link to="/">Home</Link>
          </Item>
          <Item>
            <Link to="movies">Filmes</Link>
          </Item>
          <Item>
            <Link to="series">Séries</Link>
          </Item>
        </Ul>
      </Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="series" element={<Serie />} />
      </Routes>
    </Router>
  );
};

export default Filmes;
