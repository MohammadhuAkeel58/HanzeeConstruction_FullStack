// Import necessary components and libraries
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../Config/firebase';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import { auth } from '../Config/firebase';
import Task from '../Customer/Customer';
import AddTask from '../Customer/AddCustomer';
import ContactUs from '../Customer/Email';

function CustomerPage() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);

    // Fetch tasks from Firestore on component mount
    useEffect(() => {
        const q = query(collection(db, 'customer'), orderBy('created', 'desc'));
        onSnapshot(q, (querySnapshot) => {
            setTasks(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        });
    }, []);

    // Check user authentication status
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // Function to generate the PDF report
    const generateReport = () => {
        const ReportDocument = () => (
            <Document>
                <Page>
                    <Text>Customers Report</Text>
                    {tasks.map((task) => (
                        <Text key={task.id}>
                            ID: {task.id}{'\n'}
                            Title: {task.data.title}{'\n'}
                            Description: {task.data.description}{'\n'}
                            Customer Email: {task.data.cusEmail}{'\n'}
                            Customer No: {task.data.cusNo}{'\n'}
                            Customer ID: {task.data.cusID}{'\n'}
                            Completed: {task.data.completed ? 'Yes' : 'No'}
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
                        <header className='text-[2rem] font-xl'>Customer</header>
                        <button className='btn bg-dark-blue text-white' onClick={() => setOpenAddModal(true)}>
                            Add Customer +
                        </button>
                    </div>
                    <div className='taskManager__container p-5 '>
                        <div className='flex w-full h-full flex-wrap gap-5 pb-10'>
                            {tasks.map((task) => (
                                <Task
                                    id={task.id}
                                    key={task.id}
                                    completed={task.data.completed}
                                    title={task.data.title}
                                    description={task.data.description}
                                    cusEmail={task.data.cusEmail}
                                    cusNo={task.data.cusNo}
                                    cusID={task.data.cusID}
                                />
                            ))}
                        </div>
                        <PDFDownloadLink
                            document={generateReport()}
                            fileName="CustomerReport.pdf"
                            className="btn bg-dark-blue hover:bg-blue-700 text-white font-bold"
                        >
                            {({ loading }) =>
                                loading ? 'Generating report...' : 'Download Customer Report'
                            }
                        </PDFDownloadLink>
                    </div>
                    <div className="mt-5">
                        <ContactUs />
                    </div>
                </>
            ) : (
                <div className='w-screen h-screen absolute flex items-center justify-center top-0 left-0 right-0 bottom-0'>
                    <h1 className='h2'>
                        You must <Link to='/login' className='text-[red] underline'>
                            log in
                        </Link>{' '}
                        to access this content.
                    </h1>
                </div>
            )}
            {openAddModal && <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />}
        </div>
    );
}

export default CustomerPage;
