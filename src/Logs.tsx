import React from "react";
import { useSelector } from "./";

export default function Logs() {
  const logs = useSelector((state) => state.logsReducer);
  const allLogs = logs.map((prije) => <p>{prije}</p>);

  return (
    <div className="logsBox">
      <div className="logsTag">Logs</div>
      <div className="logs okvir">{allLogs}</div>
    </div>
  );
}
