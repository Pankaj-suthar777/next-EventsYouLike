import PageTitle from "@/components/PageTitle";
import { Link } from "@nextui-org/react";
import React from "react";

function EventPage() {
  return (
    <div className="flex justify-between">
      <PageTitle title="Events" />
      <Link
        href="/admin/events/new-event"
        className="bg-primary text-white px-5 py-2 rounded-sm text-sm"
      >
        Create Event
      </Link>
    </div>
  );
}

export default EventPage;
