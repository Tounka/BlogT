import React from 'react';
import { Formik, Form } from 'formik';
import { ContenedorCLoginRegister, FooterLoginRegister, IconoSuperior, CampoForm, ContenedorCampos,MsgErrorForm } from "./ComponentesLoginRegister";
import { FaLock, FaUser, FaIdCardAlt, FaRegAddressCard  } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";

export const RegisterUx = ({onSubmit,validate,initialValues, error, setError, handleClickSwitchLogReg}) => {
  

  return (
    <ContenedorCLoginRegister>
      <Formik 
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <IconoSuperior onClick={handleClickSwitchLogReg} Icon={<HiIdentification fill='var(--BlancoPrincipal)'/>} />
            <ContenedorCampos>
              <CampoForm name='name' type='text' txt='Nombres' icon={<FaIdCardAlt />} />
              <CampoForm name='lastname' type='text' txt='Apellidos' icon={<FaRegAddressCard />} />
              <CampoForm name='email' type='email' txt='Email' icon={<FaUser />} />
              <CampoForm name='password' type='password' txt='Contraseña' icon={<FaLock />} />
            </ContenedorCampos>
            {error && <MsgErrorForm >{error}</MsgErrorForm>}
            <FooterLoginRegister txt='Register' />
          </Form>
        )}
      </Formik>
    </ContenedorCLoginRegister>
  );
};
