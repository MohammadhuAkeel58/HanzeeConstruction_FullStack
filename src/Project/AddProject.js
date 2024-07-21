import React, { useState } from 'react';
import { db } from '../Config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Modal from "./Modal";

function AddProject({ onClose, open }) {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const [employees, setEmployees] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !location || !startDate || !endDate || !budget || !employees) {
            setError('All fields are required!');
            return;
        }

        try {
            setError(null);
            await addDoc(collection(db, 'projects'), {
                title: title,
                location: location,
                startDate: startDate,
                endDate: endDate,
                budget: budget,
                employees: employees,
                created: Timestamp.now()
            });
            onClose();
            alert('Project added successfully!');
        } catch (err) {
            setError('Error adding project. Please try again later.');
        }
    };

    return (
        <div className='w-full h-full pt-[10rem] px-5 fixed z-[1000] top-0 left-0 right-0 bottom-0  backdrop-blur-md py-5 flex items-center justify-center '>
            <Modal modalLable='Add Project' onClose={onClose} open={open}>
                <form name='addProject' onSubmit={handleSubmit} className="form ">
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Project Name" className='input' />
                    <input type="text" name="location" onChange={(e) => setLocation(e.target.value)} value={location} placeholder="Project Location" className='input' />
                    <input type="date" name="startDate" onChange={(e) => setStartDate(e.target.value)} value={startDate} className='input' />
                    <input type="date" name="endDate" onChange={(e) => setEndDate(e.target.value)} value={endDate} className='input' />
                    <input type="number" name="budget" onChange={(e) => setBudget(e.target.value)} value={budget} placeholder="Budget" className='input' />
                    <input type="number" name="employees" onChange={(e) => setEmployees(e.target.value)} value={employees} placeholder="Assigned Employees" className='input' />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='flex items-center justify-center gap-6'>
                        <button className='btn' onClick={onClose} type="reset">Cancel</button>
                        <button type='submit' className='btn'>Done</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AddProject;
