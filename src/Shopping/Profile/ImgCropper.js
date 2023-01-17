import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function ImgCropper({setBlob}) {
  const [src, setFile] = useState(null);
  const [dataUrl, setDataUrl] = useState("");
  //   console.log(src);
  const handleFileChange = (event) => {
    const blob = URL.createObjectURL(event.target.files[0]);
    setFile(blob);
    const fr = new FileReader();
    fr.onload = () => {
      console.log(fr.result);
      setDataUrl(fr.result);
    };
    fr.readAsDataURL(event.target.files[0]);
  };
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [result, setResult] = useState(null);
  const getCroppedImg = useCallback(() => {
    const mainImage = document.getElementById("main-image");
    const canvas = document.createElement("canvas");
    const scaleX = mainImage?.naturalWidth / mainImage?.width;
    const scaleY = mainImage?.naturalHeight / mainImage?.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx &&
      ctx.drawImage(
        mainImage,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      const base64Image = canvas.toDataURL("images/jpeg");
      canvas.toBlob((blob) => {
          console.log(blob)
          setBlob(blob)
      })

      setResult(base64Image);
      console.log(base64Image)
  }, [crop, dataUrl]);
    
  return (
    <div>
      <div className="Container border">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {src && (
        <div className="border mt-3">
          {
            <ReactCrop
              crop={crop}
              onImageLoaded={(x) => {
                console.log(x);
                setImage(x);
                // getCroppedImg(x);
              }}
              onComplete={(e) => {
                console.log(e);
                setCrop(e);
                getCroppedImg();
              }}
              onChange={(c) => {
                // console.log(c);
                setCrop(c);
              }}
            >
              <img
                src={src}
                id="main-image"
                onChange={(e) => {
                  console.log(e);
                }}
                alt='main-profile'
              />
            </ReactCrop>
          }
        </div>
      )}
      {result && (
        <div>
          <img src={result} alt="cropeed img" />
        </div>
      )}
    </div>
  );
}









