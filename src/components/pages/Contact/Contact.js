import React, {useState} from 'react';
import { Container, Row, Col ,Form, Button,  } from 'react-bootstrap';
import styles from './contact.module.css';



export default function Contact() {

    const requiredErrorMessage = "Field is required!";

    const [values, setValues] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null,
    });

    const handleChange = ({target: {name, value}}) =>{


        if(!value){
            setErrors({
                ...errors,
                [name] : requiredErrorMessage
            })
        }
        else{
            setErrors({
                ...errors,
                [name] : null
            })
        }

        if(name ==='email' && value){
            const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        
             if(!emailReg.test(value)){
                setErrors({
                    ...errors,
                    email : 'Invalid email!'
                })
             }
            

        }


        setValues({
            ...values,
            [name] : value
        })
        
    }

    const handleSubmit = () =>{
        const errorsArr = Object.values(errors);
        const errorExist = !errorsArr.every(el => el===null)

        
        const valuesArr = Object.values(values);
        const valuesExist = !valuesArr.some(el => el==='');

        if(valuesExist && !errorExist){
           

            fetch("http://localhost:3001/form", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            .then(async(response) => {
    
                const res = await response.json();
    
                if(response.status >=400 && response.status < 600){
                    if(res.error){
                        throw res.error;
                    }
                    else{
                        throw new Error('Something went wrong!')
                    }
                }
    
                console.log('Success');

                setValues({
                    name : '',
                    email : '',
                    message : '',
                })
                
            })
            .catch((error)=>{
                console.log('catch error', error)
            })
            
            return;
        }


      

        if(!valuesExist && !errorExist){

            setErrors({
                name: requiredErrorMessage,
                email: requiredErrorMessage,
                message: requiredErrorMessage,

            });
        }


    }




    return (
        <div >
            <Container >
                <Row className='justify-content-center'>
                    <Col xs={8}>
                        <Form className='mt-5'>
                            <h4 className='text-center mb-4'>Contact Us</h4>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control 
                                type="text" 
                                name='name' 
                                placeholder="Enter your name"
                                value={values.name}
                                onChange={handleChange}
                                className={errors.name ? styles.invalid : ""}
                                />
                                <Form.Text className="text-danger">
                                    {errors.name}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control 
                                type="email" 
                                name='email' 
                                placeholder="Enter your email" 
                                value={values.email}
                                onChange={handleChange}
                                className={errors.email ? styles.invalid : ""}
                                />
                                <Form.Text className="text-danger">
                                {errors.email}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Control 
                                as="textarea" 
                                name='message' 
                                rows={6} 
                                placeholder="Enter your message" 
                                value={values.message}
                                onChange={handleChange}
                                className={errors.message ? styles.invalid : ""}
                                />
                                <Form.Text className="text-danger">
                                    {errors.message}
                                </Form.Text>
                            </Form.Group>
                            <div className="text-center mt-4">
                                <Button 
                                className={styles.sumbitButton} 
                                variant="primary" 
                                onClick={handleSubmit}
                                >
                                Send
                                </Button>
                            </div>
                        </Form>
                    </Col> 
                </Row>
            </Container>

        </div>
    );
}