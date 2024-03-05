import PageTitle from "@/components/PageTitle";
import React from "react";
import EventForm from "../../_component/event-form";
import { connectDB } from "@/config/dbConfig";
import EventModel from "@/models/event-model";
connectDB();

interface Props {
  params: {
    eventid: string;
  };
}

async function EditEventPage({ params }: Props) {
  const eventId = params.eventid;
  const event = await EventModel.findById(eventId);
  return (
    <div>
      <PageTitle title="Edit Event" />
      <div className="bg-white p-5 mt-5">
        <EventForm
          type="edit"
          initialData={JSON.parse(JSON.stringify(event))}
        />
      </div>
    </div>
  );
}

export default EditEventPage;
