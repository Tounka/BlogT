
import { useState } from "react"
import { DispayPrincipal } from "./ComponentesLoginRegister"
import { LoginRa } from "./LoginRa"
import { RegisterRa } from "./RegisterRa"


export const Login = () => {
    const [boolSwitchLoginRegister, setBoolSwitchLoginRegister] = useState(0);
    return(
        <DispayPrincipal>
            {boolSwitchLoginRegister
            ? <RegisterRa  setBoolSwitchLoginRegister={setBoolSwitchLoginRegister}/>
            : <LoginRa setBoolSwitchLoginRegister={setBoolSwitchLoginRegister} />
        }
        </DispayPrincipal>
    )
        
    
}

