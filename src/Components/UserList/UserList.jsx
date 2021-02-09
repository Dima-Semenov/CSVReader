import React from 'react';
import { CurrentUser } from '../CurrentUser/CurrentUser';
import '../UserList/userList.scss';

export const UserList = ({ users }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>
              <strong>ID</strong>
            </td>
            <td>Full Name</td>
            <td>Phone</td>
            <td>Email</td>
            <td>Age</td>
            <td>Experience</td>
            <td>Yearly Income</td>
            <td>Has children</td>
            <td>License states</td>
            <td>Expiration date</td>
            <td>License</td>
            <td>Duplicate with</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <CurrentUser key={user.id} {...user} />
          ))}
        </tbody>
      </table>
    </>
  );
};