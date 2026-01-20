import React from 'react';

const UserManagementTable = ({ users }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover mb-0">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <span className={`badge ${user.role === 'admin' ? 'bg-danger' : user.role === 'manager' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                                    {user.role.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-link text-decoration-none">Edit</button>
                                <button className="btn btn-sm btn-link text-danger text-decoration-none">Block</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementTable;
