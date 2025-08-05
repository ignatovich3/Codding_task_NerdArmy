import React from 'react';

const HomePage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Lista publiczna</h2>
      <p className="text-gray-600 mb-6">Zaloguj się, aby dodawać lub edytować kwiaty.</p>

      <div className="flex gap-4 mb-6">
        <select className="p-2 border rounded w-1/2">
          <option>Kategoria</option>
        </select>
        <select className="p-2 border rounded w-1/2">
          <option>Status</option>
        </select>
      </div>

      <table className="w-full table-auto bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Nazwa</th>
            <th className="p-3 text-left">Kategoria</th>
            <th className="p-3 text-left">Ilość</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-3">Róża</td>
            <td className="p-3">Piękny</td>
            <td className="p-3">5</td>
            <td className="p-3">Dostępny</td>
          </tr>
          <tr className="border-t">
            <td className="p-3">Storczyk</td>
            <td className="p-3">Rzadki</td>
            <td className="p-3">2</td>
            <td className="p-3">Mało</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
