import { createBoard, updateSpeed } from "../api/apiMethods";
import { Slider } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#fafafa",
  "& .MuiSlider-markLabel": {
    color: "white",
  },
}));

const Settings = () => {
  const [speed, setSpeed] = useState(2);

  const handleChangeSize = async (e, newVal) => {
    await createBoard({ size: newVal, speed: 1000 * 2 ** (1 - speed) });
  };

  const handleChangeSpeed = async (e, newVal) => {
    setSpeed(newVal);
    await updateSpeed({ speed: 1000 * 2 ** (1 - newVal) });
  };

  const speeds = [
    { value: 1, label: "0.5x" },
    { value: 2, label: "1x" },
    { value: 3, label: "2x" },
    { value: 4, label: "4x" },
    { value: 5, label: "8x" },
  ];

  const sizes = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
    { value: 50, label: "50" },
    { value: 60, label: "60" },
    { value: 70, label: "70" },
  ];

  const speedLabel = () => {
    let label = speeds[speed - 1].label;
    return label;
  };

  return (
    <>
      <hr />
      <div className="row mb-5 justify-content-center">
        <div className="col-4 text-start">
          <h5>Size</h5>
        </div>
        <div className="col-8 text-end">
          <CustomSlider
            aria-label="Board size"
            defaultValue={25}
            min={10}
            max={70}
            step={5}
            valueLabelDisplay="auto"
            marks={sizes}
            onChange={handleChangeSize}
          />
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-4 text-start">
          <h5>Speed</h5>
        </div>
        <div className="col-8 text-end">
          <CustomSlider
            aria-label="Board size"
            defaultValue={2}
            min={1}
            max={5}
            step={null}
            valueLabelFormat={speedLabel}
            valueLabelDisplay="off"
            marks={speeds}
            onChange={handleChangeSpeed}
          />
        </div>
      </div>
    </>
  );
};

export default Settings;
