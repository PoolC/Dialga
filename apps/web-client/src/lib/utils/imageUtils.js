export const getParametersForUnsplash = ({
  width,
  height,
  quality,
  format,
}) => {
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
};
