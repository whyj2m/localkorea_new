// import React, { useState } from "react";
// const BoardFileUpload = ({ isDisabled, setUploadedFiles }) => {
//     const [uploadedFiles, setUploadedFilesLocal] = useState([]);

//     const onUpload = (e) => {
//         if (!isDisabled) {
//             const files = e.target.files;
//             if (files) {
//                 const newFiles = [];

//                 for (let i = 0; i < files.length; i++) {
//                     const file = files[i];
//                     const reader = new FileReader();

//                     reader.onload = () => {
//                         const fileObject = {
//                             name: file.name,
//                             uuid: file.name,
//                             origin: file.type,
//                             src: reader.result,
//                             file_path: '/images/' + file.name
//                         };
//                         newFiles.push(fileObject);

//                         if (newFiles.length === files.length) {
//                             const updatedFiles = [...uploadedFiles, ...newFiles];
//                             // setUploadedFilesLocal(updatedFiles);
//                             // setUploadedFiles(updatedFiles); // 부모 컴포넌트로 업데이트된 데이터 전달
//                             // console.log("아아악",updatedFiles); // 업데이트된 파일 데이터 출력
//                         }
//                     };

//                     reader.readAsDataURL(file);
//                 }
//             }
//         }
//     };

//     return (
//         <>
//             <div className="input-group mb-3">
//                 <input
//                     accept="image/*"
//                     multiple
//                     type="file"
//                     onChange={e => onUpload(e)}
//                     className="form-control"
//                     id="inputGroupFile02"
//                     disabled={isDisabled}
//                 />
//                 <label className="input-group-text" htmlFor="inputGroupFile02">
//                     업로드
//                 </label>
//             </div>

//             {/* 업로드된 이미지 미리보기 */}
//             {uploadedFiles.map((fileObject, index) => (
//                 <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
//                     <img src={fileObject.src} alt='FileUpload' style={{ width: '200px', height: '200px', objectFit: 'cover', marginBottom: '5px' }} />
//                     <p>{fileObject.name}</p>
//                 </div>
//             ))}
//         </>
//     );
// };

// export default BoardFileUpload;
