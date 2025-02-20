import React, { useEffect } from "react";
import PotentialTagsSelecctor from "../../elemet/PotentialTagsSelector";
import useCreateBeatTags from "../../hooks/useCreateBeatTags";
import PackagesView from "../PackagesView";
import Radio from "../../elemet/Radio";
import Button from "../../elemet/Button";
import Input from "../../elemet/Input";
import useAdminContext from "../../hooks/useContext/useAdminContext";

export default function TabUploadBeat({addPackage, uncreatedPackages, activeTab, setPackages, packages, removePackage, handleEditingModeChange,
  file, setFile, isUploadingStep, isEditing, setIsUploadingStep, uploadBeat
 }) {
  
  const { packagesFilled } = useAdminContext();
  const { handleFileChange, handleTagToggle, potentialTags, tagTitles } = useCreateBeatTags(setPackages, setFile, isUploadingStep);

  // removePackage, packages, isEditing
  useEffect(() => {
    console.log('Tab change', isUploadingStep);
    
  }, [isUploadingStep])

  useEffect(() => {
    console.log('packages', packages);
  }, [packages]);


   const handleStep = () => {
      console.log(isUploadingStep, tagTitles);

      switch (isUploadingStep) {
      case 1:
        file ? setIsUploadingStep(2) : setFile(true)
        break;
      case 2:
        packagesFilled ? uploadBeat() : alert("fix your packages");
        break;
      default:
        break;
      }
   };

   const handleBpmInput = (value) => {
    setPackages((prev) => ({...prev, info: {...prev.info, bpm: value}}));
    console.log(packages);
  }

  return (
    <form className={activeTab === 3 ? "t3 show-tab" : "hide-tab"}>
      <p>Tags will be generated using the beat title</p>
      <p>Make sure your beat has a title</p>

      <Input 
        renderCondition={(isUploadingStep === 1 && !file)}
        label={"pick a beat"}
        title={"select a beat"}
        type={"text"}
        placeholder={'do not include such: [FREE]'}
        style={{ marginTop: 50, paddingInline: 20 }}
        handler={handleFileChange}
      />

      <Input 
        renderCondition={(isUploadingStep === 1 && file)}
        label={"BPM"}
        title={"what is the beat's beats per minute"}
        type={"number"}
        style={{ marginTop: 50, paddingInline: 20 }}
        handler={handleBpmInput}
      />

      <PotentialTagsSelecctor
        condition={isUploadingStep === 1 && file}
        handler={handleTagToggle}
        potentialTags={potentialTags}
        tagTitles={tagTitles}
      />

      <div
        className={
          isUploadingStep === 2
            ? "beat-options make-packages hide-up-anim"
            : "beat-options make-packages hide-up-hide"
        }
      >
        <div className="edit-mode-toggle">
          <p>Editing Mode</p>
          <Radio
            negativeTitle={"off"}
            positiveTitle={"on"}
            setKey={"editing"}
            onchange={handleEditingModeChange}
          />
        </div>
        <PackagesView isUploadingStep={isUploadingStep} setPackages={setPackages} packages={packages} removePackage={removePackage} addPackage={addPackage} uncreatedPackages={uncreatedPackages} isEditing={isEditing} />
      </div>

      <Button
        condition={isUploadingStep > 2 ? false : true}
        type={"submit"}
        style={{ marginInline: 20, marginTop: 20 }}
      >
        <p onClick={handleStep}>Upload</p>
      </Button>
    </form>
  );
}
