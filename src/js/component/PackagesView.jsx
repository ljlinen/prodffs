import React, { useEffect } from 'react'
import BeatPackageEdit from './Admin/BeatPackageEdit';
import BeatPackage from './BeatPackage';
import AddPackageSelect from '../elemet/AddPackageSelect';

export default function PackagesView({addPackage, uncreatedPackages, removePackage, packages, setPackages, isEditing ,isUploadingStep, activeTab}) {
    
    useEffect(() => {
        console.log('unreflecting packages', packages);
      }, [packages]);

  return (
    <div className='beat-options-scroll'>

    { 
        (activeTab === 3 && isUploadingStep && packages && packages['packages']) ?
        Object.entries(packages['packages']).map((item, i) => {
            console.log('package to render: ', item, i);
            

            return (
            <>
                {
                isEditing ?
                <BeatPackageEdit
                    className={'beat beat-option beat-option-hide'}
                    handler={null} 
                    condition={(isUploadingStep === 2)} 
                    packageObj={item}
                    key={'edit' + item['package']}
                    index={i}
                    setMainObj={setPackages}
                /> :
                <BeatPackage
                    className={'beat beat-option beat-option-hide'}
                    handler={null} 
                    condition={(isUploadingStep === 2)} 
                    packageObj={item}
                    key={item['package']}
                    index={i}
                    removeHanlder={removePackage}
                />
                }
            </>
            )
        })
        : null
    }

    <AddPackageSelect addPackage={addPackage} uncreatedPackages={uncreatedPackages} />
  </div>
  )
}
