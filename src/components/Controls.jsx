import { createBoard, updateSpeed, updateStatus } from "../api/apiMethods";
import KeyboardDoubleArrowRightTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowRightTwoTone";
import KeyboardDoubleArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowLeftTwoTone";
import IconButton from "@mui/material/IconButton";

export const Controls = ({ generations, isRunning, size, speed }) => {
  const handleReset = async () => {
    await createBoard({ size: size, speed: speed });
  };
  const handleRun = async () => {
    await updateStatus({ isRunning: !isRunning });
  };

  const handleFastForward = async () => {
    let newSpeed = speed === 62.5 ? 1000 : speed / 2;
    await updateSpeed({ speed: newSpeed });
  };

  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-1"></div>
      <div className="col-2">
        <IconButton
          aria-label="Fast foward"
          color="inherit"
          onClick={handleFastForward}
        >
          {speed === 62.5 ? (
            <KeyboardDoubleArrowLeftTwoToneIcon fontSize="large" />
          ) : (
            <KeyboardDoubleArrowRightTwoToneIcon fontSize="large" />
          )}
        </IconButton>
      </div>
      <div className="col-6 text-center">
        {generations === size * 10 ? (
          "Run complete"
        ) : (
          <IconButton
            aria-label="Play/Pause"
            size="large"
            color="inherit"
            onClick={handleRun}
          >
            {isRunning ? (
              <i className="bi bi-pause-fill"></i>
            ) : (
              <i className="bi bi-play-fill"></i>
            )}
          </IconButton>
        )}
      </div>
      <div className="col-2 text-end">
        <IconButton
          aria-label="Restart"
          size="large"
          color="inherit"
          onClick={handleReset}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </IconButton>
      </div>
      <div className="col-1"></div>
    </div>
  );
};
