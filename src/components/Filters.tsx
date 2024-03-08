"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Filters = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    name: "",
    date: "",
  });

  useEffect(() => {
    setTimeout(() => {
      router.push(`/?name=${filters.name}&date=${filters.date}`);
    }, 400);
  }, [filters.name]);

  useEffect(() => {
    router.push(`/?name=${filters.name}&date=${filters.date}`);
  }, [filters.date]);

  return (
    <div className="bg-white p-5 rounded-sm mb-5 flex flex-col sm:flex-row md:gap-5 gap-3 md:items-end">
      <div className="w-full">
        <h1 className="text-sm text-gray-500 mb-2 ">
          Serach for an event by name
        </h1>
        <input
          type="text"
          value={filters.name}
          onChange={(e) =>
            setFilters((pre) => ({ ...pre, name: e.target.value }))
          }
          placeholder="Search for an event"
          className="p-2 rounded-md w-full border border-gray-400 "
        />
      </div>
      <div className="w-full">
        <h1 className="text-sm text-gray-500 mb-2">
          Serach for an event by date
        </h1>
        <input
          type="date"
          value={filters.name}
          onChange={(e) =>
            setFilters((pre) => ({ ...pre, date: e.target.value }))
          }
          placeholder="Search for an event"
          className="p-2 rounded-md w-full border border-gray-400"
        />
      </div>
      <div className="w-60">
        <Button
          className="px-5"
          onClick={() => setFilters({ name: "", date: "" })}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
