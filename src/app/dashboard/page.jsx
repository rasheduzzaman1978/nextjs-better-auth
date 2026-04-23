import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // ✅ protect route
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Welcome, {user.name} 👋</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default DashboardPage;