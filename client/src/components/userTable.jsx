"use client"

import React from "react";
import styles from "@/components/estilos.module.css"
import { useState } from "react";
import Modal from "./Modal";
import Formulario from "./Formulario";
import url_backend from "../env";

export default function Dato({ empresa }) {

    const [showModal, setShowModal] = useState(false);

    const deleteUsers = async id => {
        const url = `${url_backend}/empresas/${id}`;
        const response = await fetch(url, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            alert('User deleted successfully: ' + JSON.stringify(data));
        }
    };


    return (
        <div className={styles.table}>
            <div className={styles.datos}>
                <p className={styles.mismaClase}> {empresa.id} </p>
                <p className={styles.mismaClase}> {empresa.nombre_empresa} </p>
                <p className={styles.mismaClase}> {empresa.direccion} </p>
                <p className={styles.mismaClase}> {empresa.nit} </p>
                <p className={styles.mismaClase}> {empresa.correo} </p>
            </div>

            <div className={styles.botonDiv}>
                <button
                    onClick={() => {
                        deleteUsers(empresa.id);
                        alert("Usuario borrado");
                       
                    }}

                    style={{ backgroundColor: "green" }}
                    className={styles.boton}

                > Borrar </button>


                <button onClick={
                    () => setShowModal(true)

                } style={{ backgroundColor: "blue" }} className={styles.boton}> Editar </button>

                {
                    showModal &&
                    <Modal onClose={() => setShowModal(false)}>
                       <Formulario id={empresa.id} />
                    </Modal>
                }
            </div>

        </div>
    );
}


