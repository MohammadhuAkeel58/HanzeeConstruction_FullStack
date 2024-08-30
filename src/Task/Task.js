import { useState } from "react";
import TaskItem from "../Task/TaskItem";
import EditTask from "../Task/EditTask";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import MakeSure from "../Components/MakeSure";

function Task({ id, title, description, completed }) {
  const [open, setOpen] = useState({ edit: false, view: false });
  const [popup, setPopup] = useState(null);

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  const handleDelete = async () => {
    const taskDocRef = doc(db, "tasks", id);
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
    <div className="rounded shadow-md border-[10px] flex w-[15rem] h-[18rem] pt-12">
      <div className="flex w-full h-full flex-wrap">
        <div className="w-full h-full flex flex-col justify-evenly items-center">
          <div>
            <p className="text-[1.2rem] font-xl capitalize">Title: {title}</p>
            <p className="text-[1.2rem] font-xl capitalize">
              Description: {description}
            </p>
          </div>
          <div className="flex w-full justify-evenly">
            <button
              className="btn-1"
              onClick={() => setOpen({ ...open, view: true })}
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
        <TaskItem
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
      )}
      {open.edit && (
        <EditTask
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id}
        />
      )}
      {popup && (
        <MakeSure handleDelete={handleDelete} handlePopup={handlePopup} />
      )}
    </div>
  );
}

export default Task;
