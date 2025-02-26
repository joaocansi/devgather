import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { useFormikContext } from "formik";

import { Community } from "../@types";

export default function CommunitiesList() {
  const formik = useFormikContext();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    items: 100,
  });

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  useEffect(() => {}, [pagination]);

  return (
    <div className="mt-4">
      {communities.map((item, index) => (
        <Card key={`communities-${index}`}>fasdjfioajsd</Card>
      ))}
    </div>
  );
}
