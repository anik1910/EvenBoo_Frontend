"use client";
import { useParams } from "next/navigation";

export default function EventDetails() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Event Details</h1>
      <p className="mt-4 text-lg">You are viewing event ID: {id}</p>
    </div>
  );
}
