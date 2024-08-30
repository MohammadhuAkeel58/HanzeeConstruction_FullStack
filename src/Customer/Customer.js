import { useState } from "react";
import CustomerList from "../Customer/CustomerList";
import EditCustomer from "../Customer/EditCustomer";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { RiUser3Fill } from "react-icons/ri";
import MakeSure from "../Components/MakeSure";
function Customer({
  id,
  title,
  description,
  completed,
  cusID,
  cusNo,
  cusEmail,
}) {
  const [open, setOpen] = useState({ edit: false, view: false });
  const [popup, setPopup] = useState(null);
  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, "customer", id);
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
    <div className=" rounded  shadow-md border-[10px] flex w-[15rem] h-[18rem] pt-12 ">
      <div className="flex w-full h-full flex-wrap ">
        <div className="w-full h-full flex flex-col justify-evenly items-center">
          <div>
            <RiUser3Fill className="text-[6rem] text-stone" />
          </div>

          <div>
            <p className="text-[1.2rem] font-xl capitalize">Name : {title}</p>
            <p className="text-[1.2rem] font-xl capitalize">
              Description: {description}
            </p>
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
        <CustomerList
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
          cusID={cusID}
          cusNo={cusNo}
          cusEmail={cusEmail}
        />
      )}

      {open.edit && (
        <EditCustomer
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id}
          toEditcusID={cusID}
          toEditcusNo={cusNo}
          toEditcusEmail={cusEmail}
        />
      )}

      {/* </div > */}
      {popup && (
        <MakeSure handleDelete={handleDelete} handlePopup={handlePopup} />
      )}
    </div>
  );
}

export default Customer;
