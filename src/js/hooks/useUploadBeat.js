import { useState } from "react";
import { baseUrl } from "../..";


export default function useUploadBeat(packages) {

  const [isUploadingStep, setIsUploadingStep] = useState();
  const [result, setResult] = useState();
  const [file, setFile] = useState();

  const uploadBeat = async() => {
    setIsUploadingStep(3);

    try {
      const form = new FormData();

      form.set('info', JSON.stringify(packages));
      form.set('file', file)

      const response = await fetch(baseUrl + '/beat', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        setResult(response.statusText);
        setIsUploadingStep(4);
      } else {
        console.log(response.statusText);
      }

    } catch (error) {
      console.log(error);
      setIsUploadingStep(2);
    }
  };

  return { uploadBeat, setIsUploadingStep, isUploadingStep, setFile, file, result }
}
