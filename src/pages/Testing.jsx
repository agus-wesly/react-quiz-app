import TimeStamp from "../components/TimeStamp";
import { useState } from "react";

function Testing() {
  const [startTime, setStartTime] = useState(false);

  return (
    <div>
      <TimeStamp
        startTime={startTime}
        setStartTime={setStartTime}
        currentTime={currentTime}
        next30Minutes={next30Minutes}
      />
    </div>
  );
}

export default Testing;
