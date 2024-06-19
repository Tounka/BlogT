import { GridPostUx } from "./GridPostUx";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, orderBy, query, limit, startAfter } from "firebase/firestore";
import { useDatos } from "../../Contexto";
import { SwitchPagina } from "../ComponentesGenericos/SwitchPagina";

export const GridPost = () => {
    const [post, setPost] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [noMorePosts, setNoMorePosts] = useState(false);
    const { indexTodosLosPost, setIndexTodosLosPost } = useDatos();
    const postsPerPage = 10;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let q;

                // Check if we need to start after a specific document
                if (indexTodosLosPost > 1 && lastVisible) {
                    q = query(
                        collection(db, "post"),
                        orderBy("owner.fechaDeCreacion", "desc"),
                        startAfter(lastVisible),
                        limit(postsPerPage)
                    );
                } else {
                    q = query(
                        collection(db, "post"),
                        orderBy("owner.fechaDeCreacion", "desc"),
                        limit(postsPerPage)
                    );
                }

                const querySnapshot = await getDocs(q);
                const postList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                setPost(postList);

                // Set the last visible document
                const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                setLastVisible(lastDoc);

                // Check if we have received fewer posts than expected
                if (postList.length < postsPerPage) {
                    setNoMorePosts(true);
                } else {
                    setNoMorePosts(false);
                }
            } catch (error) {
                console.error("Error al obtener posts", error);
            }
        };

        fetchPosts();
    }, [indexTodosLosPost]);

    return (
        <>
            {post.length > 0 ? <GridPostUx arregloPost={post} /> : 'Cargando...'}
            <SwitchPagina ultimoPost={noMorePosts} index={indexTodosLosPost} setIndex={setIndexTodosLosPost} />
        </>
    );
};