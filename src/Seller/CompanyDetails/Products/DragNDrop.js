import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DragNDrop({setSelectedImage,selectedImage}){
    
    const onDrop = useCallback((acceptedFiles) => {
        console.log('onDrop')
        console.log(acceptedFiles)
        setSelectedImage(acceptedFiles)
        // acceptedFiles.map((file) => {
        //   const reader = new FileReader();
        //   reader.onload = function (e) {
        //     setSelectedImage((prevState) => [
        //       ...prevState,
        //       { id: cuid(), src: e.target.result },
        //     ]);
        //   };
        //   reader.readAsDataURL(file);
        //   return file;
        // });
    }, []);
    const { getRootProps, getInputProps, acceptedFiles, isDragActive} = useDropzone({onDrop, accept: {
        "image/jpeg": [],
        "image/png": [],
      },});
    
    const files = selectedImage.map((file) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li >
    
    ));

    return(
        <div className="container">
            <div {...getRootProps({ className: "dropzone" })}>
                <input className="input-zone" {...getInputProps()} />
                {isDragActive ? 
                <p className="dropzone-content">
                Release to drop the files here
                </p>
                :
                <p className="dropzone-content">
                Drag n drop some files here, or click to select files
                </p>
                }   
                <button className="btn btn-primary btn-sm mb-2" onClick={onDrop}>Click to select files</button>
            </div>
                <aside className="mb-0">
                    <ul>{files}</ul>
                </aside>
        </div>
    )
}