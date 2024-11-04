import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import SwaggerClient from 'swagger-client';

interface User {
  name: string;
  email: string;
  uuid: string;
}

const UserListComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setErrorMessage(null); 

      try {
        const client = await SwaggerClient({ url: '../../swagger.json' });

        const response = await client.apis.user.get_users_list_all();

        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorMessage('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      
      {loading && <p>Loading users...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {!loading && users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.uuid}>
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      )}

      {!loading && users.length === 0 && !errorMessage && <p>No users found.</p>}
    </div>
  );
};

export default UserListComponent;
