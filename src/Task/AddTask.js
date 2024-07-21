import { db } from '../Config/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import Modal from "./Modal"
import { useState } from 'react'
import './addTask.css'

function AddTask({ onClose, open }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !description) {
            setError('All fields are required!')
            return
        }

        try {
            setError(null)
            await addDoc(collection(db, 'tasks'), {
                title: title,
                description: description,
                completed: false,
                created: Timestamp.now()
            })
            onClose()
            alert('Task added successfully!')
        } catch (err) {
            setError('Error adding task. Please try again later.')
        }
    }

    return (
        <div className='w-full h-full py-[6rem] px-5'>
            <Modal modalLable='Add Task' onClose={onClose} open={open}>
                <form className='addTask' name='addTask' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='title'
                        onChange={(e) => setTitle(e.target.value.toUpperCase())}
                        value={title}
                        placeholder='Enter title' />
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Enter task description'
                        value={description}></textarea>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type='submit'>Done</button>
                </form>
            </Modal>
        </div>
    )
}

export default AddTask
