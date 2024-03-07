import { connectDB } from "@/config/dbConfig";
import BookingModel from "@/models/booking-model";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(
  request: NextRequest,
  { params }: { params: { bookingid: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const reqBody = await request.json();
    await BookingModel.findByIdAndUpdate(params.bookingid, reqBody);

    return NextResponse.json(
      { message: "Booking updated successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
