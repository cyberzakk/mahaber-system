"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const meetingDate = new Date("2026-04-01"); // change later

  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const today = new Date();
    const diff = meetingDate - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setDaysLeft(days);
  }, []);

  return (
    <section className="text-center py-20">

      <h1 className="text-4xl font-bold mb-6">
        Estifanos Mahaber
      </h1>

      <p className="text-xl mb-4">
        Next Mahaber Meeting
      </p>

      <p className="text-3xl font-bold text-yellow-500">
        {daysLeft} Days Remaining
      </p>

      <div className="mt-8 text-lg">

        <p>Lead (Sabaqi): ______</p>
        <p>Bread & Snacks: ______</p>

      </div>

    </section>
  );
}