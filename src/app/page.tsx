import { handleNewUserRegistration } from "@/actions/users";
import Filters from "@/components/Filters";
import { connectDB } from "@/config/dbConfig";
import { EventType } from "@/interfaces/events";
import EventModel from "@/models/event-model";
import { Link } from "@nextui-org/react";
connectDB();

interface Props {
  searchParams: {
    name: string;
    date: string;
  };
}

export default async function Home({ searchParams }: Props) {
  await handleNewUserRegistration();

  let filters = {};
  if (searchParams.name) {
    filters = {
      name: {
        $regex: searchParams.name,
        $options: "i",
      },
    };
  }
  if (searchParams.date) {
    filters = {
      ...filters,
      date: searchParams.date,
    };
  }
  const events: EventType[] = (await EventModel.find(filters).sort({
    createdAt: -1,
  })) as any;
  return (
    <div>
      <Filters />
      <div className="flex flex-col gap-5">
        {events.map((event) => (
          <div
            key={event._id}
            className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-md md:gap-10 border border-gray-200"
          >
            <div className="col-span-1">
              <img
                src={event.images[0]}
                alt="image of event"
                height={130}
                className="object-fill w-full rounded-sm"
              />
            </div>
            <div className="col-span-2 flex flex-col md:gap-5 gap-3 justify-between md:p-5 p-3">
              {/* <h1 className="semibold text-gray-800">{event.name}</h1> */}
              <h1 className="semibold text-gray-800 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {event.name}
              </h1>

              <p className="text-gray-500 w-full md:line-clamp-3 line-clamp-2 text-sm">
                {event.description}
              </p>
              <div className="flex justify-between items-center ">
                <div className="text-xs max-w-[60%]">
                  <div className="flex mb-3">
                    <i className="ri-map-pin-line md:pr-4 pr-2"></i>
                    <h1 className="line-clamp-1">{event.location}</h1>
                  </div>
                  <h1>
                    <i className="ri-calendar-line md:pr-4 pr-2"></i>{" "}
                    {event.date} at {event.time}
                  </h1>
                </div>
                <Link
                  href={`/book-event/${event._id}`}
                  className="bg-primary self-center text-white px-5 py-2 rounded-sm text-sm"
                >
                  View Event
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {events.length === 0 && (
        <div className="w-full mt-120 flex justify-center">
          <h1 className="text-2xl">No events found for your search</h1>
        </div>
      )}
    </div>
  );
}
