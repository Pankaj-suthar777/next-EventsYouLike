"use client";
import Steps from "@/components/Steps";
import React, { useEffect, useState } from "react";
import General from "./General";
import LocationAndDate from "./LocationAndDate";
import Media from "./Media";
import Tickets from "./Tickets";
import toast from "react-hot-toast";
import { uploadImagesToFirebaseAndGetUrls } from "@/helpers/image-upload";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  initialData?: any;
  type: "edit" | "create";
}

const EventForm = ({ initialData, type = "create" }: Props) => {
  const router = useRouter();
  const [activeSteps, setActiveSteps] = useState(0);
  const [alreadyUploadedImages, setAlreadyUploadedImages] = useState<any[]>([]);
  const [event, setEvent] = useState<any>(null);
  const [newlySelectedImages, setNewlySelectedImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (e: any) => {
    setLoading(true);
    try {
      e.preventDefault();
      if (type === "create") {
        event.images = await uploadImagesToFirebaseAndGetUrls(
          newlySelectedImages.map((image: any) => image.file)
        );
        await axios.post("/api/admin/events", event);
        toast.success("Event created successfully");
      } else {
        const newlyUploadedImagesUrls = await uploadImagesToFirebaseAndGetUrls(
          newlySelectedImages.map((image: any) => image.file)
        );
        event.images = [...alreadyUploadedImages, ...newlyUploadedImagesUrls];
        await axios.put(`/api/admin/events/${event._id}`, event);
        toast.success("Event updated successfully");
      }
      router.refresh();
      router.push("/admin/events");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const commonProps = {
    activeSteps,
    setActiveSteps,
    event,
    setEvent,
    newlySelectedImages,
    setNewlySelectedImages,
    loading,
    alreadyUploadedImages,
    setAlreadyUploadedImages,
  };

  useEffect(() => {
    if (initialData) {
      setEvent(initialData);
      setAlreadyUploadedImages(initialData.images);
    }
  }, [initialData]);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Steps
          stepNames={["General", "Location & Date", "Media", "Tickets"]}
          stepContent={[
            <General {...commonProps} />,
            <LocationAndDate {...commonProps} />,
            <Media {...commonProps} />,
            <Tickets {...commonProps} />,
          ]}
          activeStep={activeSteps}
        />
      </form>
    </div>
  );
};

export default EventForm;
