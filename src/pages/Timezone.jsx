import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { timezoneService } from "../API/timezone/TimezoneService";
import Button from "../components/Button";
import { QueryKeys } from "../helpers/QueryKeys";
import { useTimezone } from "../query-hooks/useTimezone";

export default function Timezone() {
  const queryClient = useQueryClient();

  // const { isLoading, data, isError, error } = useQuery({
  //   queryKey: [QueryKeys.TimezoneGet],
  //   queryFn: () => timezoneService.getTimezone().then((res) => res.data[0]),
  // });

  const { isLoading, data, isError } = useTimezone();

  const mutation = useMutation({
    mutationFn: (timezone) => timezoneService.updateTimezone({ timezone }),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TimezoneGet] });
    },
    onError: (err) => {
      console.log("unable to update the timezone" + err);
    },
  });

  const handleSubmit = (values) => {
    mutation.mutate(values.timezone);
  };

  const formik = useFormik({
    initialValues: {
      timezone: data?.timezone ?? "",
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      Current timezone:
      <select
        name="timezone"
        value={formik.values.timezone}
        onChange={formik.handleChange("timezone")}
      >
        <option value={"EST"}>EST</option>
        <option value={"CST"}>CST</option>
        <option value={"MST"}>MST</option>
        <option value={"PST"}>PST</option>
      </select>
      <div>
        <Button type="button" onClick={formik.handleSubmit}>
          Update
        </Button>
      </div>
    </div>
  );
}
