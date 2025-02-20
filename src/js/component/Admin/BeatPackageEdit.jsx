import React, { useEffect, useState } from "react";
import Radio from "../../elemet/Radio";
import Input from "../../elemet/Input";
import useAdminContext from "../../hooks/useContext/useAdminContext";

export default function BeatPackageEdit({
  condition,
  setMainObj,
  packageObj,
  index,
  style,
  className,
}) {
  packageObj = packageObj[1];

  const { packagesFilled, uncreatedPackages, adminDispatch } =
    useAdminContext();
  const [loaded, setLoaded] = useState(false)

  const [newPackage, setPackage] = useState(
    packageObj || {
      package: undefined,
      price: undefined,
      untagged: false,
      file: undefined,
      mp3: {
        mp3: false,
        bitrate: undefined,
      },
      wav: false,
      "project-files": false,
    }
  );

  useEffect(() => {
    console.log('new package', newPackage);

    if (Object.values(newPackage).every((value) => value !== undefined))
      adminDispatch({ type: "SET_PACKAGES_FILLED", payload: true });
    if (packagesFilled)
      setMainObj((prev) => ({
        ...prev,
        packages: { ...prev["packages"], [newPackage["package"]]: newPackage },
      }));
  // eslint-disable-next-line
  }, [newPackage, packagesFilled]);

  useEffect(() => {
    setLoaded(true);
    return () => {
      setLoaded(false);
    };
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefualt()
  //   alert('submitted')
  // }

  return (
    <form
      className={loaded ? "beat-option" : className}
      style={{ transform: !loaded && `translateY(${10 * (index + 1)}%)` }}
    >
      <div className="title-body">
        <h4
          style={{
            boxShadow: `rgba(240, 248, 255, ${
              index ? (index + 1) / 10 : 0.2
            }) 0px 2px 20px 20px`,
          }}
          // backgroundColor: `rgba(240, 248, 255, ${index ? (index + 1) / 10 : .2})`}}
        >
          {packageObj["package"]}
        </h4>
        <div className="body">
          {Object.entries(packageObj).map(([key, value], i) => {
            const excludedKeys = ["package"];
            if (excludedKeys.includes(key)) return null;
            return (
              <div className="property-wrap" key={i}>
                <div className="key">
                  <p>{key}</p>
                </div>
                <div className="value">
                  {typeof value === "object" ? (
                    Object.entries(value).map(([innerKey, value], i) => {
                      console.log(typeof value);

                      return (
                        <div className="value-key-value" key={i}>
                          <div className="bolean-string">
                            <p>{innerKey}:</p>
                            {typeof value === "boolean" ? (
                              <Radio
                                setter={setPackage}
                                setKey={key}
                                setInnerKey={innerKey}
                                placeholder={value}
                              />
                            ) : (
                              <Input
                                setter={setPackage}
                                setKey={key}
                                setInnerKey={innerKey}
                                renderCondition={true}
                                title={key}
                                type={value === 'file' ? 'file' : "number"}
                                inputStyle={{ height: 25, width: 50 }}
                                placeholder={value}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : typeof value === "boolean" ? (
                    <Radio setter={setPackage} setKey={key} />
                  ) : key === "package" ? (
                    <div className="gradient-border" style={{ height: 25 }}>
                      <select className="clip">
                        {uncreatedPackages?.length
                          ? uncreatedPackages.map((item, i) => {
                              return <option key={i}>{item}</option>;
                            })
                          : null}
                      </select>
                    </div>
                  ) : (
                    <Input
                      setter={setPackage}
                      setKey={key}
                      renderCondition={true}
                      title={key}
                      type={key === 'file' ? "file" : "text"}
                      inputStyle={{ height: 25, width: 50 }}
                      placeholder={value}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
}
