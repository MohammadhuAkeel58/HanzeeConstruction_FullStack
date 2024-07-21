import React, { useState } from "react";
import { db } from "../Config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Modal from "./Modal";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function AddLogistics({ onClose, open }) {
  const [vno, setVno] = useState("");
  const [vid, setVid] = useState("");
  const [vtype, setVtype] = useState("");
  const [vImgFile, setVImgFile] = useState(null);
  const [price, setPrice] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleFileUpload = (e) => {
    setVImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vImgFile) {
      console.error("No file selected.");
      return;
    }

    const imageref = ref(getStorage(), `files/${v4()}`);

    try {
      await uploadBytes(imageref, vImgFile);
      const imageUrl = await getDownloadURL(imageref);

      await addDoc(collection(db, "Logistics"), {
        vno: vno,
        vid: vid,
        vtype: vtype,
        vImg: imageUrl,
        price: price,
        completed: false,
        created: Timestamp.now(),
      });

      setVno("");
      setVid("");
      setVtype("");
      setVImgFile(null);
      setPrice("");

      setShowMessage(true);

      onClose();
    } catch (err) {
      alert(err);
    }
  };

  const handleCancel = () => {
    setVno("");
    setVid("");
    setVtype("");
    setVImgFile(null);
    setPrice("");
    onClose();
  };

  return (
    <div className="w-full h-full pt-[10rem] px-5 fixed z-[1000] top-0 left-0 right-0 bottom-0 backdrop-blur-md py-5 flex items-center justify-center">
      <Modal modalLable="Add Logistics" onClose={onClose} open={open}>
        <form name="addTask" onSubmit={handleSubmit} className="form flex items-center w-full">
          <div className="flex items-center justify-center flex-col gap-1 w-full">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="Type" className="font-lg">
                Vehicle ID
              </label>
              <input
                type="text"
                name="vid"
                onChange={(e) => setVid(e.target.value)}
                value={vid}
                placeholder="Enter Vehicle ID"
                className="input"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="Type" className="font-lg">
                Vehicle Number
              </label>
              <input
                type="text"
                name="vno"
                onChange={(e) => setVno(e.target.value)}
                value={vno}
                placeholder="Enter Vehicle Number"
                className="input w-full"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="Type" className=" font-lg">
                Vehicle Type
              </label>
              <select
                id="vtype"
                placeholder="Enter Construction Supplies"
                value={vtype}
                name="gender"
                onChange={(e) => setVtype(e.target.value)}
                className="input "
                required
              >
                <option value="Dump Truck">Dump Truck</option>
                <option value="Backhoe">Backhoe</option>
                <option value="Grader">Grader</option>
                <option value="Excavator">Excavator</option>
                <option value="Loader">Loader</option>
                <option value="Crane">Crane</option>
                <option value="Truck">Truck</option>
                <option value="Tractor">Tractor</option>
                <option value="truck and trailer">truck and trailer</option>
                <option value="Skid steer loader">Skid steer loader</option>
                <option value="Flatbed Truck">Flatbed Truck</option>
                <option value="Bulldozers">Bulldozers</option>
                <option value="Boom Lift">Boom Lift</option>
              </select>
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="Type" className="font-lg">
                Image
              </label>
              <input
                type="file"
                name="vImg"
                onChange={handleFileUpload}
                className="input"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="Type" className="font-lg">
                Vehicle Price
              </label>
              <input
                type="text"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Vehicle Price"
                value={price}
                className="input"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-6">
            <button className="btn" onClick={handleCancel} type="button">
              Cancel
            </button>
            <button type="submit" className="btn">
              Done
            </button>
          </div>
        </form>

        {showMessage && (
          <div className="popup-message">
            Logistics added successfully!
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AddLogistics;
