import PageTitle from "@/components/PageTitle";
import EventModel from "@/models/event-model";
import React from "react";
import { connectDB } from "@/config/dbConfig";
import ReportsTable from "./_components/reports-events-table";
connectDB();

const ReportsPage = async () => {
  const events = await EventModel.find({});
  return (
    <div>
      <PageTitle title="Reports" />
      <ReportsTable events={JSON.parse(JSON.stringify(events))} />
    </div>
  );
};

export default ReportsPage;
