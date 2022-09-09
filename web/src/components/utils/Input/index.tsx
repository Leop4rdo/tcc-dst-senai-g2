import Icon from "components/utils/Icon";
import React, { useState } from "react";

interface IInputProps {
    type?: "text" | "password" | "email" ,
    placeholder?: string,
    icon?: string,
    onChange: (event: any) => void,
    value?: string,
    mask?: string
}

const Input: React.FC<IInputProps> = ({ type, placeholder, value, onChange, icon }) => {

    const [textVisible, setTextVisible] = useState(false);

    const toggleVisibility = () => setTextVisible(!textVisible);

    return (
        <div className={`input-container`}>
            {icon && <Icon name={icon}/>}
            <input className={(icon) ? 'icon-input' : ''}type={type || "text"} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
}

export default Input