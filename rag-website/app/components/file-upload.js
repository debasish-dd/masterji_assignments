"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from 'react-dropzone'
import { ToastContainer, toast , Bounce } from 'react-toastify';
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf"

export default function FileUpload() {

    const pdfHandler = async (pdf) => {
        console.log("inside pdf handler-" , pdf);
        // const loader 
        
    }

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        if (acceptedFiles.length > 0) {
            toast.success('The file has uploaded succesfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            console.log('files-->', ...acceptedFiles);
           
            pdfHandler(...acceptedFiles)
        }

    }, [])
    const onDropRejected = useCallback(rejectedFiles => {
        // Do something with the files
        if (rejectedFiles.length > 0) {
            const tooManyFiles = rejectedFiles.some(file => file.errors.some(e => e.code === "too-many-files"));
            const fileTooLarge = rejectedFiles.some(file => file.errors.some(e => e.code === "file-too-large"));

            if (tooManyFiles) {

                toast.error('Too Many Files!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
            if (fileTooLarge) {

                toast.error('File size should be less than 2.5MB!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }

        }

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        maxFiles: 1,
        maxSize: 1024 * 1024 * 2.5, // 2.5 MB 
        accept: {
            'application/pdf': [],
        }

    })
    

    return (
        <div className={`rounded-lg border-dashed border-2 h-45 m-5 flex justify-center items-center ${isDragActive ? "border-solid border-orange-500 bg-orange-300/30" : "hover:border-solid hover:border-orange-500"} `} {...getRootProps()}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <div className="felx flex-col items-center justify-center text-center">
                        <p>Drag and drop files here</p>
                        <button className="mt-2 p-2 bg-orange-500 text-white rounded">Browse Files</button>
                    </div>
            }
          
        </div>
    )

}