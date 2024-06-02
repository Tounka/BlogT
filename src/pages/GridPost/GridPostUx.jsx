
import styled from "styled-components"
import { CardPost } from "../ComponentesGenericos/CardPost"

const ContenedorGridPost = styled.div`

    display:grid;
    grid-template-columns: 1fr 1fr ;
    @media (min-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    flex-wrap: wrap;
    width: 85%;
    min-height:200px;
    
    gap: 20px;
`

export const GridPostUx = ({ arregloPost }) => {
    return (
        <ContenedorGridPost>
            {arregloPost.map(post => (
                <CardPost key={post.id} post={post} />
            ))}
        </ContenedorGridPost>
    );
};