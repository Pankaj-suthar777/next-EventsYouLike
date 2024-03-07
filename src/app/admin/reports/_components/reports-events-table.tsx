"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { EventType } from "@/interfaces/events";
import { useRouter } from "next/navigation";

const ReportsTable = ({ events }: { events: EventType[] }) => {
  const router = useRouter();

  return (
    <div className="mt-5">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ORGANIZER</TableColumn>
          <TableColumn>TIME</TableColumn>
          <TableColumn>LOCATION</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event._id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.organizer}</TableCell>
              <TableCell>{event.time}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => router.push(`/admin/reports/${event._id}`)}
                >
                  View Report
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportsTable;
