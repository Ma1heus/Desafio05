import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;

  background-color: black;

  height: 89.8vh;
`;

const Pesquisa = styled.div`
  display: flex;
  align-items: center;

  padding: 2vw;
  border: 2px solid lightblue;
  border-radius: 5px;
  width: 34vw;
  margin-top: 1vw;
  margin-left: 1vw;
  margin-bottom: 4vw;
  h2 {
    font-size: 2vw;
    margin-right: 20px;

    color: white;
    border-bottom: 1px solid white;
  }
`;

const Input = styled.input`
  border: none;

  width: 20vw;
  height: 2vw;

  border-radius: 1vw;

  border: 2px solid black;

  background-color: white;
  color: black;
`;

const Content = styled.div`
  width: 20vw;
  padding: 1vw;
  transition: 0.4s;
  border: 2px solid lightblue;
  border-radius: 1vw;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 15vw;
  height: 20vw;
  border: 2px solid white;
`;

const Titulo = styled.p`
  margin-bottom: 1vw;
  font-size: 2vw;
  width: 100%;

  text-align: center;

  color: white;
`;

const apiSeries = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/tv/popular?api_key=26e5f43f9d38eadfcb04630aa4facfeb&language=en-US&page=1"
});
export default class App extends Component {
  state = {
    conteudo: [],
    procurar: []
  };

  componentDidMount() {
    this.getSeries();
  }

  getSeries = async () => {
    const response = await apiSeries.get();
    const series = response.data.results.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
      };
    });

    this.setState({
      conteudo: series,
      procurar: series
    });
  };

  handleChange = (e) => {
    const seriesTitulo = this.state.conteudo.filter((item) => {
      if (item.title.includes(e.target.value)) {
        return true;
      }
    });
    this.setState({
      procurar: seriesTitulo
    });
  };

  render() {
    return (
      <Box>
        <GlobalStyle />
        <Pesquisa>
          <h2>Pesquisar</h2>
          <Input
            type="text"
            placeholder="      Séries..."
            onChange={this.handleChange}
          />
        </Pesquisa>
        <Carousel wrapAround={true} slidesToShow={4}>
          {this.state.procurar.map((item, index) => (
            <Content key={index}>
              <Titulo>{item.title}</Titulo>
              <Img src={item.poster_path} alt={`Banner de ${item.title}`} />
            </Content>
          ))}
        </Carousel>
      </Box>
    );
  }
}
