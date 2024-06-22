import styled from "styled-components";

const Subtitulo = styled.h2`
    font-size: 24px;
    text-align: center;
    justify-content:center;
    color: var(--AzulSecundario);
    width: 100%;
    margin: 0;
    
`;

const Parrafo = styled.p`
    font-size: 14px;
    text-align: justify;
    margin: 0;
`;

const ContenedorSeccion = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: center;
    max-width: 1200px;
    margin: 10px 20px;
`;

const ContenedorPt1Seccion = styled.div`
    position: relative;
    margin: 20px 0;
`;

const ContenedorPt2Seccion = styled.div`
    display: flex;
    width: 100%;
    height: ${props => (props.img ? '350px' : '20px')};
`;

const ImageContainer = styled.div`
    height: auto;
    width: 100%;
    max-width: ${props => props.imgGrande ? 'auto' : '300px'};
    ${props => props.index % 2 === 0 ? 'float: right; margin-left: 20px;' : 'float: left; margin-right: 20px;'}


   
    
    
    margin-left: 10px;
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`;

const ImageComponent = ({ src, alt, index, imgGrande }) => {
    return src ? (
        <ImageContainer index={index} imgGrande={imgGrande}>
            <picture>
                <source srcSet={`${src}`} type="image/webp" />
                <source srcSet={`${src}`} type="image/jpeg" />
                <img src={`${src}`} alt={alt} loading="lazy"/>
            </picture>
        </ImageContainer>
    ) : null;
};

const ImageContainer2 = styled.div`
    width: 100%;
    height:100%;
    overflow:hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    picture{
        height:100%;
    }
`;
const ImageComponent2 = ({ src, alt }) => {
    return src ? (
        <ImageContainer2>
            <picture>
                <source srcSet={`${src}`} type="image/webp" />
                <source srcSet={`${src}`} type="image/jpeg" />
                <img src={`${src}`} alt={alt} />
            </picture>
        </ImageContainer2>
    ) : null;
};

export const Seccion = ({ data, index }) => {
    const { titulo, descripcion, img1, img2 } = data;

    


    return (
        <ContenedorSeccion>
            <Subtitulo>{titulo}</Subtitulo>

            <ContenedorPt1Seccion img={img1} >
                {img1 && <ImageComponent src={img1} index={index} imgGrande = {descripcion === undefined} />}
                <Parrafo>{descripcion}</Parrafo>
            </ContenedorPt1Seccion>

            <ContenedorPt2Seccion img={img2}>
                <ImageComponent2 src={img2} />
            </ContenedorPt2Seccion>
        </ContenedorSeccion>
    );
};
