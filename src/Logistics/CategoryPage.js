import React, { useState, useEffect } from "react";
import { db } from "../Config/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";

function CategoryPage({
  handleView,
  setLogisticPayment,
  selectedItemsLogistic,
  setSelectedItemsLogistic,
  totalPriceLogistic,
  setTotalPriceLogistic,
}) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "Logistics"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // const [selectedItemsLogistic, setSelectedItemsLogistic] = useState([]);
  // const [totalPriceLogistic, setTotalPriceLogistic] = useState(0);

  // Function to handle adding a product
  const handleAddProduct = (item) => {
    const updatedItems = [...selectedItemsLogistic, item];
    setSelectedItemsLogistic(updatedItems);
    calculateTotalPriceLogistic(updatedItems);
  };

  // Function to handle removing a product
  const handleRemoveProduct = (item) => {
    const updatedItems = selectedItemsLogistic.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
    setSelectedItemsLogistic(updatedItems);
    calculateTotalPriceLogistic(updatedItems);
  };

  // Function to calculate the total price
  const calculateTotalPriceLogistic = (items) => {
    const totalPriceLogistic = items.reduce(
      (total, item) => total + Number(item.data.price),
      0
    );
    setTotalPriceLogistic(totalPriceLogistic);
    setLogisticPayment(totalPriceLogistic);
  };

  // Functionto Generate a Report
  const generateReport = () => {
    const ReportDocument = () => (
      <Document>
        <Page>
          <Text>Logistic Report </Text>
          {tasks.map((product) => (
            <Text key={product.id}>
              {"\n"}
              Name: {product.data.vtype}
              {"\n"}
              Price: ${product.data.price}
              {"\n"}
              Vehicle Number: {product.data.vno}
              {"\n"}
            </Text>
          ))}
        </Page>
      </Document>
    );

    return <ReportDocument />;
  };

  return (
    <div className="w-full h-full  px-5 flex gap-5 flex-col ">
      <div className="w-full h-full">
        <h2 className="h2 py-5  w-full justify-between flex items-center ">
          Logistics
          <button className="btn" onClick={handleView}>
            Add/Edit
          </button>
        </h2>

        <div className="w-full h-full flex flex-wrap gap-5">
          {tasks.map((product) => (
            <div
              key={product.id}
              className="w-[15rem] h-[15rem]  border-8 border-light-blue p-5 rounded shadow flex justify-between flex-col relative"
            >
              <img
                src={product.data.vImg}
                alt="img"
                className="w-full h-full absolute top-0 left-0 bottom-0 right-0 object-cover z-[50]"
              />
              <div className="flex justify-between z-[100] p-2 bg-light-gray text-white rounded flex-col w-full gap-2 ">
                <h1 className=" font-open font-lg">{product.data.vid}</h1>
                <p className="font-popins text-[1.2rem]">
                  {product.data.vtype}
                </p>
                <p className="font-popins text-[1.2rem]">
                  ${product.data.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PDFDownloadLink
        document={generateReport()}
        fileName="LogisticReport.pdf"
        className="btn bg-dark-blue hover:bg-blue-700 text-white font-bold"
      >
        {({ loading }) =>
          loading ? "Generating report..." : "Download Report"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default CategoryPage;
