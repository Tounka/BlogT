import { MisPostUx } from "./MisPostUx";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { useDatos } from "../../Contexto"; 
import { DisplayPrincipal } from "../ComponentesGenericos/Displays";
import { TextoLoadingError } from "./MisPostUx";

export const MisPost = () => {
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { usuario } = useDatos();

    useEffect(() => {
        const fetchPosts = async () => {
            if (!usuario) {
                setIsLoading(false); 
                return;
            }

            try {
                const q = query(
                    collection(db, "post"),
                    where("owner.userId", "==", usuario.uid),
                    orderBy("owner.fechaDeCreacion", "desc") // Ordenar por fecha de creación en orden descendente
                );
                const querySnapshot = await getDocs(q);
                const postList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPost(postList);
            } catch (error) {
                console.error("Error al obtener post ", error);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchPosts();
    }, [usuario]); 

    return (
        <DisplayPrincipal>
            {isLoading ? 'Cargando...' : (post.length > 0 ? <MisPostUx arregloPost={post} /> : <TextoLoadingError> Aún no escribes ningún post </TextoLoadingError> )}
        </DisplayPrincipal>
    );
};
