import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import axios from "axios";

import { Button, Form, Row, Col, Container, Table } from 'react-bootstrap';

import './ciudad.css';

export const Ciudad = () => {

    const [listaCiudadOrigen, setListaCiudadOrigen] = useState([]);
    const getListaCiudadesOrigen = async () => {
        await axios.get('http://localhost:8080/api/ciudadorigen/origen')
            .then(
                (response) => {
                    console.log(response.data);
                    setListaCiudadOrigen(response.data);
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    const [listaCiudadDestino, setListaCiudadDestino] = useState([]);
    const getListaCiudadesDestino = async (ciudad) => {
        await axios.get(`http://localhost:8080/api/ciudadorigen/destino/${ciudad}`)
            .then(
                (response) => {
                    setListaCiudadDestino(response.data);
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    const ciudadDestino = ({ target }) => {
        getListaCiudadesDestino(target.value);
    }

    const [listaVuelos, setListaVuelos] = useState([]);
    const getListaVuelos = async (ciudadOrigen, fecha, ciudadDestino) => {
        await axios.get(`http://localhost:8080/api/vuelos/vuelosida/${ciudadOrigen}&&${ciudadDestino}&&fecha?fechaVuelo=${fecha}`)
            .then(
                (response) => {
                    setListaVuelos(response.data);
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    const [listaVuelosRegreso, setListaVuelosRegreso] = useState([]);
    const getListaVuelosRegreso = async (ciudadDestino, fecha, ciudadOrigen) => {
        await axios.get(`http://localhost:8080/api/vuelos/vuelosregreso/${ciudadDestino}&&${ciudadOrigen}&&fecha?fechaVuelo=${fecha}`)
            .then(
                (response) => {
                    setListaVuelosRegreso(response.data);
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
    }

    const [input, setInput] = useState('');
    const [cOrigen, setCOrigen] = useState('');

    function cambiar(e) {
        setCOrigen(e.target.value);
    }

    const vuelosIda = (e) => {
        getListaVuelos(e.target.value);
    }

    const [cDestino, setCDestino] = useState('');
    const ciudadDestSeleccionada = (e) => {
        setCDestino(e.target.value);
    }

    const vuelosRegreso = (e) => {
        getListaVuelosRegreso(e.target.value);
    }

    const [checkedIda, setCheckedIda] = useState([]);
    const [checkedRegreso, setCheckedRegreso] = useState([]);

    const [cantidad, setCantidad] = useState('');
    console.log(cantidad);

    const [precioTotal, setPrecioTotal] = useState('');
    const calculoPrecioTotal = (precioIda, precioRegreso, cantidadPersonas) => {
        console.log("Precio Ida " + precioIda + ", Precio Regreso " + precioIda + ", Cantidad " + cantidadPersonas);
        var pIda = precioIda * cantidadPersonas;
        var pRegreso = precioRegreso * cantidadPersonas;
        var pTotal = pIda + pRegreso;
        console.log(pTotal);
        setPrecioTotal(pTotal);
    }

    useEffect(() => {
        getListaCiudadesOrigen();
        getListaCiudadesDestino();
        getListaVuelos();
        getListaVuelosRegreso();
    }, [])

    return (
        <div className="Ciudad">
            <div className="info">
                <Container>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Row>
                                <Col>
                                    <Form.Label column sm={2}>Ciudad Origen</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Select onChange={(e) => { ciudadDestino(e); cambiar(e); }} aria-label="Default select example">
                                        <option>Seleccione Ciudad</option>
                                        {
                                            listaCiudadOrigen.map(
                                                (ciudad, i) => {
                                                    return (
                                                        <option key={"ciudad" + i} value={ciudad}>{ciudad}</option>
                                                    )
                                                }
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col></Col>
                                <Col>
                                    <Form.Label column sm={2}>Ciudad Destino</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Select onChange={(e) => { ciudadDestSeleccionada(e); }} aria-label="Default select example">
                                        <option>Seleccione Ciudad</option>
                                        {
                                            listaCiudadDestino.map(
                                                (ciudad, i) => {
                                                    return (
                                                        <option key={"ciudad" + i}>{ciudad}</option>
                                                    )
                                                }
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Cantidad de Pasajeros</Form.Label>
                            <Col sm="2">
                                <Form.Control type="text" placeholder="Digite la Cantidad" value={cantidad} onInput={e => setCantidad(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Fecha de Viaje</Form.Label>
                            <Col sm="2">
                                <input type="date" value={input} onInput={e => setInput(e.target.value)}></input>
                            </Col>
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={(e) => { getListaVuelos(cOrigen, input, cDestino); vuelosIda(e); }}>Continuar</Button>
                </Container>
            </div>
            <div className="tablaVuelosIda">
                <h1>Vuelos de Ida</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Hora</th>
                            <th>Duración</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaVuelos.map(
                                (vuelo, i) => {
                                    return (
                                        <tr key={"vuelo" + i}>
                                            <td>
                                                <Form>
                                                    {['checkbox'].map((type) => (
                                                        <div key={`default-${type}`} checkedIda={checkedIda} onChange={() => setCheckedIda(vuelo[3])} className="mb-3">
                                                            <Form.Check
                                                                type={type}
                                                                id={`default-${type}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </Form>
                                            </td>
                                            <td>{vuelo[0]}</td>
                                            <td>{vuelo[1]}</td>
                                            <td>{vuelo[2]}</td>
                                            <td>{vuelo[3]}</td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </Table>
                <Button variant="primary" onClick={(e) => { getListaVuelosRegreso(cDestino, input, cOrigen); vuelosRegreso(e); }}>Continuar</Button>
            </div>
            <div className="tablaVuelosRegreso">
                <h1>Vuelos de Regreso</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Hora</th>
                            <th>Duración</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaVuelosRegreso.map(
                                (vuelo, i) => {
                                    return (
                                        <tr key={"vuelo" + i}>
                                            <td>
                                                <Form>
                                                    {['checkbox'].map((type) => (
                                                        <div key={`default-${type}`} checkedRegreso={checkedRegreso} onChange={() => setCheckedRegreso(vuelo[3])} className="mb-3">
                                                            <Form.Check
                                                                type={type}
                                                                id={`default-${type}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </Form>
                                            </td>
                                            <td>{vuelo[0]}</td>
                                            <td>{vuelo[1]}</td>
                                            <td>{vuelo[2]}</td>
                                            <td>{vuelo[3]}</td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </Table>
            </div>
            <div className="tablaVuelosPrecio">
                <h1>Precio de los Vuelos</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Vuelo Ida</th>
                            <th>Vuelo Regreso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>{checkedIda}</td>
                            <td>{checkedRegreso}</td>
                        </tr>
                    </tbody>
                </Table>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">Precio total</Form.Label>
                    <Col sm="2">
                        <input type="text" placeholder="Precio Total" value={precioTotal}></input>
                    </Col>
                </Form.Group>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="2">
                            <Button variant="danger">Cancelar</Button>
                        </Col>
                        <Col md="auto"></Col>
                        <Col xs lg="2">
                            <Button variant="primary" onClick={() => calculoPrecioTotal(checkedIda, checkedRegreso, cantidad)}>Continuar</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >
    );
}