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
                        // 원하는 속성을 가진 새로운 파일 객체를 생성
                        const fileObject = {
                            name: file.name, // 파일 이름
                            uuid: file.name, // UUID 함수를 사용하여 고유한 값 생성
                            origin: file.type, // 원본 파일 타입
                            src: reader.result,
                            file_path: '/images/' + file.name // 파일 경로 (서버에 저장될 경로)
                            // ... 다른 필요한 정보들을 여기에 추가할 수 있음
                        };
                        newFiles.push(fileObject);

                        if (newFiles.length === files.length) {
                            setUploadedFiles((prevUploadedFiles) => {
                                return [...prevUploadedFiles, ...newFiles];
                            });
                            console.log('Uploaded Files:', [...uploadedFiles, ...newFiles]); // 새로 업로드된 파일들을 콘솔에 출력
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
                    업로드
                </label>
            </div>

            {/* 업로드된 이미지 미리보기 */}
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
