import React, { useRef } from 'react';

interface FileUploadProps {
  setFile: Function;
  accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement>();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files[0]);
  }

  return (
    <div onClick={() => ref.current.click()}>
      <input
        type="file"
        accept={accept}
        style={{display: 'none'}}
        ref={ref}
        onChange={changeHandler}
      />
      {children}
    </div>
  );
};

export default FileUpload;
