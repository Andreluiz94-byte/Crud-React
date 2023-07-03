import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './editarcadastro.css';

function MedicosCadastrados() {
    const [cadastro_medico, setCadastro_medico] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [nome, setNome] = useState('');
    const [crm, setCrm] = useState('');
    const [telefone, setTelefone] = useState('');
    const [esp_medica, setEsp_medica] = useState('');

    useEffect(() => {
        obterMedicosCadastrados();
    }, []);

    const obterMedicosCadastrados = () => {
        Axios.get('http://localhost:3001/api/get')
            .then((response) => {
                setCadastro_medico(response.data);
            })
            .catch((error) => {
                console.error('Ocorreu um erro ao obter os dados:', error);
            });
    };

    const excluirItem = (id) => {
        Axios.delete(`http://localhost:3001/api/delete/${id}`)
            .then(() => {
                alert('Item excluído com sucesso');
                obterMedicosCadastrados();
            })
            .catch((error) => {
                alert('Ocorreu um erro ao excluir o item: ' + error.message);
            });
    };

    const editarItem = (id) => {
        setEditingItemId(id);

        const item = cadastro_medico.find((val) => val.id === id);
        if (item) {
            setNome(item.nome);
            setCrm(item.crm);
            setTelefone(item.telefone);
            setEsp_medica(item.esp_medica);
        }
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
                setEditingItemId(null);
                setNome('');
                setCrm('');
                setTelefone('');
                setEsp_medica('');
                obterMedicosCadastrados();
            })
            .catch((error) => {
                alert('Ocorreu um erro ao atualizar o item: ' + error.message);
            });
    };

    return (
        <div className="container">
            <h2 className="heading">Médicos Cadastrados</h2>

            {cadastro_medico.length === 0 ? (
                <p className="message">Não há médicos cadastrados.</p>
            ) : (
                cadastro_medico.map((val) => (
                    <div className={`card ${val.id === editingItemId ? 'editing' : ''}`} key={val.id}>
                        {val.id === editingItemId ? (
                            <div>
                                <div>
                                    <label htmlFor="nome">Nome:</label>
                                    <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="crm">CRM:</label>
                                    <input
                                        type="text"
                                        id="crm"
                                        value={crm}
                                        onChange={(e) => setCrm(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telefone">Telefone:</label>
                                    <input
                                        type="text"
                                        id="telefone"
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="esp_medica">Especialidade Médica:</label>
                                    <select
                                        id="esp_medica"
                                        value={esp_medica}
                                        onChange={(e) => setEsp_medica(e.target.value)}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Cardiologia">Cardiologia</option>
                                        <option value="Dermatologia">Dermatologia</option>
                                        <option value="Endocrinologia">Endocrinologia</option>
                                        <option value="Gastroenterologia">Gastroenterologia</option>
                                        <option value="Neurologia">Neurologia</option>
                                        <option value="Ortopedia">Ortopedia</option>
                                        <option value="Pediatria">Pediatria</option>
                                        <option value="Psiquiatria">Psiquiatria</option>
                                        <option value="Ginecologia">Ginecologia</option>
                                    </select>
                                </div>
                                <button onClick={() => salvarEdicao(val.id)}>Salvar</button>
                            </div>
                        ) : (
                            <div>
                                <p>Nome: {val.nome}</p>
                                <p>CRM: {val.crm}</p>
                                <p>Telefone: {val.telefone}</p>
                                <p>Especialidade Médica: {val.esp_medica}</p>
                                <div>
                                    <button onClick={() => excluirItem(val.id)}>Excluir</button>
                                    <button onClick={() => editarItem(val.id)}>Editar</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default MedicosCadastrados;
