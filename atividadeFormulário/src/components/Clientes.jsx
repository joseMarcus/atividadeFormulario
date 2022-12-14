import { useState, useEffect } from "react";
import { Button, Form, Table} from "react-bootstrap";



function Clientes(){
    const [clientes, setClientes] = useState([]);
    const [adicionar, setAdicionar] = useState([]);
    const [consulta, setConsulta] = useState('');
    const [id] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [cep, setCep] = useState('');



    const [status, setStatus] = useState({
        type:'',
        mensagem:''
    })


    const handlesearch = (event) => {
        const search = event.target.value;
        setConsulta(search);

        if(search !== ''){
            const filterdata = clientes.filter( (item)=> {
                return Object.values(item).join('').includes(search)
            })
            setAdicionar(filterdata);
        } else{
            setAdicionar(clientes);
        }
    }
    
    const URL= 'http://localhost:3500';
    
    useEffect(()=>{
        const getcountry = async () => {
            const getres= await fetch(URL + '/clientes');
            const setcountry = await getres.json();
            setClientes(await setcountry);
        }
    getcountry();
    }, [])

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        this.setState({
          itemvalues: [{}]
        });
    };


    const handleSubmit = (e) => {
                e.preventDefault();
                if(!validate()) return;

                const saveDataForm = true;
                if(saveDataForm){
                    setStatus({
                        type: 'success',
                        mensagem: 'Cliente cadastrado com sucesso! Atualize a página'

                    })
                }


                const emp={nome, email, nascimento, cep}

                fetch(URL + '/clientes', {
                    method:"POST",
                    headers:{"content-type":"application/json"},
                    body: JSON.stringify(emp)
                }).then((response) => {
                }).catch((err) => {
                    console.log(err.message);
                })
    
    }

    function validate(){
        if(!nome) return setStatus({type: 'error', mensagem: 'Necessário preencher campo Nome'});
        if(!email) return setStatus({type: 'error', mensagem: 'Necessário preencher campo E-mail'});
        if(!nascimento) return setStatus({type: 'error', mensagem: 'Necessário preencher campo Nascimento'});
        if(!cep) return setStatus({type: 'error', mensagem: 'Necessário preencher campo CEP'});


        return true;
    }


    return(
        <>
            <h1>Clientes</h1>

            <h4>Cadastrar</h4>

            {status.type === 'success' ?<p style={{color:"blue"}}>{status.mensagem}</p>:""}
            {status.type === 'error' ?<p style={{color:"red"}}>{status.mensagem}</p>:""}

           
                <Form  onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                        disabled="disabled"
                        autoFocus
                        value={id}
                    />
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        autoFocus
                        value={nome} onChange={e=> setNome(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                    >
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control 
                        type="email"
                        className="mb-3"
                        value={email} onChange={e=> setEmail(e.target.value)}
                    />

                    <Form.Label>Nascimento</Form.Label>
                    <Form.Control 

                        value={nascimento} onChange={e=> setNascimento(e.target.value)}
                    />
                    <Form.Label>CEP</Form.Label>
                    <Form.Control 
                        value={cep} onChange={e=> setCep(e.target.value)} required 
                    />
                    </Form.Group>
                    
                </Form>
                <Button variant="danger" onClick={handleReset}>
                    Limpar
                </Button>
                <Button variant="primary" onClick={handleSubmit} >
                    Salvar
                </Button>
          

            <Form inline="true">
                <Form.Group >
                <Form.Label column sm="2">
                    <h4>Consultar</h4>
                </Form.Label>
                    <Form.Control 
                        className="mb-3"
                        onChange={(e)=> { handlesearch(e) }}
                        />
                </Form.Group>
            </Form>
    
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Nascimento</th>
                        <th>CEP</th>
                    </tr>
                </thead>
                <tbody>
                        {consulta.length > 0 ? (
                            adicionar.map((cliente, index) => (
                            <tr key={index}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.nascimento}</td>
                                <td>{cliente.cep}</td>
                            </tr>
                            ))):
                            (clientes.map((cliente, index)=>(
                            <tr key={index}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.nascimento}</td>
                                <td>{cliente.cep}</td>
                            </tr>
                            )))
                        }
                    </tbody>
            </Table>


        </>
    );

}

export default Clientes;