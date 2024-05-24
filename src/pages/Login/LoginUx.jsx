import React from 'react';
import { Formik, Form } from 'formik';
import { ContenedorCLoginRegister, FooterLoginRegister, IconoSuperior, CampoForm, ContenedorCampos, BtnSessionGoogle } from "./ComponentesLoginRegister";
import { FaLock, FaUser } from "react-icons/fa";
import { MsgErrorForm } from './ComponentesLoginRegister';
export const LoginUx = ({onSubmit,validate,initialValues, error, setError, handleClickSwitchLogReg, signInWithGoogle}) => {
  

  return (
    <ContenedorCLoginRegister>
      <Formik 
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <IconoSuperior onClick={handleClickSwitchLogReg} />
            <ContenedorCampos>
              <CampoForm name='email' type='email' txt='Email' icon={<FaUser />} />
              <CampoForm name='password' type='password' txt='Contraseña' icon={<FaLock />} />
            </ContenedorCampos>


            {error && <MsgErrorForm >{error}</MsgErrorForm>}



            <BtnSessionGoogle handleClick={signInWithGoogle}></BtnSessionGoogle>

            
            <FooterLoginRegister txt='LogIn' />
          </Form>
        )}
      </Formik>
    </ContenedorCLoginRegister>
  );
};
