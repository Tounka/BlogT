import { GridPostUx } from "./GridPostUx";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, orderBy, query } from "firebase/firestore";

export const GridPost = () => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(query(collection(db, "post"), orderBy("owner.fechaDeCreacion", "desc")));
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
