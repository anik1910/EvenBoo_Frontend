export default function UserDetails() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-lime-400 mb-6 text-center drop-shadow-lg">
        User Details
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Id</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">Password</th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-lime-400 uppercase tracking-wider">NID</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700 hover:bg-gray-700 transition duration-200">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">Rohan</td>
              <td className="px-6 py-4">rohan@gmail.com</td>
              <td className="px-6 py-4">01234567891</td>
              <td className="px-6 py-4">******</td>
              <td className="px-6 py-4">12345678910</td>
            </tr>
            <tr className="border-b border-gray-700 hover:bg-gray-700 transition duration-200">
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">Anik</td>
              <td className="px-6 py-4">anik@gmail.com</td>
              <td className="px-6 py-4">01987654321</td>
              <td className="px-6 py-4">******</td>
              <td className="px-6 py-4">10987654321</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
