import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useState } from "react";

const ZoomContainer = styled("div")({
  overflow: "hidden",
  transition: "transform 0.3s ease",
  borderRadius: "40px",
});

const ZoomedImage = styled("img")(({ mousePosX, mousePosY }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transformOrigin: `${mousePosX}px ${mousePosY}px`,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: `scale(2)`,
  },
}));

function ZoomableImage({ src, alt, sx }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const imageRect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - imageRect.left;
    const mouseY = event.clientY - imageRect.top;
    setMousePosition({ x: mouseX, y: mouseY });
  };

  return (
    <ZoomContainer onMouseMove={handleMouseMove} sx={sx}>
      <ZoomedImage
        src={src}
        alt={alt}
        mousePosX={mousePosition.x}
        mousePosY={mousePosition.y}
      />
    </ZoomContainer>
  );
}

export default ZoomableImage;

ZoomableImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
