export default function OrganizerDetails() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-lime-400 mb-6 text-center drop-shadow-lg">
        Organizer Details
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700 hover:bg-gray-700 transition duration-200">
              <td className="px-6 py-4">Rohan</td>
              <td className="px-6 py-4">rohan@gmail.com</td>
              <td className="px-6 py-4">Add Events</td>
            </tr>
            <tr className="border-b border-gray-700 hover:bg-gray-700 transition duration-200">
              <td className="px-6 py-4">Anik</td>
              <td className="px-6 py-4">anik@gmail.com</td>
              <td className="px-6 py-4">Add Events</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
