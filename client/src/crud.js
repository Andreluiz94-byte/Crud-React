import React, { useState, useEffect } from 'react';
import './crud.css';
import Axios from 'axios';
import MedicosCadastrados from './MedicosCadastrados';

// Essa primeira seção são os imports que servem para definir as rotas de aplicação e a importação de dependências necessárias

function Crud() {  // essa função é muito importante pois ela serve para definir as variáveis armazenando seu valor e utiliza seu estado interno que é gerenciado pelo react 'usestate
    const [nome, setNome] = useState(''); // variável e a função que irá mudar conforme nessário através do uso do useState
    const [crm, setCrm] = useState('');
    const [telefone, setTelefone] = useState('');
    const [esp_medica, setEsp_medica] = useState('');
    const [cadastro_medico, setCadastro_medico] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [mostrarMedicosCadastrados, setMostrarMedicosCadastrados] = useState(false);

    useEffect(() => { // gancho do react que faz uma requisição do tipo GET para o servidor 
        Axios.get('http://localhost:3001/api/get')
            .then((response) => {
                setCadastro_medico(response.data);
            })
            .catch((error) => {
                console.error('Ocorreu um erro ao obter os dados:', error);
            });
    }, []);

    const enviar = () => {
        if (nome.trim() === '' || crm.trim() === '' || telefone.trim() === '' || esp_medica === '') { //método que verifica se o campo está vazio através do trim
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const data = { // objeto criado que contém as informações que serão enviadas à API
            nome: nome,
            crm: crm,
            telefone: telefone,
            esp_medica: esp_medica,
        };

        Axios.post('http://localhost:3001/api/insert', data)
            .then(() => {
                alert('Sucesso');
                // Atualiza a lista após a inserção
                Axios.get('http://localhost:3001/api/get')
                    .then((response) => {
                        setCadastro_medico(response.data);
                    })
                    .catch((error) => {
                        console.error('Ocorreu um erro ao obter os dados:', error);
                    });
            })
            .catch((error) => {
                alert('Ocorreu um erro ao enviar a solicitação: ' + error.message);
            });
    };

    const excluirItem = (id) => {
        Axios.delete(`http://localhost:3001/api/delete/${id}`)
            .then(() => {
                alert('Item excluído com sucesso');

                Axios.get('http://localhost:3001/api/get')
                    .then((response) => {
                        setCadastro_medico(response.data);
                    })
                    .catch((error) => {
                        console.error('Ocorreu um erro ao obter os dados:', error);
                    });
            })
            .catch((error) => {
                alert('Ocorreu um erro ao excluir o item: ' + error.message);
            });
    };

    const editarItem = (id) => {
        setEditingItemId(id);
    };

    const salvarEdicao = (id) => {
        if (nome.trim() === '' || crm.trim() === '' || telefone.trim() === '' || esp_medica === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const data = {
            nome: nome,
            crm: crm,
            telefone: telefone,
            esp_medica: esp_medica,
        };

        Axios.put(`http://localhost:3001/api/update/${id}`, data)
            .then(() => {
                alert('Item atualizado com sucesso');
                setEditingItemId(null); // Limpa o ID de edição
                // Atualiza a lista após a edição
                Axios.get('http://localhost:3001/api/get')
                    .then((response) => {
                        setCadastro_medico(response.data);
                    })
                    .catch((error) => {
                        console.error('Ocorreu um erro ao obter os dados:', error);
                    });
            })
            .catch((error) => {
                alert('Ocorreu um erro ao atualizar o item: ' + error.message);
            });
    };


    const especialidadesMedicas = [
        'Cardiologia',
        'Dermatologia',
        'Endocrinologia',
        'Gastroenterologia',
        'Neurologia',
        'Ortopedia',
        'Pediatria',
        'Psiquiatria',
        'Ginecologia',
    ];

    const handleNomeChange = (e) => { //manipulador de evento e recebe o argumento 'e'. essa função atualiza o estado da variável nome com o valor inserido no campo de entrada de nome conforme o usuário digita. O estado é atualizado usando a função setNome, que é fornecida pelo React para atualizar o estado de um componente funcional. 
        setNome(e.target.value);
    };

    const handleCrmChange = (e) => {
        const inputValue = e.target.value;
        // Remove caracteres não numéricos do valor do CRM
        const numericValue = inputValue.replace(/\D/g, '');
        setCrm(numericValue);
    };

    const handleTelefoneChange = (e) => {
        const inputValue = e.target.value;
        // Remove caracteres não numéricos do valor do telefone
        const numericValue = inputValue.replace(/\D/g, '');
        setTelefone(numericValue);
    };

    return (
        <div className="App">
            <h1>CRUD USANDO REACT</h1>
            {mostrarMedicosCadastrados ? (
                <div>
                    <button onClick={() => setMostrarMedicosCadastrados(false)}>Voltar</button>
                    <MedicosCadastrados cadastro_medico={cadastro_medico} />
                </div>
            ) : (

                <div className="form">
                    <h2>Cadastro médico</h2>

                    <label>Nome:</label>
                    <input type="text" name="nome" value={nome} onChange={handleNomeChange} className="input-small" />

                    <label>CRM:</label>
                    <input type="text" name="CRM" value={crm} onChange={handleCrmChange} className="input-small" />

                    <label>Telefone:</label>
                    <input type="text" name="telefone" value={telefone} onChange={handleTelefoneChange} className="input-small" />

                    <label>Especialidade Médica:</label>
                    <select
                        name="esp_medica"
                        value={esp_medica}
                        onChange={(e) => setEsp_medica(e.target.value)}
                        className="select-especialidade"
                    >
                        <option value="">Selecione uma especialidade médica</option>
                        {especialidadesMedicas.map((especialidade, index) => (
                            <option key={index} value={especialidade}>
                                {especialidade}
                            </option>
                        ))}
                    </select>

                    <button onClick={enviar}>Enviar</button>

                    <button onClick={() => setMostrarMedicosCadastrados(true)}>Ver Médicos Cadastrados</button>
                </div>
            )}
        </div>
    );
}

export default Crud;
