import React, { useEffect } from 'react'
import BeatPackageEdit from './Admin/BeatPackageEdit';
import BeatPackage from './BeatPackage';
import AddPackageSelect from '../elemet/AddPackageSelect';

export default function PackagesView({addPackage, uncreatedPackages, removePackage, packages, setPackages, isEditing ,isUploadingStep, activeTab}) {
    

  return (
    <div className='beat-options-scroll'>

    { 
        (activeTab === 3 && isUploadingStep && packages && packages['packages']) ?
        Object.entries(packages['packages']).map((item, i) => {
            return (
            <div key={'packageWrap' + i}>
                {
                isEditing ?
                <BeatPackageEdit
                    className={'beat beat-option beat-option-hide'}
                    handler={null} 
                    condition={(isUploadingStep === 2)} 
                    packageObj={item}
                    formKey={'edit' + item['package']}
                    index={i}
                    setMainObj={setPackages}
                /> :
                <BeatPackage
                    className={'beat beat-option beat-option-hide'}
                    handler={null} 
                    condition={(isUploadingStep === 2)} 
                    packageObj={item}
                    formKey={item['package']}
                    index={i}
                    removeHanlder={removePackage}
                />
                }
            </div>
            )
        })
        : null
    }

    <AddPackageSelect addPackage={addPackage} uncreatedPackages={uncreatedPackages} />
  </div>
  )
}
