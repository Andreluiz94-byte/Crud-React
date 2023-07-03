import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CrudPage from './crud';
import './App.css';

const HomePage = () => (
    <div className="container">
        <h1>Cadastro Médico</h1>
        <p>
            Bem-vindo ao sistema de cadastro médico. Aqui você pode cadastrar e gerenciar informações de médicos através de um aplicativo web desenvolvido com tecnologias modernas.
        </p>
        <p>
            Esta aplicação utiliza uma combinação de HTML, CSS e JavaScript para criar a interface de usuário. O React é utilizado como biblioteca do JavaScript para construir componentes reutilizáveis e como estudo para me aprofundar mais do desenvolvimento web.
        </p>
        <p>
            No lado do servidor, o Node.js é usado fazendo conexões com a API do banco de dados. O MySQL Workbench a ferramenta de gerenciamento visual para o banco de dados escolhida, permitindo a criação e manipulação de tabelas e registros. O objetivo do projeto é fazer um CRUD (Create, Read, Update, Delete), pois seus os conceitos são imprescindíveis para o desenvolvedor atual.
        </p>
        <img src="https://conteudo.imguol.com.br/c/noticias/60/2022/02/18/medico-consulta-medica-medicina-1645189373419_v2_900x506.jpg" alt="Imagem Profissional" />
        <Link to="/crud">
            <button>Começar</button>
        </Link>
    </div>
);

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/crud" element={<CrudPage />} />
        </Routes>
    </Router>
);

export default App;