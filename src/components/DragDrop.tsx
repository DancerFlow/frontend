import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
    file: FileList | null;
    setFile: React.Dispatch<React.SetStateAction<FileList | null>>;
}

const DragDrop = ({ file, setFile }: Props) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            setFile(e.dataTransfer.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target === null) return;
        setFile(e.target.files);
    };

    return (
        <DragDropWrap onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
            <input
                type="file"
                id="fileUpload"
                style={{ display: 'none' }}
                multiple={false}
                onChange={handleChange}
                accept="image/*"
            ></input>
            <label className={isDragging ? 'fileBoxDragging' : 'fileBox'} htmlFor="fileUpload">
                {file ? (
                    <div>{file[0].name}</div>
                ) : (
                    <div>
                        <span>파일을 여기에 드래그하세요. </span>
                        <strong>파일 추가</strong>
                    </div>
                )}
            </label>
        </DragDropWrap>
    );
};

const DragDropWrap = styled.div`
    display: flex;
    width: 100%;
    height: 160px;
    justify-content: center;
    align-items: center;

    label {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        width: 100%;
        height: 140px;
        border: 2px dashed #00000068;
        color: #00000068;
        div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
    strong {
        margin-top: 10px;
        color: #4328db;
        cursor: pointer;
    }
    .fileBoxDragging {
        background-color: #ffffff;
    }
    .fileBox {
        background-color: none;
    }
`;

export default DragDrop;
