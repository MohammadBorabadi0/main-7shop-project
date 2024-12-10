import React from "react";

// Layout
import Layout from "../Layout/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <header className="mb-6">
        <h2 className="text-xl font-semibold">About Us</h2>
      </header>
      <section className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <img
            src="./assets/images/aboutus.jpg"
            alt="aboutus"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="flex-1">
          <span className="inline-block mb-4 pb-1 text-2xl font-semibold border-b-4 border-orange-500 text-slate-800">
            Our Story
          </span>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
            accusantium sapiente tempora sed dolore esse deserunt eaque
            excepturi, delectus error accusamus vel eligendi, omnis beatae.
            Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque
            dolore, obcaecati incidunt sequi blanditiis est exercitationem
            molestiae delectus saepe odio eligendi modi porro eaque in libero
            minus unde sapiente consectetur architecto. Ullam rerum, nemo iste
            ex, eaque perspiciatis nisi, eum totam velit saepe sed quos
            similique amet. Ex, voluptate accusamus nesciunt totam vitae esse
            iste.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
