import styled from "styled-components";
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;



  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ImgPicture = ({ src, alt, index, hover}) => {
    
    return src ? (
        <ImageContainer index={index}  hover={hover}>
            <picture>
                <source srcSet={`${src}`} type="image/webp" />
                <source srcSet={`${src}`} type="image/jpeg" />
                <img src={`${src}`} alt={alt} />
            </picture>
        </ImageContainer>
    ) : null;
};