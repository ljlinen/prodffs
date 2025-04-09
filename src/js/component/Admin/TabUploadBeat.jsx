import React, { useEffect } from "react";
import PotentialTagsSelecctor from "../../elemet/PotentialTagsSelector";
import useCreateBeatTags from "../../hooks/useCreateBeatTags";
import PackagesView from "../PackagesView";
import Radio from "../../elemet/Radio";
import Button from "../../elemet/Button";
import Input from "../../elemet/Input";
import useAdminContext from "../../hooks/useContext/useAdminContext";

export default function TabUploadBeat({addPackage, uncreatedPackages, activeTab, setActiveTab, resetPackages, setPackages, packages, removePackage, handleEditingModeChange,
  file, setFile, isUploadingStep, isEditing, setIsUploadingStep, uploadBeat, setResetCurrentTab, setResult, setFullScreen
 }) {
  
  const { packagesFilled } = useAdminContext();
  const { handleFileChange, handleTagToggle, potentialTags, tagTitles } = useCreateBeatTags(setPackages, setFile, isUploadingStep);


  useEffect(() => {
    if(setResetCurrentTab && activeTab === 3) {
      setResetCurrentTab(() => resetTabThree)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  const resetTabThree = () => {
    setResult(null)
    setFile(null)
    setIsUploadingStep(null)
    setFullScreen(false)
    setActiveTab(1)
    resetPackages()
  }


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
    <div className={activeTab === 3 ? "t3 show-tab" : "hide-tab"}>
      <p>Tags will be generated using the beat title</p>
      <p>Make sure your beat has a title</p>

      <Input 
        renderCondition={(activeTab === 3 && isUploadingStep === 1 && !file)}
        label={"beat title"}
        title={"beat title"}
        type={"text"}
        placeholder={''}
        style={{ marginTop: 50}}
        handler={handleFileChange}
      />

      <Input 
        renderCondition={(activeTab === 3 && isUploadingStep === 1 && file)}
        label={"BPM"}
        title={"what is the beat's beats per minute"}
        type={"number"}
        style={{ marginTop: 50}}
        handler={handleBpmInput}
      />

      <PotentialTagsSelecctor
        condition={activeTab === 3 && isUploadingStep === 1 && file}
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
        <PackagesView isUploadingStep={isUploadingStep} setPackages={setPackages} packages={packages} removePackage={removePackage} addPackage={addPackage} uncreatedPackages={uncreatedPackages} isEditing={isEditing} activeTab={activeTab} />
      </div>

      <Button
        condition={isUploadingStep > 2 ? false : true}
        type={"submit"}
        style={{marginTop: 20 }}
      >
        <p onClick={handleStep}>Upload</p>
      </Button>
    </div>
  );
}
