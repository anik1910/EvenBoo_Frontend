export default function EventDetails() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-lime-400 mb-6 text-center drop-shadow-lg">
        Event Details
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Id</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Event Name</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Starting Time</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Ending Time</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Organizer Name</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Participants</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700 hover:bg-gray-700 transition duration-200">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">Half Day</td>
              <td className="px-6 py-4">Variety of shows</td>
              <td className="px-6 py-4">01/09/2025, 10:00 AM</td>
              <td className="px-6 py-4">01/09/2025, 10:00 PM</td>
              <td className="px-6 py-4">Saumik</td>
              <td className="px-6 py-4">list</td>
            </tr>
            <tr className="border-b border-gray-700 hover:bg-gray-700 transition duration-200">
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">Anchors</td>
              <td className="px-6 py-4">Gaming Tournament</td>
              <td className="px-6 py-4">01/09/2025, 10:00 AM</td>
              <td className="px-6 py-4">01/09/2025, 10:00 PM</td>
              <td className="px-6 py-4">Rohan</td>
              <td className="px-6 py-4">list</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
