import React, { useEffect } from "react";
import PotentialTagsSelecctor from "../elemet/PotentialTagsSelecctor";
import useCreateBeatTags from "../hooks/useCreateBeatTags";
import PackagesView from "./PackagesView";
import Radio from "../elemet/Radio";
import Button from "../elemet/Button";
import useAdminContext from "../hooks/useContext/useAdminContext";
import Input from "../elemet/Input";

export default function TabUploadBeat({ activeTab, setPackages, packages, removePackage, handleEditingModeChange,
  file, setFile, isUploadingStep, isEditing, setIsUploadingStep, uploadBeat
 }) {
  
  const { packagesFilled } = useAdminContext();
  const { handleFileChange, handleTagToggle, potentialTags, tagTitles } = useCreateBeatTags(setPackages, setFile, isUploadingStep);

  // removePackage, packages, isEditing
  useEffect(() => {
    console.log('Tab change', isUploadingStep);
    
  }, [isUploadingStep])

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

  return (
    <form className={activeTab === 3 ? "t3 show-tab" : "hide-tab"}>
      <p>Tags will be generated using the beat title</p>
      <p>Make sure your beat has a title</p>

      <Input 
        renderCondition={(isUploadingStep === 1)}
        label={"pick a beat"}
        title={"select a beat"}
        type={"file"}
        accepts={"audio/mpeg"}
        style={{ marginTop: 50, paddingInline: 20 }}
        handler={handleFileChange}
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
        <PackagesView isUploadingStep={isUploadingStep} setPackages={setPackages} packages={packages} removePackage={removePackage} isEditing={isEditing} />
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
