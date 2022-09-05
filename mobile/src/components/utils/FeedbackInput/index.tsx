import { useState } from 'react';
import {View, TextInput, Pressable, Touchable} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import colors from '../../../styles/colors';
import StyleBuilder from '../../../styles/StyleBuilder';

import styles from "./style";

interface IFeedbackTextInput {
    placeholder? : string
    isPassword? : boolean
    style? : any
    icon? : keyof typeof MaterialIcons.glyphMap 
    iconSize? : number
    onChangeText : (text : string) => void
    value?: string
    validate? : () => boolean
}

export const inputStatus = {
    NEUTRAL: 0,
    FOCUSED: 1,
    INVALID: 2
}

const FeedbackTextInput : React.FC<IFeedbackTextInput> = ({style, isPassword, placeholder, icon, iconSize, onChangeText, value, validate}) => {
    const [status, setStatus] = useState(inputStatus.NEUTRAL);
    const [textVisible, setTextVisible] = useState(false);

    const containerStyles = new StyleBuilder()
        .addStyle(inputStatus.NEUTRAL, {...styles.container, ...style}, true)
        .addStyle(inputStatus.FOCUSED, styles.focusedContainer)
        .addStyle(inputStatus.INVALID, styles.invalidContainer);

    const inputStyles = new StyleBuilder()
        .addStyle(inputStatus.NEUTRAL, styles.input, true)
        .addStyle(inputStatus.FOCUSED, styles.focusedInput)
        .addStyle(inputStatus.INVALID, styles.invalidInput);

    const onBlur = () => {
        if ( !validate || validate() ) {
            setStatus(inputStatus.NEUTRAL)
        } else {
            setStatus(inputStatus.INVALID)
        }
    }

    const getIconColor = () => {
        if (status === inputStatus.FOCUSED) 
            return colors.PRIMARY
        else if (status === inputStatus.INVALID)
            return colors.RED
        else 
            return colors.GRAY
    }

    const toggleTextVisible = () => setTextVisible(!textVisible)

    return (
        <View style={containerStyles.process(status)}>
            { icon && <Ionicons name={icon} size={ iconSize || 24} color={getIconColor()} style={{marginRight : 4}}/>}
            <TextInput
                secureTextEntry={isPassword && textVisible || false}
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor={colors.GRAY}
                onFocus={() => status != inputStatus.INVALID && setStatus(inputStatus.FOCUSED)}
                onBlur={onBlur}
            />
            { isPassword &&
            
                <Pressable onPress={toggleTextVisible}>
                    <Ionicons 
                        name={textVisible ? 'eye' : 'eye-off'} 
                        size={ iconSize || 24} 
                        color={getIconColor()} 
                    />
                </Pressable>
            }
        </View>
    )
}

export default FeedbackTextInput
