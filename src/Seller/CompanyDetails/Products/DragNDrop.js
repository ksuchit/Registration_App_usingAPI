import React from "react";
import { useDropzone } from "react-dropzone";

export default function DragNDrop({open,setSelectedImage}){
    const { getRootProps, getInputProps, acceptedFiles, isDragActive} = useDropzone({});

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
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
                <button className="btn btn-primary btn-sm mb-2" onClick={open}>Click to select files</button>
            </div>
                <aside className="mb-0">
                    <ul>{files}</ul>
                </aside>
        </div>
    )
}