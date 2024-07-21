import Task from '../Project/Project';
import AddTask from '../Project/AddProject';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../Config/firebase';
import { Link } from 'react-router-dom'; // Import Link component
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'; 
import { auth } from '../Config/firebase'// Import PDFDownloadLink and related components

function ProjectPage() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [tasks, setTasks] = useState([]);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    /* function to get all tasks from firestore in realtime */
    useEffect(() => {
        const q = query(collection(db, 'projects'), orderBy('created', 'desc'));
        onSnapshot(q, (querySnapshot) => {
            setTasks(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        });
    }, []);

    // Function to Generate a Report
    // Function to Generate a Report
const generateReport = () => {
    const ReportDocument = () => (
        <Document>
            <Page>
                <Text>Projects Report</Text>
                {tasks.map((task) => (
                    <Text key={task.id}>
                        Title: {task.data.title}{'\n'}
                        Start Date: {task.data.startDate}{'\n'}
                        End Date: {task.data.endDate}{'\n'}
                        Location: {task.data.location}{'\n'}
                        Budget: {task.data.budget}{'\n'}
                        Employees: {task.data.employees}{'\n'}
                        Completed: {task.data.completed ? 'Yes' : 'No'}{'\n'}
                    </Text>
                ))}
            </Page>
        </Document>
    );

    return <ReportDocument />;
};


    return (
        <div className='w-full h-full py-[6rem] px-5 flex flex-col bg-light-yellow'>
            {user ? (
                <>
                    <div className='text-center text-[1.5rem] font-xl font-open uppercase p-5 text-dark-blue flex justify-between w-full'>
                        <header className='text-[2rem] font-xl'>Projects</header>
                        <button className='btn bg-dark-blue text-white' onClick={() => setOpenAddModal(true)}>
                            Add Project +
                        </button>
                    </div>

                    <div className='taskManager__container p-5'>
                        <div className='flex w-full h-full flex-wrap gap-5 pb-10'>
                            {tasks.map((task) => (
                                <Task
                                    id={task.id}
                                    key={task.id}
                                    completed={task.data.completed}
                                    title={task.data.title}
                                    location={task.data.location}
                                    startDate={task.data.startDate}
                                    endDate={task.data.endDate}
                                    budget={task.data.budget}
                                    employees={task.data.employees}
                                />
                            ))}
                        </div>
                    </div>
                    <PDFDownloadLink
                        document={generateReport()}
                        fileName="ProjectsReport.pdf"
                        className="btn bg-dark-blue hover:bg-blue-700 text-white font-bold"
                    >
                        {({ loading }) =>
                            loading ? 'Generating report...' : 'Download Project Report'
                        }
                    </PDFDownloadLink>
                </>
            ) : (
                <div className='w-screen h-screen absolute flex items-center justify-center top-0 left-0 right-0 bottom-0'>
                    <h1 className='h2'>You must <Link to="/login" className='text-[red] underline'>log in</Link> to access this content.</h1>
                </div>
            )}

            {openAddModal &&
                <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
            }
        </div>
    );
}

export default ProjectPage;
