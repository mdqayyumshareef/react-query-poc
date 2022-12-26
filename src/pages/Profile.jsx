import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { profileService } from "../API/profile/ProfileService";
import { timezoneService } from "../API/timezone/TimezoneService";
import Button from "../components/Button";
import { QueryKeys } from "../helpers/QueryKeys";
import { useTimezone } from "../query-hooks/useTimezone";

export default function Profile() {
  // individual stages for pagination
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);

  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [filter, setFilter] = useState({});

  const {
    isLoading,
    data: profiles,
    isError,
    error,
  } = useQuery({
    queryKey: [QueryKeys.ProfilesGet, pagination, filter],
    queryFn: () =>
      profileService
        .getProfiles(pagination.page, pagination.limit, filter)
        .then((res) => res.data),
    keepPreviousData: true,
  });

  const { data: timezoneData } = useTimezone();

  // const { data: timezoneData } = useQuery({
  //   queryKey: [QueryKeys.TimezoneGet],
  //   queryFn: () => timezoneService.getTimezone().then((res) => res.data[0]),
  // });

  const formik = useFormik({
    initialValues: {
      status: "",
      gender: "",
    },
  });

  const handleApplyFilter = () => {
    const status = formik.values.status;
    const gender = formik.values.gender;
    const filterData = {};
    if (status) {
      filterData.status = status;
    }
    if (gender) {
      filterData.gender = gender;
    }
    setFilter(filterData);
  };

  const handleClearFilter = () => {
    setFilter({});
    formik.resetForm();
  };

  if (isError) {
    return <div>something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="mb-4">current timezone is {timezoneData?.timezone}</p>
      <div className="mb-4">
        <p className="mb-2">Profiles Filters</p>
        <div className="space-x-4 mb-2">
          <span>Status:</span>
          <label>
            <input
              name="status"
              type="radio"
              value={"Unverified"}
              onChange={formik.handleChange("status")}
              checked={formik.values.status === "Unverified"}
              className="mr-1"
            />
            Unverified
          </label>
          <label>
            <input
              name="status"
              type="radio"
              value={"Under Review"}
              onChange={formik.handleChange("status")}
              checked={formik.values.status === "Under Review"}
              className="mr-1"
            />
            Under Review
          </label>
          <label>
            <input
              name="status"
              type="radio"
              value={"Active"}
              onChange={formik.handleChange("status")}
              checked={formik.values.status === "Active"}
              className="mr-1"
            />
            Active
          </label>
          <label>
            <input
              name="status"
              type="radio"
              value={"Terminated"}
              onChange={formik.handleChange("status")}
              checked={formik.values.status === "Terminated"}
              className="mr-1"
            />
            Terminated
          </label>
        </div>
        <div className="space-x-4 mb-2">
          <span>Gender:</span>
          <label>
            <input
              name="gender"
              type="radio"
              value={"Male"}
              onChange={formik.handleChange("gender")}
              checked={formik.values.gender === "Male"}
              className="mr-1"
            />
            Male
          </label>
          <label>
            <input
              name="gender"
              type="radio"
              value={"Female"}
              onChange={formik.handleChange("gender")}
              checked={formik.values.gender === "Female"}
              className="mr-1"
            />
            Female
          </label>
        </div>
        <Button onClick={handleApplyFilter}>Apply Filter</Button>
        <Button onClick={handleClearFilter} className="ml-2">
          Clear Filter
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((item, i) => (
            <tr key={i}>
              <td className="px-4">{item.firstName}</td>
              <td className="px-4">{item.lastName}</td>
              <td className="px-4">{item.email}</td>
              <td className="px-4">{item.gender}</td>
              <td className="px-4">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="space-x-4 mt-4">
        <span>Rows Per Page</span>
        <select
          onChange={(e) =>
            setPagination((old) => ({ ...old, limit: e.target.value }))
          }
          value={pagination.limit}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
        <Button
          onClick={() =>
            setPagination((old) => ({
              ...old,
              page: Math.max(old.page - 1, 1),
            }))
          }
        >
          previous
        </Button>
        <Button
          onClick={() =>
            setPagination((old) => ({ ...old, page: old.page + 1 }))
          }
        >
          next
        </Button>
      </div>
    </div>
  );
}
