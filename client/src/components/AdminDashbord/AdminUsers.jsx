import React from "react";

const AdminUsers = () => {
  return (
    <section className="adminUser">
      <div className="wrapper">
        <div className="secHeading">
          <h2>Admin User Data</h2>
        </div>
        <div className="userTable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              
                  <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>
                      <button>Edit</button>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
               
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminUsers;
