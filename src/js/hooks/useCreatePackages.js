import { useEffect, useState } from "react";
import useAdminContext from "./useContext/useAdminContext";

export default function useCreatePackages() {
  const { uncreatedPackages, adminDispatch } = useAdminContext();

  const [isEditing, setIsEditing] = useState(false);

  
  const [packages, setPackages] = useState({
    info: {
      title: undefined,
      bpm: undefined,
      tags: [],
    },

    packages: {
      free: {
        package: "free",
        price: undefined,
        untagged: false,
        file: undefined,
        mp3: {
          mp3: false,
          bitrate: undefined,
        },
        wav: false,
        "project-files": false,
      },
    },
  });

  const packageTemplate = {
    package: "free",
    price: undefined,
    untagged: false,
    file: undefined,
    mp3: {
      mp3: false,
      bitrate: undefined,
    },
    wav: false,
    "project-files": false,
  };


  const resetPackages = () => {
    setPackages({
      info: {
        title: undefined,
        bpm: undefined,
        tags: [],
      },
  
      packages: {
        free: {
          package: "free",
          price: undefined,
          untagged: false,
          file: undefined,
          mp3: {
            mp3: false,
            bitrate: undefined,
          },
          wav: false,
          "project-files": false,
        },
      },
    });
  };

  const removePackage = (pkg) => {
    !uncreatedPackages.includes(pkg) &&
      adminDispatch({type: "SET_UNCREATED_PACKAGES", payload: uncreatedPackages?.length ? 
      [...uncreatedPackages, pkg] : [pkg]});

    delete packages.packages[pkg];
    setPackages((prev) => ({ ...prev, packages: { ...prev.packages } }));
  };

  const addPackage = (pkg) => {
    console.log('admin pg is', pkg);
    
    adminDispatch({type: "SET_UNCREATED_PACKAGES", payload: uncreatedPackages.filter((itemInArray) => itemInArray !== pkg)});
    setPackages((prev) => ({...prev, packages: {...prev.packages, [pkg]: { ...packageTemplate, package: pkg}}}));
  };

  const handleEditingModeChange = (newValue) => {
    setIsEditing(newValue);
  };

  return {
    addPackage,
    removePackage,
    handleEditingModeChange,
    packages,
    setPackages,
    uncreatedPackages,
    packageTemplate,
    isEditing,
    resetPackages
  };
}
