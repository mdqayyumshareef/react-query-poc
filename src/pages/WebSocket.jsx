import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import Button from "../components/Button";
import { QueryKeys } from "../helpers/QueryKeys";

export default function WebSocket() {
  const queryClient = useQueryClient();
  
  const handleProfileEvent = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.ProfilesGet] });
  };

  return (
    <div>
      WebSocket event simulations
      <p>
        Click on the below button to simulate the websocket event for profiles.
      </p>
      <Button onClick={handleProfileEvent}>Profile Event</Button>
    </div>
  );
}
