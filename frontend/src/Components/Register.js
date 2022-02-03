import React  from 'react';
import {Formik} from 'formik'
import './Register.css'


const FormRegister = ()=>{
    
    return(
    <>
    <div className='contenedor'>
        <Formik
        initialValues={{
            name:"",
            lastname:"",
            email:"",
            password:"",
            passwordconfirmado:""
        }}
        validate={(valores)=>{
            let errores={}
            if(!valores.name){
                errores.name="ingrese un nombre"
            }else if(! /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)){
                errores.name="el nombre solo puede contener espacios y letras"
            }
            if(!valores.lastname){
                errores.lastname="ingrese un apellido"
            }else if(! /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastname)){
                errores.lastname="el nombre solo puede contener espacios y letras"
            }
            if(valores.passwordconfirmado!== valores.password){
                errores.passwordconfirmado="la contraseña no coincide con la ingresada anteriormente"
            }
            if(!valores.password){
                errores.password="ingrese una contraseña"
            }
            return errores;
        }}

        onSubmit={(valores,{resetForm}) =>{
            resetForm();
            alert("felicitaciones haz sido registrado ")

            //enviar datos
            console.log(valores)//estan todos los datos en un objeto
        }}
        >
            {({values, handleSubmit,handleChange, handleBlur, errors, touched})=>(
                <form className='login-wrapper' onSubmit={handleSubmit} >
           
                <div>
                    <label name='name' >Nombre</label>
                    <input 
                    type= 'text' 
                    name='name' 
                    placeholder='Juan'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}>       
                    </input>
                {touched.name && errors.name &&<div className='error'>{errors.name}</div> }
                </div>
                <div>
                    <label name='lastname' >Apellido</label>
                    <input 
                    type= 'text'
                    name='lastname' 
                    placeholder='Perez'
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}>
                    </input>
                {touched.lastname && errors.lastname && <div className='error'>{errors.lastname}</div> }

                </div>
                <div >
                    <label name='email' >Email</label>
                    <input 
                    type= 'email' 
                    name='email' 
                    placeholder='Juan@Perez.com'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}></input>
                </div>
                <div >
                    <label name='password' >contraseña</label>
                    <input 
                    type= 'password' 
                    name='password' 
                    placeholder='ingresa tu contraseña'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}>
                    </input>
                {touched.password && errors.password && <div className='error'>{errors.password}</div> }

                </div>
                <div >
                    <label name='passwordconfirmado' >confirma tu contraseña</label>
                    <input 
                    type= 'password' 
                    name='passwordconfirmado' 
                    placeholder='ingresa nuevamente tu contraseña'
                    value={values.passwordconfirmado}
                    onChange={handleChange}
                    onBlur={handleBlur}>
                    </input>
                {touched.passwordconfirmado && errors.passwordconfirmado &&<div className='error'>{errors.passwordconfirmado}</div> }

                </div>
                <div >
                    <label name='alumno' >Alumno</label>
                    <input 
                    type= 'radio' 
                    name='rol' 
                    value="alumno"
                    onChange={handleChange}
                    >
                    </input>
                    <label name='profesor' >Profesor</label>
                    <input 
                    type= 'radio' 
                    name='rol' 
                    value="profesor"
                    onChange={handleChange}
                    >
                    </input>
            

                </div>
                <button type='submit' className="btn btn-primary">Registrame</button>
            </form>
    

            )}


        </Formik>
        
    </div>
    
    </>

    )
}
export default FormRegister