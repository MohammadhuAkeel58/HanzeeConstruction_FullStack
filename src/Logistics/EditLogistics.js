import Modal from "./Modal";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function EditLogistics({
  open,
  onClose,
  id,
  toEditvno,
  toEditvid,
  toEditvtype,
  toEditvImg,
  toEditPrice,
}) {
  const [vno, setVno] = useState(toEditvno);
  const [vid, setVid] = useState(toEditvid);
  const [vtype, setVtype] = useState(toEditvtype);
  const [vImgFile, setVImgFile] = useState(null);
  const [price, setPrice] = useState(toEditPrice);

  /* function to handle file upload */
  const handleFileUpload = (e) => {
    // Update the state with the selected file when the input changes
    setVImgFile(e.target.files[0]);
  };

  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();

    const taskDocRef = doc(db, "Logistics", id);

    try {
      let imageUrl = toEditvImg; // Use the current image URL as default
      if (vImgFile) {
        // If a new file is selected, upload it to Firebase Storage and get the download URL
        const imageref = ref(getStorage(), `files/${v4()}`);
        await uploadBytes(imageref, vImgFile);
        imageUrl = await getDownloadURL(imageref);
      }

      // Update the document in Firestore with the new image URL
      await updateDoc(taskDocRef, {
        vno: vno,
        vid: vid,
        vImg: imageUrl,
        price: price,
        vtype: vtype,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="w-full h-full pt-[7rem] px-5 fixed z-[1000] top-0 left-0 right-0 bottom-0  backdrop-blur-md flex items-center justify-center pb-2">
      <Modal modalLable="Edit Logistics" onClose={onClose} open={open}>
        <form
          className="form  flex items-center w-full"
          name="updateCustomer"
          onSubmit={handleUpdate}
        >
          <div className="flex items-center justify-center flex-col gap-1 w-full">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="Type" className=" font-lg">
                Vehicle ID
              </label>
              <input
                type="text"
                name="vid"
                onChange={(e) => setVid(e.target.value)}
                placeholder="Vehicle ID"
                value={vid}
                className="input "
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="Type" className=" font-lg">
                Vehicle Number
              </label>
              <input
                type="text"
                name="vno"
                onChange={(e) => setVno(e.target.value)}
                value={vno}
                placeholder="Enter Vehicle Number"
                className="input w-full"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="Type" className=" font-lg">
                Vehicle Type
              </label>
              <select
                placeholder="Enter Vehicle Type"
                value={vtype}
                name="vtype"
                onChange={(e) => setVtype(e.target.value)}
                className="input "
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
              <label htmlFor="Type" className=" font-lg">
                Image
              </label>
              <input
                type="file"
                name="vImg"
                onChange={handleFileUpload}
                placeholder="Enter Img of Sample"
                className="input "
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="Type" className=" font-lg">
                Price
              </label>
              <input
                type="number"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter  Price"
                value={price}
                className="input "
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <button className="btn" type="reset" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn">
              Done
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditLogistics;
