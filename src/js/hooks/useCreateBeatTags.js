import { useEffect, useState } from "react";

export default function useCreateBeatTags(setPackages, setFile, isUploadingStep) {

    const [tagTitles, setTagTitles] = useState([]);
    const [potentialTags, setPotentialTags] = useState();
    const [tags, setTags] = useState([])

    const year = new Date().getUTCFullYear()
    const tagsKeyWords = [year, 'Free', 'TypeBeat']


    useEffect(() => {  
      potentialTags?.length &&
      potentialTags.forEach((potentialTag) => {
        tagsKeyWords.forEach((keyword) => {
            setTags((prev) => (prev?.length ? [...prev, potentialTag + keyword] : [potentialTag + keyword]))
        })
      })

    // eslint-disable-next-line
    }, [potentialTags])

    useEffect(() => {
      
      (tags?.length && isUploadingStep === 2) && setPackages((prev) => ({...prev, info: { ...prev.info, tags}}));
    // eslint-disable-next-line
    }, [tags, isUploadingStep]);

    const handleFileChange = (newFile) => {
      console.log(newFile.type);
      
      if(newFile.type !== 'audio/mpeg') {
        alert('song type should be an mp3')
        return
      }
      
      const potentials = newFile.name.split([' '], 20);
      setPackages((prev) => ({...prev, info: {...prev.info, title: newFile.name}}))
      setPotentialTags(potentials);
      setFile(newFile);
    }
    
    const handleTagToggle = (item) => {
      tagTitles.includes(item) ?
      setTagTitles((prev) => (prev.length && prev.filter((prevItem) => prevItem !== item))) :
      setTagTitles((prev) => (prev.length ? [...prev, item] : [item]))
    }

  return { handleFileChange, handleTagToggle, potentialTags, tagTitles }
}
