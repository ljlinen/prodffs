import React, { useEffect, useState } from "react";
import "../../css/homepage.css";
import "../../css/adminpage.css";
import iconBack from "../../asset/img/icon/chevron-left.svg";
import IconButton from "../component/IconButton";
import { baseUrl } from "../..";
import { useLocation } from "react-router-dom";
import AudioPlayer from "../component/AudioPlayer";
import useCreatePackages from "../hooks/useCreatePackages";
import useUploadBeat from "../hooks/useUploadBeat";
import PageIndicator from "../component/PageIndicator";
import Header from "../component/Header";
import TabManageInventory from "../component/Admin/TabManageInventory";
import TabUploadBeat from "../component/Admin/TabUploadBeat";
import useBeatPages from "../hooks/useBeatPages";

export default function AdminPage() {
  const location = useLocation();

  // const { selectedBeat, buyingDispatch } = useBuyingContext();
  // const { beats, inventory, beatsDispatch } = useBeatsContext();

  const [fullScreen, setFullScreen] = useState();
  const [activeTab, setActiveTab] = useState(1);
  const [resetCurrentTab, setResetCurrentTab] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);

  const { packages, setPackages, resetPackages, packageTemplate, handleEditingModeChange, removePackage, addPackage, uncreatedPackages, isEditing } = useCreatePackages();
  const { setIsUploadingStep, isUploadingStep, result, file, setFile, setResult, uploadBeat } = useUploadBeat(packages);
  const { fetchedPages } = useBeatPages(currentPage)
  // eslint-disable-next-line no-unused-vars
  const [adminData, setAdminData] = useState();
  // const [stepComplete, setStepComplete] = useState(false);


  useEffect(() => {
    const admin = async () => {
      try {
        const response = await fetch(baseUrl);
        if (response.ok) {
          const responseJson = await response.json();
          setAdminData(responseJson)
        }
      } catch (error) {
        console.log("error loading adminpage", error);
      }
    };

    if(location.pathname === '/admin'){
      admin()      
    } 

  }, [location.pathname]);

  useEffect(() => {
    console.log('admin packages', packages);
  }, [packages]);


  return (
    <div>
      <Header resetCurrentTab={resetCurrentTab} fullScreen={fullScreen} activeTab={activeTab} setActiveTab={setActiveTab} setFullScreen={setFullScreen} setIsUploadingStep={setIsUploadingStep} />

      <div className="admin" style={{ minHeight: "92vh" }}>
        <div className="beatlist">
          {/* <AudioPlayer renderCondition={fullScreen} /> */}
          <div className="info-text">
            <h4 style={{ textTransform: "capitalize" }}>
              {
                (activeTab === 1 && 'This is how we doing so far') ||
                (activeTab === 2 && 'Any Changes You Thinking of?') ||
                (activeTab === 3 && !result && 'Lets upload a new beat') ||
                ((activeTab === 3 && (isUploadingStep > 2 && result)) && result?.message)
              }
            </h4>
          </div>

          <div className="tabs">
            <div className={activeTab === 1 ? "t1 show-tab" : "hide-tab"}>Tab 1</div>
            <TabManageInventory activeTab={activeTab} setActiveTab={setActiveTab} setResetCurrentTab={setResetCurrentTab} setFullScreen={setFullScreen} />
            <TabUploadBeat activeTab={activeTab} isUploadingStep={isUploadingStep} setIsUploadingStep={setIsUploadingStep} file={file} setFile={setFile} handleEditingModeChange={handleEditingModeChange} setPackages={setPackages} uploadBeat={uploadBeat} packages={packages} removePackage={removePackage} addPackage={addPackage} uncreatedPackages={uncreatedPackages} isEditing={isEditing} setResetCurrentTab={setResetCurrentTab} setActiveTab={setActiveTab} resetPackages={resetPackages} result={result} setResult={setResult} setFullScreen={setFullScreen} />
          </div>

          <PageIndicator activeTab={activeTab} isUploadingStep={isUploadingStep} />
        </div>
      </div>
    </div>
  );
}
