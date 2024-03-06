import { handleNewUserRegistration } from "@/actions/users";
import { connectDB } from "@/config/dbConfig";
import { EventType } from "@/interfaces/events";
import EventModel from "@/models/event-model";
import { Link } from "@nextui-org/react";
connectDB();

export default async function Home() {
  await handleNewUserRegistration();

  const events: EventType[] = (await EventModel.find().sort({
    createdAt: -1,
  })) as any;
  return (
    <div>
      <div className="flex flex-col gap-5">
        {events.map((event) => (
          <div
            key={event._id}
            className="grid grid-cols-3 bg-white rounded-md gap-10 border border-gray-200"
          >
            <div className="col-span-1">
              <img
                src={event.images[0]}
                alt="image of event"
                height={130}
                className="object-fill w-full rounded-sm"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-5 justify-between p-5">
              <h1 className="semibold text-gray-800">{event.name}</h1>
              <p className="text-gray-500 w-full line-clamp-3 text-sm">
                {event.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <h1>
                    <i className="ri-map-pin-line pr-5"></i> {event.location}
                  </h1>
                  <h1>
                    <i className="ri-calendar-line pr-5"></i> {event.date} at{" "}
                    {event.time}
                  </h1>
                </div>
                <Link
                  href={`/book-event/${event._id}`}
                  className="bg-primary text-white px-5 py-2 rounded-sm text-sm"
                >
                  View Event
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
