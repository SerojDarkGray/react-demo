import React from 'react';
import ShowCount from './ShowCount';
import SetCount from './SetCount/SetCount'
import styles from './counterStyle.module.css'
function Counter(){




    return(
        <div className={styles.counterBox}>

            <ShowCount  />
            <SetCount buttonStyle={styles.buttonStyle}/>

        </div>
    )

}

export default Counter;