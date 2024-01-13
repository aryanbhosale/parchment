import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

const Page = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user || user?.id) {
        redirect('/auth-callback?origin=dashboard')
    }

  return (
    <div>
        {user?.email}
    </div>
  )
}

export default Page

// http://localhost:3000/localhost:3000/api/trpc/authCallback?batch=1&input=%7B%7D 2:21:56 time