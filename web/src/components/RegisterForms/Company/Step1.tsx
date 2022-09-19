import React from "react";

import Input from "components/utils/Input";
import { isEmpty, isValidEmail } from "utils/validations";
import { cnpjMask } from "utils/masks";

interface IForm1Props {
    onChange?: any;
    onSubmit: () => void,
    formData: any,
}

const CompanyForm1: React.FC<IForm1Props> = ({ onSubmit, formData, onChange }) => {
    
    return (

        <form className="form" onSubmit={onSubmit}>

            <Input icon="account_circle" type="text" placeholder="Nome" name="name" onChange={onChange} validate={() => !isEmpty(formData.name)}/>

            <Input icon="mail" type="text" placeholder="E-mail" name="email" onChange={onChange} value={formData.email} validate={() => isValidEmail(formData.email)} />

            <Input icon="badge" type="text" placeholder="CNPJ" name="cnpj" onChange={onChange} value={cnpjMask(formData.cnpj)} validate={() => !isEmpty(formData.cnpj)} />

        </form>
    )
}

export default CompanyForm1;