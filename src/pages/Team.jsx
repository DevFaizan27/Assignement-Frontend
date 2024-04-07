import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../redux/actions/teamAction.js';
import Spinner from '../components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const Team = () => {
  const dispatch = useDispatch();
  const { teams, isLoading, isError, isSuccess, message } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div className="bg-[#32353F] min-h-screen w-full p-2">
      <h1 className="text-2xl font-semibold text-gray-200 mb-4">Team Information</h1>
      {isLoading && <Spinner />}
      {isError && <p className="text-red-600">{message}</p>}
      {isSuccess && (
        <div className="bg-gray-800 rounded-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-900">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Domain</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Availability</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-900">
              {teams?.teams?.map((team, index) => (
                <tr key={team._id} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                  <td className="px-6 py-4 text-gray-200 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaEye className="mr-2" />
                      <Link to={`team-info/${team._id}`} className="text-gray-200">{`Team${index + 1}`}</Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-200 whitespace-nowrap">{team.domain}</td>
                  <td className="px-6 py-4 text-gray-200 whitespace-nowrap">{team.available ? 'Available' : 'Not Available'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Team;
