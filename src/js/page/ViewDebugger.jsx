import React, { useEffect, useState } from 'react'
import "../../css/viewdebugger.css"
import Visualizer from '../component/Visualizer';
import useCreateBeatTags from '../hooks/useCreateBeatTags';

export default function ViewDebugger() {

    const [potentialTags, setPotentialTags] = useState();
    const [tags, setTags] = useState([])

    const year = new Date().getUTCFullYear()
    const tagsKeyWords = ['TypeBeat', 'TypeBeat' + year, 'TypeBeatFree', 'Instrumental']
    let isUploadingStep = null


    useEffect(() => {  
      potentialTags?.length &&
      potentialTags.forEach((potentialTag) => {
        tagsKeyWords.forEach((keyword) => {
            setTags((prev) => (prev?.length ? [...prev, potentialTag + keyword] : [potentialTag + keyword]))
            // setTags()
        })
      })

    // eslint-disable-next-line
    }, [potentialTags])

    useEffect(() => {
      
      (tags?.length && isUploadingStep === 2) && setPackages((prev) => ({...prev, info: { ...prev.info, tags}}));
    // eslint-disable-next-line
    }, [tags, isUploadingStep]);

    const handleFileChange = (value) => {
      const potentials = value?.split([' '], 20);
      setPotentialTags(potentials);
    }
    

  return (
    <div className='vd-div-main'>
      {
        <input type="text" onBlur={(e) => handleTagToggle(e.target.value)} />
      }

      <div>
        <p>Tagtitles</p>
        <p>{JSON.stringify(tagTitles)}</p>
      </div>
      <div>
        <p>potentialTag</p>
        <p>{JSON.stringify(potentialTags)}</p>
      </div>
      <div>
        <p>Tags</p>
        <p>{JSON.stringify(tags)}</p>
      </div>
    </div>
  )
}
