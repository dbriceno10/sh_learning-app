import React, { useState, useEffect, useCallback } from "react";
import Files from "react-files";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Icon } from "@iconify/react";
import Button from "../Buttons/Buttons";
import Loader from "../Loader/Loader";
import "./FileUploader.css";

//This component accepts three props; one for an array of accepted file types (MIME types), a maximum size for files uploaded and a callback to get if a file is selected from pages or components that use this one.
export default function FileUploader({
  sendIsFileSelected,
  acceptedTypes,
  maxFileSize,
  fileUploadResponse,
}) {
  const [currFile, setCurrFile] = useState({});
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [fileUploaded, setFileUploaded] = useState({
    isUploaded: false,
    error: "",
  });
  const [response, setResponse] = useState(null);
  const MySwal = withReactContent(Swal);
  const fileSizeInMB = Math.ceil(maxFileSize * 0.000001);

  const onFilesChange = (files) => {
    const file = files[0];
    if (file) {
      setCurrFile((prevFile) => file);
      setIsFileSelected((prevIsFileSelected) => true);
      sendIsFileSelected && sendIsFileSelected(true);
    } else {
      setIsFileSelected((prevIsFileSelected) => false);
      sendIsFileSelected && sendIsFileSelected(false);
    }
  };

  const onFilesError = (error, file) => {
    if (error.code === 2) {
      MySwal.fire({
        position: "center",
        icon: "error",
        title: `El tamaño del archivo debe ser menor a
                ${fileSizeInMB} MB`,
        showConfirmButton: false,
        timer: 2500,
      });
    } else if (error.code === 1) {
      MySwal.fire({
        position: "center",
        icon: "error",
        title:
          "El tipo de archivo no es valido. Elige un tipo de archivo permitido",
        showConfirmButton: false,
        timer: 2500,
      });
    }
    setCurrFile((currFile) => { });
    setIsFileSelected((prevIsFileSelected) => false);
    console.log(error);
  };

  const handleFileUpload = useCallback(() => {
    if (isFileSelected && currFile) {
      setFileUploaded((prevFileUploaded) => ({
        isUploaded: false,
        error: "",
      }));
      const formData = new FormData();
      formData.append("file", currFile, currFile?.name);
      fetch('https://learnzilla-uploadvideos-production.up.railway.app/upload', {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          setFileUploaded((prevFileUploaded) => ({
            isUploaded: true,
            error: "",
          }));
          setResponse((prevResponse) => result.webViewLink);
        })
        .catch((error) => {
          console.error("Error:", error);
          setFileUploaded((prevFileUploaded) => ({
            isUploaded: false,
            error: error.message,
          }));
          MySwal.fire({
            position: "center",
            icon: "error",
            title:
              "No se pudó subir el archivo correctamente. Por favor reintente mas tarde",
            showConfirmButton: true,
          });
          setResponse((prevResponse) => null);
        });
    }
  }, [isFileSelected, currFile, fileUploadResponse]);

  useEffect(() => {
    //Example function for uploading a file chosen by the user
    handleFileUpload();
  }, [currFile, handleFileUpload]);

  useEffect(() => {
    if (response) {
      fileUploadResponse(response);
    }
    return () => {
      fileUploadResponse("");
    };
  }, [response, fileUploadResponse]);

  return (
    <div className="upload-container">
      <Files
        className="upload_dropzone"
        onChange={onFilesChange}
        onError={onFilesError}
        accepts={acceptedTypes || ["image/*", ".pdf"]}
        multiple={false}
        maxFileSize={maxFileSize || 500000}
        minFileSize={0}
        maxFiles={1}
      >
        <div className="upload_dropzone_label">
          <Button
            btnVariant={"flat-icon"}
            icon={"fa6-solid:file-medical"}
            text={"Selecciona"}
            link={""}
          />
          <b>o arrastra un archivo (.pdf)</b>
        </div>
      </Files>
      {isFileSelected && (
        <div className="upload_dropzone_file-info">
          <div className="file-info_wrapper">
            {
              {
                application: <Icon icon={"fa6-regular:file-pdf"} />,
                image: <Icon icon={"fa6-regular:file-image"} />,
                video: <Icon icon={"fa-regular:file-video"} />,
              }[currFile?.type.split("/")[0].toString()]
              // || <Icon
              // 	icon={'uiw:file-unknown'}
              // />
            }
            <span className="upload_dropzone_file-info_text">
              <b>{currFile?.name && currFile.name}</b>
              <p>{currFile?.sizeReadable && currFile.sizeReadable}</p>
              <small>
                {currFile?.lastModifiedDate &&
                  currFile.lastModifiedDate.toDateString()}
              </small>
            </span>
          </div>
          {isFileSelected ? (
            !fileUploaded.isUploaded ? (
              !fileUploaded.error ? (
                <Loader />
              ) : (
                <Button
                  btnVariant={"round"}
                  icon={"pepicons:reload"}
                  link={""}
                  onClick={handleFileUpload}
                />
              )
            ) : (
              <Icon icon={"eva:checkmark-circle-2-fill"} />
            )
          ) : null}
        </div>
      )}
      <small>Máximo {fileSizeInMB} MB*</small>
    </div>
  );
}
