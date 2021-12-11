import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Ciudad } from '../Components/Ciudad/ciudad.js';
// import { ListaVuelo } from '../Components/ListaVuelo/listaVuelo.js';
// import { Ruta } from '../Components/Ruta/ruta.js';
// import { Vuelo } from '../Components/Vuelo/vuelo.js';

const routes = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Ciudad/>}/>
            {/* <Route exact path="/vuelo/" element={<Vuelo/>}/>
            <Route exact path="/vuelo/:id" element={<Vuelo/>}/>
            <Route exact path="/listavuelo/" element={<ListaVuelo/>}/> */}
            <Route path="*" component={() => <div>404</div>} />
        </Routes>
    </BrowserRouter>
);

export default routes;