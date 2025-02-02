import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyForm1 from "components/RegisterForms/Company/Step1";
import CompanyForm2 from "components/RegisterForms/Company/Step2";
import { isValidEmail } from "utils/validations";
import * as AuthService from "services/auth.service";
import { AuthContext } from "store/context/Auth.context";
import Button from "components/shared/Button";
import Icon from "components/shared/Icon";


const CompanyRegistrationPage: React.FC = () => {
    const navigate = useNavigate()

    const authContext = useContext(AuthContext)

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        cnpj: "",
        password: "",
        confirmPassword: "",
        termsOfAcceptance: ""
    })

    const [currentStep, setCurrentStep] = useState(0);

    const handleChange = (e: any) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const steps = [
        { desc: "", component: <CompanyForm1 onSubmit={() => { }} formData={formValues} onChange={handleChange} /> },
        { desc: "", component: <CompanyForm2 onSubmit={() => { }} formData={formValues} onChange={handleChange} /> },
    ]

    const isFormValid = () => {

        if (currentStep == 0) {
            if (!isValidEmail(formValues.email)) return false;

            if (formValues.name.length < 3) return false;

            if (formValues.cnpj.length < 18) return false;
        }

        if (currentStep == 1) {

            if (formValues.password.length <= 0) return false

            if (formValues.confirmPassword.length <= 0) return false

            if (formValues.password !== formValues.confirmPassword) return false;

            if (formValues.termsOfAcceptance == 'off') return false;

        }

        return true;

    }

    const onConfirmButtonPress = () => {

        console.log(formValues);
        

        if (!isFormValid()) 
            return alert("Por favor, verifique se os dados estão corretos!")
        
        if (currentStep < steps.length -1)
            setCurrentStep(currentStep + 1)
        else
            register()
    }

    const register = async () => {

        const body = {
            name: formValues.name,
            email: formValues.email,
            cnpj: formValues.cnpj,
            password: formValues.password,
            termsOfAcceptance: formValues.termsOfAcceptance,
        }

        const res = await AuthService.register(body)


        if (res.hasError)
            return alert("Por favor, verifique se os dados estão corretos!")

        authContext?.signIn(body.email, body.password); 

    }

    const onPreviousButtonPress = () => {
        if (currentStep > 0 && currentStep < steps.length) {
            setCurrentStep(currentStep - 1)
        } else {
            navigate("/register")
        }
    }

    return (
        <div className="company-registration-page">

            <div className="registration-form-container">

                <div className="company-user">

                <Button onClick={onPreviousButtonPress} >
                    <Icon name="arrow_back" />
                </Button>

                    <h2>Sou empresa</h2>

                </div>

                {steps[currentStep].component}

                <div className="button-container">

                    <Button type="submit" children={(currentStep >= steps.length - 1) ? 'Cadastrar' : ["Proximo", <Icon name="arrow_forward" />]} onClick={onConfirmButtonPress} className="btn-primary" ></Button>

                </div>

            </div>

            <div className="image-container">

                <img src="https://firebasestorage.googleapis.com/v0/b/devint-tcc-33eb6.appspot.com/o/assets%2Fimgs%2Fcompany-img.svg?alt=media&token=f3126858-8a4a-4529-b94e-07b03ab9b435" alt="developer on a computer" />

            </div>

        </div>
    )
};

export default CompanyRegistrationPage;