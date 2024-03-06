import { getMongoDBUserIdOfLoggedInUser } from "@/actions/users";
import { connectDB } from "@/config/dbConfig";
import BookingModel from "@/models/booking-model";
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
    await BookingModel.create(reqBody);

    return NextResponse.json(
      { message: "Event booked successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
