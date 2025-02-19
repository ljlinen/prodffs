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
      for(let [key, value] of Object.entries(packages?.packages)) {
        console.log('file for package: ', key, ' is: ', value?.file);
        if(!value?.file) throw new Error('file for package: ', key, ' missing')
        form.set(key, value?.file)
      }

      const response = await fetch(baseUrl + '/beat', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        // setResult(response.statusText);
        // setIsUploadingStep(4);
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
