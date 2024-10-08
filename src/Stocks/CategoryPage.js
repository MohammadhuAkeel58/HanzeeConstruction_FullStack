import React, { useState, useEffect } from "react";
import { db } from "../Config/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
function CategoryPage({
  handleView,
  setStocksPayment,
  selectedItemsStock,
  setSelectedItemsStock,
  totalPriceStock,
  setTotalPriceStock,
}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "stocks"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  // const [selectedItemsStock, setSelectedItemsStock] = useState([]);
  // const [totalPriceStock, setTotalPriceStock] = useState(0);

  // Function to handle adding a product
  const handleAddProduct = (item) => {
    const updatedItems = [...selectedItemsStock, item];
    setSelectedItemsStock(updatedItems);
    calculateTotalPriceStock(updatedItems);
  };

  // Function to handle removing a product
  const handleRemoveProduct = (item) => {
    const updatedItems = selectedItemsStock.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
    setSelectedItemsStock(updatedItems);
    calculateTotalPriceStock(updatedItems);
  };

  // Function to calculate the total price
  const calculateTotalPriceStock = (items) => {
    const totalPriceStock = items.reduce(
      (total, item) => total + Number(item.data.price),
      0
    );
    setTotalPriceStock(totalPriceStock);
    setStocksPayment(totalPriceStock);
    // const totalPriceStock = items.reduce((total, item) => total  item.data.price, total);

    // setTotalPriceStock(totalPriceStock);
  };

  // Functionto Generate a Report
  const generateReport = () => {
    const ReportDocument = () => (
      <Document>
        <Page>
          <Text>Stocks Report</Text>
          {tasks.map((product) => (
            <Text key={product.id}>
              {"\n"}
              Name: {product.data.name}
              {"\n"}
              Price: ${product.data.price}
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
          Stock Items
          <button className="btn" onClick={handleView}>
            Add/Edit
          </button>
        </h2>

        <div className="w-full h-full flex flex-wrap gap-5">
          {tasks.map((product) => (
            <div
              key={product.id}
              className="w-[15rem] h-[15rem]  border-8 border-light-blue  p-5 rounded shadow flex justify-between flex-col relative"
            >
              <img
                src={product.data.img}
                alt="img"
                className="w-full h-full absolute top-0 left-0 bottom-0 right-0 object-cover z-[50]"
              />
              <div className="flex justify-between z-[100] p-1 bg-light-gray text-white rounded">
                <h3 className="h2 text-[1rem]">{product.data.name}</h3>
                <h2 className="py-3 font-popins font-xl">
                  {product.data.price}$
                </h2>
              </div>

              <button
                onClick={() => handleAddProduct(product)}
                className="btn  px-2 py-1 rounded text-[1rem]   font-lg z-[100]"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {totalPriceStock !== 0 ? (
        <div className=" flex-col bg-white drop-shadow p-5 rounded-xl mt-5  w-auto h-max">
          <h2 className="h2 w-full items-center text-center font-popins max-w-max pb-2">
            Cart
          </h2>
          {selectedItemsStock.length > 0 ? (
            <div className="w-full flex flex-col gap-3">
              {selectedItemsStock.map((item) => (
                <div
                  key={item.id}
                  className=" bg-light-yellow p-3 rounded flex justify-between items-center"
                >
                  <div className="flex items-center gap-10">
                    <h3 className="h2 text-[1rem]">{item.data.name}</h3>
                    <h2 className="py-3 font-popins font-xl">
                      {item.data.price}$
                    </h2>
                  </div>

                  <button
                    onClick={() => handleRemoveProduct(item)}
                    className="btn text-[1rem] py-1 bg-[orange]"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No items in the cart</p>
          )}

          <div className="w-ful flex items-center justify-between">
            <div className="flex gap-3">
              <h2 className="py-3 font-popins font-xl">Total Price: </h2>

              <p className="py-3 font-popins font-xl">${totalPriceStock}</p>
            </div>

            <Link
              to="/payment"
              className="btn m-1 py-1 px-5 flex items-center text-[1rem]"
            >
              Payment
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}

      <PDFDownloadLink
        document={generateReport()}
        fileName="StockReport.pdf"
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
