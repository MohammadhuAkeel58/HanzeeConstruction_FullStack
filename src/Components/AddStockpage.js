import Task from '../Stocks/Stocks'
import AddTask from '../Stocks/AddStocks'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from '../Config/firebase'

function AddStockpage({ handleView })
{
    const [openAddModal, setOpenAddModal] = useState(false)
    const [tasks, setTasks] = useState([])

    /* function to get all tasks from firestore in realtime */
    useEffect(() =>
    {
        const q = query(collection(db, 'stocks'), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) =>
        {
            setTasks(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    return (
        <div className='w-full h-full pb-[8rem] pt-5 px-5'>
            <button className=' underline  text-dark-blue ' onClick={handleView}>Back View List</button>
            <div className='text-center text-[1.5rem] font-xl font-open uppercase p-5 text-dark-blue flex justify-between w-full'>
                <header className='text-[2rem] font-xl'>Stocks </header>
                <button className='btn bg-dark-blue text-white'
                    onClick={() => setOpenAddModal(true)}>
                    Add Stocks +
                </button>
            </div>
            <div className='taskManager__container '>
                <div className='flex w-full h-full flex-wrap gap-5'>
                    {tasks.map((task) => (
                        <Task
                            id={task.id}
                            key={task.id}
                            completed={task.data.completed}
                            price={task.data.price}
                            name={task.data.name}
                            img={task.data.img}
                        />
                    ))}
                </div>
            </div>
            {
                openAddModal &&
                <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
            }
        </div >
    )
}

export default AddStockpage;
