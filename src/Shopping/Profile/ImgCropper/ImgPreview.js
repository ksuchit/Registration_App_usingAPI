import { PixelCrop } from "react-image-crop";
import canvasPreview from "./CanvasPreview";

let previewUrl = "";

function toBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve);
  });
}

function toDataURL(canvas) {
  return new Promise((resolve) => {
    canvas.toDataURL(resolve);
  });
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export default async function ImgPreview(image, crop, scale = 1, rotate = 0) {
  const canvas = document.createElement("canvas");
  canvasPreview(image, canvas, crop, scale, rotate);

  const blob = await toBlob(canvas);
  const dataURL = await toDataURL(canvas);

  if (!blob) {
    console.error("Failed to create blob");
    return "";
  }

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    console.log(URL.revokeObjectURL(previewUrl));
  }

  previewUrl = URL.createObjectURL(blob);
  console.log(previewUrl);
  return {
    blob: blob,
    url: dataURL,
  };
}
