import { useEffect, useState } from "react";

export default function useCreateBeatTags(setPackages, setFile, isUploadingStep) {

    const [tagTitles, setTagTitles] = useState([]);
    const [potentialTags, setPotentialTags] = useState();
    const [tags, setTags] = useState([])
    const [copied, setCopied] = useState(false);
    const [generateTags, setGenerateTags] = useState(false)

    const year = new Date().getUTCFullYear()
    const tagsKeyWords = ['TypeBeat', 'TypeBeat' + year, 'TypeBeatFree', 'Instrumental']


    useEffect(() => {
      if(isUploadingStep && isUploadingStep === 2) {
          isUploadingStep === 2 && setGenerateTags(true)
        } else if(!isUploadingStep) {
          setGenerateTags(null)
          setGenerateTags(null)
          setTags([])
          setTagTitles([])
        }
          
    }, [isUploadingStep])

    useEffect(() => {  
      tagTitles?.length && generateTags &&
      tagTitles.forEach((potentialTag) => {
        tagsKeyWords.forEach((keyword) => {
            setTags((prev) => (prev?.length ? [...prev, ` ${potentialTag + keyword}`] : [potentialTag + keyword]))
        })
      })

    // eslint-disable-next-line
    }, [tagTitles, generateTags])

    useEffect(() => {
      
      (tags?.length && isUploadingStep === 2) && setPackages((prev) => ({...prev, info: { ...prev.info, tags}}));
    // eslint-disable-next-line
    }, [tags, isUploadingStep]);

    const handleFileChange = (value) => {
      const potentials = value?.split([' '], 20);
      const filterSearchKeys = ['free', 'mp3']
      const filterKeys = ['[FREE]', '[Free]', '-', 'x', 'Type', 'Beat', 'TypeBeat' + year, 'TypeBeatFree', 'Instrumental']
      
      const potentialsFiltered = potentials.filter((item) => {
        for (let i = 0; i < filterSearchKeys.length; i++) {
          const filterKey = filterSearchKeys[i]
          if(item.includes(filterKey)) return false
        }
        if(filterKeys.includes(item)) {
          return false
        } else {
          return true
        }
      })

      setPackages((prev) => ({...prev, info: {...prev.info, title: value}}))
      setPotentialTags(potentialsFiltered);
    }
    
    const handleTagToggle = (item, removeTags, index) => {

      if(removeTags) {
        removeTags.forEach(removeTag => {
          tagTitles.includes(removeTag) &&
          setTagTitles((prev) => (prev.length && prev.filter((prevItem) => prevItem !== removeTag)))
          setPotentialTags((prev) => (prev.filter(prevItem => prevItem !== removeTag)))
        })
        setPotentialTags((prev) => {
          // const prevV = [...prev.splice(index, 0, item)]
          prev.splice(index, 0, item)
          return prev
        })
      } else {
        tagTitles.includes(item) ?
        setTagTitles((prev) => (prev.length && prev.filter((prevItem) => prevItem !== item))) :
        setTagTitles((prev) => (prev.length ? [...prev, item] : [item]))
      }
    }

    const copyToClipboard = async (textToCopy) => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    };
    

  return { handleFileChange, handleTagToggle, potentialTags, tagTitles, tags, copyToClipboard, copied }
}
