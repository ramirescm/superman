import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class PessoaList extends Component {

    constructor(props) {
        super(props);
        this.state = {pessoas: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/api/v1/pessoa')
            .then(response => response.json())
            .then(data => this.setState({pessoas: data}));
    }

    async remove(id) {
        await fetch(`/api/v1/pessoa/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPeople = [...this.state.pessoas].filter(i => i.id !== id);
            this.setState({pessoas: updatedPeople});
        });
    }

    render() {
        const { pessoas, isLoading } = this.state;
        
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const pessoaList = pessoas.map(pessoa => {
            return <tr key={pessoa.id}>
            <td style={{whiteSpace: 'nowrap'}}>{pessoa.nome}</td>
            <td>{pessoa.dataNascimento}</td>
            <td>{pessoa.idade}</td>
            <td>{pessoa.sexo}</td>
            <td>{pessoa.endereco}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/pessoa/" + pessoa.id}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(pessoa.id)}>Remover</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/pessoa/incluir">Adicionar</Button>
                    </div>
                    <h3>Pessoas</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Nome</th>
                            <th width="30%">Data nascimento</th>
                            <th width="30%">Idade</th>
                            <th width="30%">Sexo</th>
                            <th width="30%">Endereço</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pessoaList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
    }
export default PessoaList;
