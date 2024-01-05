import React from 'react'

function Upload({
  uploadLable = '',
  uploadStyle = '',
  onFileUpload,
  file
}) {

  return (
    <>
      
      <input
        type="file"
        id='fileUpload'
        onChange={(e) => { onFileUpload && onFileUpload(e.target.files) }}
        className={`hidden `}
        name='file' />
      <label
        htmlFor="fileUpload"
        className={` flex flex-col justify-center items-center cursor-pointer  border border-dotted   overflow-hidden ${uploadStyle} `}>
        <img src={file !== null ? file : "/upload.png"} alt="uploadIcon" className='block bg-white' />
        {/* <p>{uploadLable}</p> */}
      </label>
    </>
  )
}

export default Upload