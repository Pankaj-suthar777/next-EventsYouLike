import {
  getMongoDBUserIdOfLoggedInUser,
  handleNewUserRegistration,
} from "@/actions/users";
import { connectDB } from "@/config/dbConfig";
import { UserButton } from "@clerk/nextjs";
connectDB();

export default async function Home() {
  await handleNewUserRegistration();

  const mongoUserId = await getMongoDBUserIdOfLoggedInUser();
  console.log("mongodb id :", mongoUserId);
  return <div>Homepage</div>;
}
