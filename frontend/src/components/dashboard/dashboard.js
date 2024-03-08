import st from "./dashboard.module.css";
import { getUsers } from "../../services/usersOpertaions";
import { useEffect, useState } from "react";
import DeleteUserModal from "../../modals/deleteUserModal/deleteUserModal";
import UserChart from "../charts/userCharts";
import PostsChart from "../charts/postsChart";

function Dashboard(props) {
  const { action, setAction, carPosts } = props;

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();

  const numberOfUsers = users.length;
  const numberOfPosts = carPosts.length;

  const getAllUsers = () => {
    getUsers((cb) => {
      const filteredUsers = cb.data.users.filter(
        (user) => user.role !== "admin"
      );
      setUsers(filteredUsers);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, [action]);

  const openModal = (user) => {
    setAction();
    setUser(user);
  };

  return (
    <div className={`container ${st.dashboardPage}`}>
      <div className="row justify-content center">
        <div className="col-12">
          <div className="row mt-4 mb-3">
            <div className={`col-lg-6`}>
              <UserChart users={users} />
            </div>
            <div className={`col-lg-6`}>
              <PostsChart carPosts={carPosts} />
            </div>
          </div>
          <div className="row">

            <div className="col-lg-6 mb-3">
              <div className={`${st.infocard} card ${st.border} ${st.borderlg} "`} >
                <div className="card-body">
                  <div className="small text-muted">Total Number of users</div>
                  <div className={`h3 ${st.data}`}> {numberOfUsers} </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-3">
              <div className={`${st.infocard} card ${st.border} ${st.borderlg} "`}>
                <div className="card-body">
                  <div className="small text-muted">Total number of posts</div>
                  <div className={`h3 ${st.data}`}> {numberOfPosts} </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row p-2">
            <h3>Manage the accounts</h3>
          </div>
          <div className="row mb-5">
            <div className={`card ${st.infocard}`}>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((user, i) => (
                          <tr key={i}>
                            <td></td>
                              <td>
                                <img
                                  src={user.avatar ? `${process.env.REACT_APP_PHOTOS_DIRECTORY}${user.avatar}`: "./images/avatar.png"}
                                  alt="avatar"
                                  className={st.img}
                                />
                              </td>
                            <td style={{ paddingTop: "15px" }}>{user.name}</td>
                            <td style={{ paddingTop: "15px" }}>{user.email}</td>
                            <td style={{ paddingTop: "15px" }}>{user.phone}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => openModal(user)}
                                data-bs-toggle="modal"
                                data-bs-target="#deleteUserModal"
                              >
                                Suspend
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteUserModal user={user} setAction={setAction} />
    </div>
  );
}

export default Dashboard;
