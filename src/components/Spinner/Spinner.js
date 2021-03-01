import React, { useEffect } from 'react';
import {Spinner as BSpinner } from 'react-bootstrap';
import styles from './spinnerStyles.module.css'




export default function Spinner() {

    useEffect(()=>{
        document.body.style.overflow = "hidden";

        return ()=>{
            document.body.style.overflow = "auto";
        }
    },[]);


    return (
        <div className={styles.spinnerBox}>
            <BSpinner className={styles.spinner} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </BSpinner>
        </div>
    )
}