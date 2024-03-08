import { deleteCarPost } from "../services/postsOperations";

function DelModal(props) {

    const {carPost, setAction}= props;

    const deletePost=(e)=>{
        e.preventDefault();
        deleteCarPost(carPost._id,(res)=>{
            if (res.status === 200) {
                setAction('deleted')
                document.getElementById('deleteClose').click();
            }else{
                console.log('problem');
            }
        })
    } 
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="delModalLabel">Remove car</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="deleteClose"></button>
            </div>
            <div className="modal-body">
                Are you sure you want to remove your car ?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">No</button>
                <button type="button" className="btn btn-danger" onClick={deletePost}>Yes</button>
            </div>
        </div>
    );
}

export default DelModal;