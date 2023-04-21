import React, { useEffect, useState } from "react";

import StatsPresenter from "./StatsPresenter";

export default function StatsComponent() {
  const statsPresenter = React.useMemo(() => new StatsPresenter(), []);
  const [stateViewModel, copyViewModelToStateViewModel] = useState("");

  useEffect(() => {
    statsPresenter.load((generatedViewModel) => {
      copyViewModelToStateViewModel(generatedViewModel);
    });
  }, [statsPresenter]);

  return (
    <div>
      <h5>Last Added Book (ui)</h5>
      {stateViewModel}
    </div>
  );
}
