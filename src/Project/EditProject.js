import React, { useState } from 'react';
import { db } from '../Config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import Modal from "./Modal";

function EditProject({ open, onClose, toEditTitle, toEditLocation, toEditStartDate, toEditEndDate, toEditBudget, toEditEmployees, id }) {
    const [title, setTitle] = useState(toEditTitle);
    const [location, setLocation] = useState(toEditLocation);
    const [startDate, setStartDate] = useState(toEditStartDate);
    const [endDate, setEndDate] = useState(toEditEndDate);
    const [budget, setBudget] = useState(toEditBudget);
    const [employees, setEmployees] = useState(toEditEmployees);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const projectDocRef = doc(db, 'projects', id);
        try {
            await updateDoc(projectDocRef, {
                title: title,
                location: location,
                startDate: startDate,
                endDate: endDate,
                budget: budget,
                employees: employees
            });
            onClose();
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className='w-full h-full pt-[10rem] px-5 fixed z-[1000] top-0 left-0 right-0 bottom-0  backdrop-blur-md py-5 flex justify-center '>
            <Modal modalLable='Project' onClose={onClose} open={open}>
                <form className='form' name='updateProject' onSubmit={handleUpdate}>
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} className='input' />
                    <input type="text" name="location" onChange={(e) => setLocation(e.target.value)} value={location} className='input' />
                    <input type="date" name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} className='input' />
                    <input type="date" name="endDate" onChange={(e) => setEndDate(e.target.value)} value={endDate} className='input' />
                    <input type="number" name="budget" onChange={(e) => setBudget(e.target.value)} value={budget} className='input' />
                    <input type="number" name="employees" onChange={(e) => setEmployees(e.target.value)} value={employees} className='input' />
                    <div className='flex items-center justify-center gap-6'>
                        <button className='btn' type="reset" onClick={onClose}>Cancel</button>
                        <button type='submit' className='btn'>Done</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default EditProject;
