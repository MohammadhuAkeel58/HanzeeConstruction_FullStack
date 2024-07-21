import { db } from '../Config/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import Modal from "./Modal"
import { useState } from 'react'

function AddEmployee({ onClose, open }) {
  const [ename, setEname] = useState('')
  const [email, setEmail] = useState('')
  const [eaddress, setAddress] = useState('');
  const [eid, setId] = useState('');
  const [emobile, setMobile] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ename || !email || !eaddress || !eid || !emobile) {
      setError('All fields are required!');
      return;
    }

    try {
      setError(null);
      await addDoc(collection(db, 'employee'), {
        ename: ename,
        email: email,
        eaddress: eaddress,
        eid: eid,
        emobile: emobile,
        completed: false,
        created: Timestamp.now()
      });
      onClose();
      alert('Employee added successfully!');
    } catch (err) {
      setError('Error adding employee. Please try again later.');
    }
  }

  return (
    <div className='w-full h-full pt-[10rem] px-5 fixed z-[1000] top-0 left-0 right-0 bottom-0  backdrop-blur-md py-5 flex items-center justify-center '>
      <Modal modalLable='Add Employee' onClose={onClose} open={open}>
        <form name='addTask' onSubmit={handleSubmit} className="form ">
          <input
            type='text'
            name='ename'
            onChange={(e) => setEname(e.target.value)}
            value={ename}
            placeholder='Enter Name'
            className='input' />
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            value={email}
            className='input' />

          <input
            type="text"
            name="eaddress"
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Enter Address'
            value={eaddress}
            className='input' />

          <input
            type="text"
            name="eid"
            onChange={(e) => setId(e.target.value)}
            placeholder='Enter Employee ID'
            value={eid}
            className='input' />


          <input
            type="number"
            name="emobile"
            onChange={(e) => setMobile(e.target.value)}
            placeholder='Enter Mobile no'
            value={emobile}
            className='input' />

          {error && <p className="text-red-500">{error}</p>}

          <div className='flex items-center justify-center gap-6'>
            <button className='btn' onClick={onClose} type="reset">Cancel</button>
            <button type='submit' className='btn'>Done</button>
          </div>

        </form>
      </Modal>
    </div >
  )
}

export default AddEmployee
