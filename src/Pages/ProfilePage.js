import React from "react";

// Layout
import Layout from "../Layout/Layout";
// Context
import { useUserContext } from "../Providers/Context/user_context";

const ProfilePage = () => {
  const { myUser, loginWithRedirect } = useUserContext();

  if (myUser) {
    return (
      <Layout>
        <section className="px-6 xl:px-3">
          <div className="flex gap-4 items-center mb-5">
            <img
              src={myUser.picture}
              alt={`${myUser.name} pic`}
              className="rounded-full w-16"
            />
            <h1 className="text-xl font-bold">Hello, {myUser.given_name}</h1>
          </div>
          <div className="flex flex-col gap-1 font-semibold">
            <h4>
              Name : <span className="text-slate-700">{myUser.name}</span>
            </h4>
            <p>
              Email : <span className="text-slate-700">{myUser.email}</span>
            </p>
          </div>
        </section>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="flex flex-col items-center gap-4 pt-6">
          <h2 className="text-lg font-medium">You are not logged in yet</h2>
          <button
            onClick={loginWithRedirect}
            className="font-medium bg-orange-500 text-white px-6 py-1 w-fit rounded-md"
          >
            Login
          </button>
        </div>
      </Layout>
    );
  }
};

export default ProfilePage;
