import { useState } from "react";
import EmployeeList from "../Employee/EmployeeList";
import EditEmployee from "../Employee/EditEmployee";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { RiUser3Fill } from "react-icons/ri";
import MakeSure from "../Components/MakeSure";
function Employee({ id, ename, email, completed, eaddress, eid, emobile }) {
  const [open, setOpen] = useState({ edit: false, view: false });
  const [popup, setPopup] = useState(null);

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update document in firestore */

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, "employee", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  const handlePopup = () => {
    setPopup(!popup);
  };

  return (
    <div className=" rounded  shadow-md  border-[10px] flex w-[15rem] h-[18rem] pt-12">
      <div className="flex w-full h-full flex-wrap ">
        <div className="w-full h-full flex flex-col justify-evenly items-center">
          <div>
            <RiUser3Fill className="text-[6rem] text-dark-blue" />
          </div>
          <div>
            <p className="text-[1.2rem] font-xl capitalize">Name : {ename}</p>
            <p className="text-[1.2rem] font-xl capitalize">Id: {eid}</p>
          </div>

          <div className="flex w-full justify-evenly">
            <button
              onClick={() => setOpen({ ...open, view: true })}
              className="btn-1"
            >
              View
            </button>
            <button
              className="btn-1 bg-light-gray"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button
              className="btn-1 bg-yellow text-black"
              onClick={handlePopup}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {open.view && (
        <EmployeeList
          onClose={handleClose}
          ename={ename}
          email={email}
          open={open.view}
          eaddress={eaddress}
          eid={eid}
          emobile={emobile}
        />
      )}

      {open.edit && (
        <EditEmployee
          onClose={handleClose}
          toEditname={ename}
          toEditemail={email}
          toEditaddress={eaddress}
          toEditeEid={eid}
          toEditemobile={emobile}
          open={open.edit}
          id={id}
        />
      )}

      {/* </div > */}
      {popup && (
        <MakeSure handleDelete={handleDelete} handlePopup={handlePopup} />
      )}
    </div>
  );
}

export default Employee;
