import { connectDB } from "@/config/dbConfig";
import UserModel from "@/models/user-modal";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("unautherized request");
    const userInMongoDb = await UserModel.findOne({
      clerkUserId: userId,
    });
    return NextResponse.json({ user: userInMongoDb }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
