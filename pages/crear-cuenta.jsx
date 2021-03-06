import { useState } from 'react'
import Router from 'next/router'

import Layout from '../components/layout/Layout'

import firebase from '../firebase'
//validacaiones
import useValidation from '../hooks/useValidation'
import validarCrearCuenta from '../validacion/validarCrearCuenta'
const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: '',
}
export default function CrearCuenta() {
  const [error, setError] = useState(false)
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(STATE_INICIAL, validarCrearCuenta, crearCuenta)

  const { nombre, email, password } = valores
  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password)
      Router.push('/')
    } catch (error) {
      console.error('Ocurrió un error al crear el usuario', error.message)
      setError(error.message)
    }
  }
  return (
    <div>
      <Layout>
        <>
          <h1 className='title_crear_cuenta'>Crear cuenta</h1>
          <form className='formulario' onSubmit={handleSubmit} noValidate>
            <div className='campo'>
              <label htmlFor='nombre'>Nombre</label>
              <input
                type='text'
                id='nombre'
                placeholder='Tu nombre'
                name='nombre'
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errores.nombre && <p className='error'>{errores.nombre}</p>}
            <div className='campo'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Tu email'
                name='email'
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errores.email && <p className='error'>{errores.email}</p>}
            <div className='campo'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Tu password'
                name='password'
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errores.password && <p className='error'>{errores.password}</p>}
            {error && <p className='error'>{error}</p>}

            <input type='submit' value='Crear cuenta' className='inputSubmit' />
          </form>
        </>
      </Layout>
    </div>
  )
}
