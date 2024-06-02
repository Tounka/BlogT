import { DisplayPrincipal } from "../ComponentesGenericos/Displays";
import { GridPostUx } from "./GridPostUx";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

export const GridPost = () => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "post"));
                const postList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPost(postList);
             
            } catch (error) {
                console.error("Error al obtener post ", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            {post.length > 0 ? <GridPostUx arregloPost={post} /> : 'Cargando...'}
        </>
    );
};
