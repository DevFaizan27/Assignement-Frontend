import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamById, getTeams } from '../redux/actions/teamAction.js';
import Spinner from '../components/Spinner.jsx';
import { Link ,useParams} from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import UserCard from './UserCard.jsx';

const TeamInfo = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);

    const { team, isLoading, isError, isSuccess, message } = useSelector((state) => state.team);
  
    useEffect(() => {
      dispatch(getTeamById(id));
    }, [dispatch]);

    if (isLoading) {
        return <p><Spinner/></p>;
      }
    
      if (isError) {
        return toast.error(message);
      }
  return (
    <div className="bg-[#32353F] min-h-screen w-full px-4 py-3 flex flex-col justify-center items-center">
    <h2 className='text-gray-200 text-2xl font-bold'>{team?.team?.available?"Available ":"Unavailabe"}{team?.team?.domain} team</h2>
    <div className="flex-grow mt-6 overflow-y-auto w-full">

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {team?.team?.users?.map((user) => (
            <UserCard user={user} key={user._id} prope={'hidden'}/>
          ))}
        </div>
        </div>
    </div>
  )
}

export default TeamInfo