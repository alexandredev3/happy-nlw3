import React, { 
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { FiPlus, FiX } from "react-icons/fi";

import ToolTip from '../components/ToolTip';

import { 
  ImagesContainer,
  NewImageButton,
  ImagesPreview,
  DeleteImageButton,
} from '../styles/components/file-input';

interface Props {
  name: string;
}

interface RefProps {
  value: string[];
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const InputFile: React.FC<InputProps> = ({ 
  name, ...rest 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [preview, setPreview] = useState<string[]>([]);

  const handlePreview = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const selectedImages = Array.from(files);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreview(selectedImagesPreview);
  }, [preview]);

  const handleDeletePreview = useCallback((index: number) => {
    const deleteImagePreview = preview.findIndex((_, previewIndex) => previewIndex === index);

    if (deleteImagePreview >= 0) {
      const filteredImagesPreview = preview.filter((_, previewIndex) => previewIndex !== index);

      setPreview(filteredImagesPreview)
    }
  }, [preview]);

  // colocar files em um state,
  // depois tentar passar esse state aqui no registerFiled, no path,
  // para ter uma opção de excluir a imagem.
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files',
      clearValue(ref: RefProps) {
        ref.value = [];

        setPreview([]);
      },
      setValue(_: HTMLInputElement, value: string[]) {
        setPreview([...value]);
      },
    })
  }, [fieldName, registerField]);

  return (
    <ImagesContainer>
      {
        preview.map((imageURL, index) => (
          <ImagesPreview
            key={index}
          >
            <img
              src={imageURL}
              alt="image preview"
            />
            <DeleteImageButton
              type="button"
              onClick={() => handleDeletePreview(index)}
            >
              <FiX size={24} color="#FF669D" />
            </DeleteImageButton>
          </ImagesPreview>
        ))
      }

      <NewImageButton htmlFor="images[]" error={error}>
        <FiPlus size={24} color={error ? '#FF669D' : '#15b6d6' } />
      </NewImageButton>

      <input 
        type="file"
        id="images[]"
        ref={inputRef}
        multiple={true}
        onChange={handlePreview}
        { ...rest }
      />

      {
        error && <ToolTip message={error} />
      }
      
    </ImagesContainer>
  );
}

export default InputFile;