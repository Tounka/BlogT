import { useDatos } from "../../Contexto"
import { DisplayPrincipal } from "../ComponentesGenericos/Displays";
import { PostUx } from "./PostUx";
import { useLocation } from "react-router-dom";

export const Post = () => {
    const location = useLocation();
    const { post } = location.state || {}; // Manejar el caso donde el estado podría no estar definido

    console.log('Post component:', location.state); // Log para depurar

    return (
        <DisplayPrincipal>
            <PostUx post={post} />
        </DisplayPrincipal>
    );
};


