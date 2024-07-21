
import './taskManager.css'
import Task from '../Task/Task'
import AddTask from '../Task/AddTask'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from '../Config/firebase'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

function TaskManager() {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [tasks, setTasks] = useState([])

    /* function to get all tasks from firestore in realtime */
    useEffect(() => {
        const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setTasks(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    // Function to Generate a Report
    const generateReport = () => {
        const ReportDocument = () => (
            <Document>
                <Page>
                    <Text>Tasks Report</Text>
                    {tasks.map((task) => (
                        <Text key={task.id}>
                            Title: {task.data.title}{'\n'}
                            Description: {task.data.description}{'\n'}
                            Completed: {task.data.completed ? 'Yes' : 'No'}{'\n'}
                        </Text>
                    ))}
                </Page>
            </Document>
        );

        return <ReportDocument />;
    };

    return (
        <div className='w-full h-full py-[6rem] px-5   bg-light-yellow'>
            <div className='taskManager__container pb-9'>
                <button onClick={() => setOpenAddModal(true)}>Add task +</button>
                <div className='taskManager__tasks pt-20'>
                    {tasks.map((task) => (
                        <Task
                            id={task.id}
                            key={task.id}
                            completed={task.data.completed}
                            title={task.data.title}
                            description={task.data.description}
                        />
                    ))}
                </div>
            </div>
            {openAddModal &&
                <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
            }

            <PDFDownloadLink
                document={generateReport()}
                fileName="TasksReport.pdf"
                className="btn  bg-dark-blue hover:bg-blue-700 text-white font-bold"
            >
                {({ loading }) =>
                    loading ? 'Generating report...' : 'Download Report'
                }
            </PDFDownloadLink>
        </div>
    )
}

export default TaskManager;
