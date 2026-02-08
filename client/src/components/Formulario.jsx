
"use client"

import styles from "@/components/estilos.module.css"
import React, { useState, useEffect } from 'react';
import url_backend from "../env";

// URL del Servidor del backend.
const url = `${url_backend}/empresas`;



function Formulario({ id }) {

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nit, setNit] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);


    useEffect(() => {
        validateForm();
    }, [nombre, direccion, nit, telefono, email]);

    const validateForm = () => {
        let errors = {};

        if (!nombre) {
            errors.nombre = 'El nombre es requerido';
        }
        if (!direccion) {
            errors.direccion = 'La dirección es requerida';
        }
        if (!nit) {
            errors.nit = 'El NIT es requerido';
        }
        if (!telefono) {
            errors.telefono = 'El teléfono es requerido';
        }

        if (!email) {
            errors.email = 'Email is required.';

        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isFormValid) {
            if (id == undefined) {

                const Empresa = {
                    nombre_empresa: nombre,
                    direccion: direccion,
                    nit: nit,
                    telefono: telefono,
                    correo: email
                };

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Empresa)
                })
                .then(res =>{
                    if(!res.ok){
                        alert(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .catch()
                 

            } else {

                const Empresa = {
                    nombre_empresa: nombre,
                    direccion: direccion,
                    nit: nit,
                    telefono: telefono,
                    correo: email
                };


                const response = await fetch(`${url}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Empresa)
                })

                const data = await response.json();

                if (!response.ok) {
                    alert(`HTTP error! status: ${response.status}`);
                } else {
                    alert('User Posted successfully: ' + JSON.stringify(data));
                }

            }


        } else {
            console.log('Form has errors. Please correct them.');
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <h1>Formulario De Registro </h1>
                <form id="Formulario" >
                    <div >
                        <input
                            className={styles.inputs}
                            placeholder="Nombre de la empresa"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        ></input>
                        {errors.nombre && <p >{errors.nombre}</p>}

                    </div>
                    <div>
                        <input
                            className={styles.inputs}
                            placeholder="Direccion"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        ></input>
                        {errors.direccion && <p >{errors.direccion}</p>}

                    </div>
                    <div>
                        <input
                            className={styles.inputs}
                            placeholder="Nit"
                            value={nit}
                            onChange={(e) => setNit(e.target.value)}
                        ></input>
                        {errors.nit && <p >{errors.nit}</p>}

                    </div>

                    <div>
                        <input
                            className={styles.inputs}
                            placeholder="Telefono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        ></input>
                        {errors.telefono && <p >{errors.telefono}</p>}

                    </div>
                    <div>
                        <input
                            className={styles.inputs}
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        {errors.email && <p >{errors.email}</p>}

                    </div>
                    <div>

                        <button
                            className={styles.inputsSub}
                            disabled={!isFormValid}
                            onClick={handleSubmit}

                        > Guardar </button>
                    </div>
                </form>
            </div>
            <footer>
            </footer>
        </main>
    )
}

export default Formulario;