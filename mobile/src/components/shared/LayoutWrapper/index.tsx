import React, { ReactElement, useState } from "react"
import { View } from "react-native"
import NavBar from "../Nav"
import Sidebar from "../Sidebar"

interface ILayoutWrapperProps {
    navigation : any,
    children : ReactElement[] | ReactElement
}

const LayoutWrapper : React.FC<ILayoutWrapperProps> = ({ navigation, children }) => {
    const [ isSidebarVisible, setSidebarVisible ] = useState(false)

    return (
        <View style={{flex : 1}}>
            <NavBar toggleSidebar={() => setSidebarVisible(!isSidebarVisible)} />
            { children }
            <Sidebar />
        </View>
    )
}

export default LayoutWrapper;