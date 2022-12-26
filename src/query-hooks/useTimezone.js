import { useQuery } from "@tanstack/react-query";
import React from "react";
import { timezoneService } from "../API/timezone/TimezoneService";
import { QueryKeys } from "../helpers/QueryKeys";

export function useTimezone() {
  return useQuery({
    queryKey: [QueryKeys.TimezoneGet],
    queryFn: () => timezoneService.getTimezone().then((res) => res.data[0]),
  });
}
