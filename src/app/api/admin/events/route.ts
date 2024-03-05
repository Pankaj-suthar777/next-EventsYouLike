import { getMongoDBUserIdOfLoggedInUser } from "@/actions/users";
import { connectDB } from "@/config/dbConfig";
import EventModel from "@/models/event-model";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json(
        { message: "unautherized request" },
        { status: 401 }
      );
    const mongoUserId = await getMongoDBUserIdOfLoggedInUser();
    const reqBody = await request.json();
    reqBody.user = mongoUserId;
    await EventModel.create(reqBody);

    return NextResponse.json(
      { message: "Event created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
