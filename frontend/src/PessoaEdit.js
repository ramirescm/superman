import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PessoaEdit extends Component {

    emptyItem = {
        nome: '',
        idade: '',
        sexo: '',
        endereco: '',
        dataNascimento: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'incluir') {
            const pessoa = await (await fetch(`/api/v1/pessoa/${this.props.match.params.id}`)).json();
            this.setState({item: pessoa});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleChangeDataNascimento() {
        //const target = event.target;
        //const dataNascimento = target.value;
        //console.log(dataNascimento)
        //var today = Date.now()
        //const idade = await fetch(`/api/v1/pessoa/${dataNascimento}/${today}`);
        console.log(this.state.item.dataNascimento)
        //this.idade = event.target.value
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;
        
        await fetch(`/api/v1/pessoa` + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/pessoa');
    }
    
    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Editar pessoa' : 'Adicionar pessoa'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input type="text" name="nome" id="nome" value={item.nome || ''}
                            onChange={this.handleChange} autoComplete="nome"/>
                    </FormGroup>
                     <FormGroup>
                        <Label for="dataNascimento">Data nascimento</Label>
                        <Input type="text" name="dataNascimento" id="dataNascimento" value={item.dataNascimento || ''}
                            onChange={this.handleChange}
                            autoComplete="dataNascimento" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="idade">Idade</Label>
                           <Input type="text" name="idade" id="idade" value={item.idade || ''}
                            onChange={this.handleChange} autoComplete="idade"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="sexo">Sexo</Label>
                        <Input type="text" name="sexo" id="sexo" value={item.sexo || ''}
                            onChange={this.handleChange} autoComplete="sexo"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="endereco">Endereço</Label>
                        <Input type="text" name="endereco" id="endereco" value={item.endereco || ''}
                            onChange={this.handleChange} autoComplete="endereco"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Salvar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/pessoa">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(PessoaEdit);
