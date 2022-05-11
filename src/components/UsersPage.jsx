import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/usersService'
import { NavLink } from 'react-router-dom';

function UsersPage () {

    const [users, setUsers] = useState([])
    const tableCols = ['User', 'Roles']

    useEffect(() => {
        const fetchUsers = async () => {
            const { data: usersData } = await getUsers()
            setUsers(usersData)
        }

        fetchUsers()
    }, [])

    const handleDeleteUser = async (user, index) => {
        try {
            const result = await deleteUser('dev100')
            console.log(result)
            const temp = [...users]
            temp.splice(index, 1)
            setUsers(temp)
        }
        catch (ex) {
            console.log(ex)
        }
    }

    return (
        <div className="content-wrapper">
            <p className="title">Users</p>
            <div className="w-full mt-4">
                <table>
                    <thead>
                        <tr>
                            {tableCols.map(col => 
                                <th className='py-6 px-8 text-xl font-bold' key={col}>{col}</th>
                            )}
                            <th className='text-xl font-bold px-8'>Edit</th>
                            <th className='text-xl font-bold px-8'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) =>
                            <tr key={index}>
                                <td className='px-6 text-lg'>{user.user}</td>
                                <td className='px-6 text-lg'>
                                    {user.roles && user.roles.map(role => 
                                        role    
                                    )}
                                </td>
                                <td className='p-4'>
                                    <div>
                                        <NavLink 
                                            className='px-4 py-1 rounded-md font-semibold text-white bg-gray-400 hover:bg-gray-800' 
                                            state={{ user }} 
                                            to={`/users/edit`}>
                                                Edit
                                        </NavLink>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <button onClick={() => handleDeleteUser(user, index)} className='button text-white bg-red-500 rounded-full hover:bg-red-800'>X</button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default UsersPage