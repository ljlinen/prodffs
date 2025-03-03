import { useEffect, useState } from "react";
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
        console.log('file for package: ', key, ' is: ', value?.file?.file);
        if(!(value?.file?.file instanceof Blob)) throw new Error('file for package: ', key, ' missing')
        form.set(key, value?.file?.file)
      }

      // let fileF = form.get('free')
      // console.log('fileF is ', fileF);
      // fileF = JSON.parse(fileF)
      // console.log(typeof fileF, fileF);
      
      const response = await fetch(baseUrl + '/beat', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        setResult(response.status === 201 ? 'beat uploaded successfully' : 'Success? status 201 expected but found ' + response.status);
      } else {
        console.log(response.statusText);
      }

    } catch (error) {
      console.log(error);
      setIsUploadingStep(2);
    }
  };

  return { uploadBeat, setIsUploadingStep, isUploadingStep, setFile, setResult, file, result }
}
