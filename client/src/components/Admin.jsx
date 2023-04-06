import React, { useContext } from "react";

import Table from "./Table";
import { GlobalContext } from "../context/GlobalContext";

export default function Admin() {
  const { state } = useContext(GlobalContext);
  const { userLogin } = state;
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Welcome {userLogin?.username}!
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              id nisl mauris. Praesent a luctus odio, vitae dapibus ante.
            </p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="mockup"
            />
          </div>
        </div>
      </section>
      <section className="container mx-10 my-10">
        <Table />
      </section>
    </>
  );
}
