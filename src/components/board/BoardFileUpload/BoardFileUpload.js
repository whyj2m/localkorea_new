import React, { useState } from "react";

const BoardFileUpload = ({ isDisabled }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const onUpload = (e) => {
        if (!isDisabled) {
            const files = e.target.files;
            if (files) {
                const newFiles = [];

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const reader = new FileReader();

                    reader.onload = () => {
                        const fileObject = {
                            name: file.name,
                            src: reader.result
                        };
                        newFiles.push(fileObject);
                        if (newFiles.length === files.length) {
                            setUploadedFiles([...uploadedFiles, ...newFiles]);
                        }
                    };

                    reader.readAsDataURL(file);
                }
            }
        }
    };

    return (
        <>
            <div className="input-group mb-3">
                <input
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={e => onUpload(e)}
                    className="form-control"
                    id="inputGroupFile02"
                    disabled={isDisabled}
                />
                <label className="input-group-text" htmlFor="inputGroupFile02">
                    Upload
                </label>
            </div>

            {/* 이미지 미리보기 */}
            {uploadedFiles.map((fileObject, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
                    <img src={fileObject.src} alt='FileUpload' style={{ width: '200px', height: '200px', objectFit: 'cover', marginBottom: '5px' }} />
                    <p>{fileObject.name}</p>
                </div>
            ))} 

        </>
    );
};

export default BoardFileUpload;
