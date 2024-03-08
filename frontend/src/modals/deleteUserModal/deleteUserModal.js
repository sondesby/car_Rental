import { deleteUserById} from "../../services/usersOpertaions";

function DeleteUserModal(props) {
  const {user, setAction} = props;

  const deleteUser = (e) => {
    e.preventDefault();
    deleteUserById(user._id, (res) => {
      if (res.status === 200) {
       setAction("deleted");
       document.getElementById('deleteClose').click();
      } else {
        console.error(res);
      }
    });
  };
  return (
    <div
      className="modal fade"
      id="deleteUserModal"
      tabIndex="-1"
      aria-labelledby="delModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="delModalLabel">
              Suspend User
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="deleteClose"
            ></button>
          </div>
          {user? (
            <div className="modal-body">
            Are you sure you want to permanently suspend <b>{user.name}</b>'s account ?
          </div>
          ): ""}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteUser}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;
