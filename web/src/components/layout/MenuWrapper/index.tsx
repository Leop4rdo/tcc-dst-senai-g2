import React, { useState } from "react";
import SideBar from "components/layout/Sidebar"
import NavBar from "../NavBar/index"
import SideCard from "components/shared/SideCard";


const MenuWapper: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
        <div className="container-global">
            <NavBar />

            <div className="effect-side-bar">
                <SideBar />
            </div>
            <main className="main">
                {children}
                <div className="side-card-container">
                    <SideCard title="Seguindo" >
                        <a href=""><img src="https://avatars.githubusercontent.com/u/5909549?v=4" />username123</a>
                        <a href=""><img src="https://avatars.githubusercontent.com/u/5909549?v=4" />username123</a>
                        <a href=""><img src="https://avatars.githubusercontent.com/u/5909549?v=4" />username123</a>
                        <a href=""><img src="https://avatars.githubusercontent.com/u/5909549?v=4" />username123</a>
                        <a href=""><img src="https://avatars.githubusercontent.com/u/5909549?v=4" />username123</a>
                    </SideCard>
                    <SideCard title="Artigos em alta">
                        <a>Stop complaining about PHP</a>
                        <a>Start your React App</a>
                        <a>Improve your CSS Skills</a>
                        <a>Development Performance</a>
                    </SideCard>
                    <SideCard title="Meus grupos">
                        <a>Juninhos</a>
                        <a>Um empreguinho por favor</a>
                    </SideCard>
                </div>
            </main>

        </div>
    )
}

export default MenuWapper