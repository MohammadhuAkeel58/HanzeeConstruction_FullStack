import React, { useState } from 'react';
import { db } from '../Config/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import ProjectList from './ProjectList';
import EditProject from './EditProject'
import { RiBuildingLine } from "react-icons/ri";
import MakeSure from '../Components/MakeSure';

function Project({ id, title, location, startDate, endDate, budget, employees,completed }) {
    
    const [open, setOpen] = useState({ edit: false, view: false })
    const [popup, setPopup] = useState(null);
  

    const handleClose = () => {
        setOpen({ edit: false, view: false });
    }

    /* function to update document in firestore */
    const handleUpdate = async () => {
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
        } catch (err) {
            alert(err);
        }
    }

    /* function to delete a document from firestore */
    const handleDelete = async () => {
        const projectDocRef = doc(db, 'projects', id);
        try {
            await deleteDoc(projectDocRef);
        } catch (err) {
            alert(err);
        }
    }
    const handlePopup = () =>
    {
        setPopup(!popup)
    }

    return (
        <div className='rounded shadow-md  border-[10px] flex w-[15rem] h-[18rem] pt-12'>
            <div className='flex w-full h-full flex-wrap'>
                <div className='w-full h-full flex flex-col justify-evenly items-center '>
                    <div>
                        <RiBuildingLine className='text-[6rem] text-dark-blue' />
                    </div>
                    <div>
                        <p className="text-[1.2rem] font-xl capitalize">Name : {title}</p>
                        <p className="text-[1.2rem] font-xl capitalize">Location: {location}</p>
                    </div>
                    <div className='flex w-full justify-evenly'>
                        <button onClick={() => setOpen({ ...open, view: true })} className='btn-1'>View</button>
                        <button onClick={() => setOpen({ ...open, edit: true })} className='btn-1 bg-light-gray'>Edit</button>
                        <button onClick={handleDelete} className='btn-1 bg-yellow text-black'>Delete</button>
                    </div>
                </div>
            </div>
            {
                open.view &&
                <ProjectList
                    onClose={handleClose}
                    title={title}
                    location={location}
                    startDate={startDate}
                    endDate={endDate}
                    budget={budget}
                    employees={employees}
                    open={open.view}
                />
            }
              {
                open.edit &&
                <EditProject
                    onClose={handleClose}
                    toEditTitle={title}
                    toEditLocation={location}
                    open={open.edit}
                    id={id}
                    toEditStartDate={startDate}
                    toEditEndDate={endDate}
                    toEditBudget={budget}
                    toEditEmployees={employees}
                />
            }

            {/* </div > */}
            {popup && <MakeSure handleDelete={handleDelete} handlePopup={handlePopup} />}
        </div>
    );
}

export default Project;
