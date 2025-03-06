/* eslint-disable padding-line-between-statements */
import { useCallback, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Pagination } from "@heroui/pagination";

import { queryParamUrl } from "../shared/utils/url-queryparam";
import { api } from "../shared/clients/api-client";

import { CommunitiesFormik } from "./communities-form";
import CommunityCard from "./community-card";

export default function CommunitiesList() {
  const { values: filters } = useFormikContext<CommunitiesFormik>();
  const [loading, setLoading] = useState(false);

  const [communities, setCommunities] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 10,
    itemsPerPage: 25,
  });

  const findCommunitiesByFilters = useCallback(async () => {
    const url = queryParamUrl("/communities?", {
      ...filters,
      limit: pagination.itemsPerPage,
      page: pagination.page,
    });

    try {
      const response = await api.get(url);
      setCommunities(response.data.data);
      setPagination((previousData) => ({
        ...previousData,
        total: response.data.total,
      }));
    } catch {
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    setPagination((previousData) => ({
      ...previousData,
      page: 1,
    }));
    findCommunitiesByFilters();
  }, [filters]);

  return (
    <div className="mt-8 flex flex-col justify-between">
      <div className="grid grid-cols-4 gap-4">
        {communities.map((item, index) => (
          <CommunityCard
            key={`communities-${index}`}
            data={{
              description: item.description,
              image: item.image,
              name: item.name,
              slug: item.slug,
              tags: item.tags,
              city: item.city,
              state: item.state,
              totalMembers: item.totalMembers,
            }}
          />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Pagination
          className={`${loading && "hidden"}`}
          initialPage={1}
          page={pagination.page}
          total={Math.ceil(pagination.total / pagination.itemsPerPage)}
        />
      </div>
    </div>
  );
}
