import { useState } from 'react'
import Router from 'next/router'

import Layout from '../components/layout/Layout'

import firebase from '../firebase'
//validacaiones
import useValidation from '../hooks/useValidation'
import validarIniciarSesion from '../validacion/validarIniciarSesion'
const STATE_INICIAL = {
  email: '',
  password: '',
}

export default function Login() {
  const [error, setError] = useState(false)
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidation(STATE_INICIAL, validarIniciarSesion, iniciarSesion)

  const { email, password } = valores
  async function iniciarSesion() {
    try {
      await firebase.login(email, password)
      Router.push('/')
    } catch (error) {
      console.error('Ocurrió un error al autenticar el usuario', error.message)
      setError(error.message)
    }
  }
  return (
    <div>
      <Layout>
        <>
          <h1 className='title_crear_cuenta'>Iniciar Sesión</h1>
          <form className='formulario' onSubmit={handleSubmit} noValidate>
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

            <input
              type='submit'
              value='Iniciar sesión'
              className='inputSubmit'
            />
          </form>
        </>
      </Layout>
    </div>
  )
}
