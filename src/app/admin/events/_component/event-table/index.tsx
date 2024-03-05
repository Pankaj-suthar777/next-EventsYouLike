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
import axios from "axios";
import toast from "react-hot-toast";

const EventsTable = ({ events }: { events: EventType[] }) => {
  const [loading, setLoading] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState("");
  const router = useRouter();

  const onDelete = async (id: string) => {
    try {
      setLoading(false);
      await axios.delete(`/api/admin/events/${id}`);
      toast.success("Event deleted successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSelectedIdToDelete("");
      setLoading(false);
    }
  };
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
                <div className="flex gap-5">
                  <Button
                    isIconOnly
                    size="sm"
                    onClick={() => {
                      setSelectedIdToDelete(event._id);
                      onDelete(event._id);
                    }}
                    isLoading={loading && selectedIdToDelete === event._id}
                  >
                    {selectedIdToDelete !== event._id && (
                      <i className="ri-delete-bin-line"></i>
                    )}
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    onClick={() =>
                      router.push(`/admin/events/edit-event/${event._id}`)
                    }
                  >
                    <i className="ri-pencil-line"></i>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventsTable;
