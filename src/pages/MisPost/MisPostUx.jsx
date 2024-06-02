
import styled from "styled-components"
import { CardPost } from "../ComponentesGenericos/CardPost";



export const TextoLoadingError = styled.p`
    font-size: 24px;
    margin-top:20px;
    
`
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

export const MisPostUx = ({ arregloPost }) => {
    return (
        <ContenedorGridPost>
            {arregloPost.map(post => (
                <CardPost key={post.id} post={post} />
            ))}
        </ContenedorGridPost>
    );
};