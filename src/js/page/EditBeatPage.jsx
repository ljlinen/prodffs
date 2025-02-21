import React, { useEffect, useState } from 'react'
import '../../css/beat.css'
import BeatOption from '../component/BeatOption'
import useBuyingContext from '../hooks/useContext/useBuyingContext'
import PackagesView from '../component/PackagesView';
import useCreatePackages from '../hooks/useCreatePackages';
import Button from '../elemet/Button';
import Radio from '../elemet/Radio';
import Input from '../elemet/Input';
import useCreateBeatTags from '../hooks/useCreateBeatTags';
import useAdminContext from '../hooks/useContext/useAdminContext';
import PotentialTagsSelecctor from '../elemet/PotentialTagsSelector'
import useUploadBeat from '../hooks/useUploadBeat';
import PotentialTagsSelector from '../elemet/PotentialTagsSelector';
import InfoText from '../component/InfoText';

export default function EditBeatPage() {

  const { selectedBeat, selectedPackage, buyingDispatch } = useBuyingContext();
  const { addPackage, handleEditingModeChange, isEditing, packageTemplate, packages, removePackage, setPackages, uncreatedPackages} = useCreatePackages(selectedBeat);
  const [isBuying, setIsBuying] = useState()
  const [isSafe, setsafeCheckout] = useState()

  const { packagesFilled } = useAdminContext();
  const { setIsUploadingStep, isUploadingStep, result, file, setFile, uploadBeat } = useUploadBeat(packages);
  const { handleFileChange, handleTagToggle, potentialTags, tagTitles } = useCreateBeatTags(setPackages, setFile, isUploadingStep);

  useEffect(() => {
    if(!selectedBeat) setFile(null)
  // eslint-disable-next-line
  }, [selectedBeat])


   const handleStep = () => {
      console.log(isUploadingStep);

      switch (isUploadingStep) {
      case 1:
         file ? setIsUploadingStep(2) : alert("add file");
         break;
      case 2:
         packagesFilled ? uploadBeat() : alert("fix your packages");
         break;
      default:
         break;
      }
   };


   useEffect(() => {
    console.log(selectedBeat);
  })

  useEffect(() => {
    setsafeCheckout((selectedBeat && selectedPackage) ? true : false);
    setIsBuying(selectedBeat?.id ? true : false)
    setIsUploadingStep(selectedBeat?.id ? 1 : false)
  // eslint-disable-next-line
  }, [selectedBeat, selectedPackage])


  const handleBpmInput = (value) => {
    setPackages((prev) => ({...prev, info: {...prev.info, bpm: value}}));
    console.log(packages);
  }


  return (
    <div>
        <InfoText condition={(isUploadingStep === 1 && !file)}
          h4={'Pick a beat to replace the current one'}
          p={'allowed formats: mp3, wav, zip'}
        />
        <Input
          renderCondition={(isUploadingStep === 1 && !file)}
          title={"select a beat"}
          type={"file"}
          accepts={"audio/mpeg"}
          style={{paddingInline: 25 }}
          handler={handleFileChange}
        />

        <InfoText 
          condition={(isUploadingStep === 1 && file)}
          h4={'Beats Per Minute and Tags'}
          p={'Choose tags titles to generate tags from. this could be the artist name, type beat name etc.'}
          style={{marginBlock: 15}}
        />
      
        <Input
          renderCondition={(isUploadingStep === 1 && file)}
          label={"BPM"}
          title={"what is the beat's beats per minute"}
          type={"number"}
          style={{paddingInline: 25}}
          handler={handleBpmInput}
          placeholder={selectedBeat?.info?.bpm}
        />
      
        <PotentialTagsSelector
          condition={isUploadingStep === 1 && file}
          handler={handleTagToggle}
          potentialTags={potentialTags}
          tagTitles={tagTitles}
        />

          <PackagesView condition={(isUploadingStep === 2)} addPackage={addPackage} isEditing={isEditing} isUploadingStep={isUploadingStep} packages={packages} removePackage={removePackage} setPackages={setPackages} uncreatedPackages={uncreatedPackages} handleEditingModeChange={handleEditingModeChange} />
      
        <Button
          condition={isUploadingStep >= 1 && file ? true : false}
          type={"submit"}
          style={{ marginInline: isUploadingStep < 1 ? 30 : 25, marginTop: 20 }}
        >
          <p onClick={handleStep}>{isUploadingStep === 2 ? 'Update' : 'Next'}</p>
        </Button>
    </div>
  )
}
