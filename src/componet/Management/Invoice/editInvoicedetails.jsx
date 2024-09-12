
// import "../../../style/managment/invoice/AddProformaInvoice.css";
// import React, { useState, useEffect } from 'react';
// import BackIcon from "../../../utils/BackIcon";
// import { useParams } from 'react-router-dom';
// import { makeApi } from "../../../api/callApi.tsx";
// import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';


// const EditInvoiceDetails = () => {
//     const { id } = useParams();
//     const [invoiceDetails, setInvoiceDetails] = useState({
//         clientName: '',
//         address: '',
//         contact: '',
//         gst: '',
//         stateCode: '',
//         invoice_status: '',

//     });
//     const [products, setProducts] = useState([]);
//     const [alert, setAlert] = useState('');
//     const [loading, setLoading] = useState(false);


//     useEffect(() => {
//         const fetchInvoiceData = async () => {
//             try {
//                 setLoading(true);

//                 const response = await makeApi(`/v1/admin/api/get-my-bill/${id}`, "GET");
//                 const bill = response.data.mybill;
//                 const products = response.data.mybillwithproduct.map(product => ({
//                     id: product._id,
//                     productName: product.product,
//                     hsn: product.hsn,
//                     qty: product.qty,
//                     rate: product.rate,
//                     taxableAmount: product.taxable,
//                     cgstRate: product.cgst_Rate,
//                     cgstAmount: product.cgst_Amount,
//                     sgstRate: product.sgst_Rate,
//                     sgstAmount: product.sgst_Amount,
//                     igstRate: product.igst_Rate,
//                     igstAmount: product.igst_Amount
//                 }));
//                 console.log("Products:", products);
//                 setInvoiceDetails({
//                     clientName: bill.client_name,
//                     address: bill.address,
//                     contact: bill.contact_no,
//                     gst: bill.gst,
//                     stateCode: bill.state_code,
//                     invoice_status: bill.invoice_status
//                 });
//                 setProducts(products.length ? products : [{
//                     productName: '',
//                     hsn: '',
//                     qty: '',
//                     rate: '',
//                     taxableAmount: '',
//                     cgstRate: '',
//                     cgstAmount: '',
//                     sgstRate: '',
//                     sgstAmount: '',
//                     igstRate: '',
//                     igstAmount: ''
//                 }]);
//             } catch (error) {
//                 console.error("Error fetching invoice data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInvoiceData();
//     }, [id]);



//     useEffect(() => {
//         console.log('Updated Products:', products);
//     }, [products]);

//     const handleInputChange = (field, value) => {
//         setInvoiceDetails({
//             ...invoiceDetails,
//             [field]: value
//         });
//     };

//     const handleProductChange = (index, field, value) => {
//         const newProducts = [...products];
//         newProducts[index][field] = value;
//         setProducts(newProducts);
//     };

//     const addMoreProducts = () => {
//         setProducts([
//             ...products,
//             {
//                 productName: '',
//                 hsn: '',
//                 qty: '',
//                 rate: '',
//                 taxableAmount: '',
//                 cgstRate: '',
//                 cgstAmount: '',
//                 sgstRate: '',
//                 sgstAmount: '',
//                 igstRate: '',
//                 igstAmount: ''
//             }
//         ]);
//     };

//     const handleSave = async () => {
//         try {
//             setLoading(true);

//             const updatedInvoice = {
//                 client_name: invoiceDetails.clientName,
//                 address: invoiceDetails.address,
//                 gst: invoiceDetails.gst,
//                 contact_no: invoiceDetails.contact,
//                 state_code: invoiceDetails.stateCode,
//                 bill_date: new Date(),
//                 status: 'Performa', 
//                 invoice_status: '',
//             };

//             const invoiceResponse = await makeApi(`/v1/admin/api/update-my-bill/${id}`, "PUT", updatedInvoice);

//             const billItemsData = products.map(product => ({
//                 _id: product.id,
//                 Invoice_no: invoiceResponse.data.mybill.invoice_no,
//                 product: product.productName,
//                 hsn: product.hsn,
//                 qty: product.qty,
//                 rate: product.rate,
//                 taxable: product.taxableAmount,
//                 cgst_Rate: product.cgstRate,
//                 cgst_Amount: product.cgstAmount,
//                 sgst_Rate: product.sgstRate,
//                 sgst_Amount: product.sgstAmount,
//                 igst_Rate: product.igstRate,
//                 igst_Amount: product.igstAmount,
//                 tax_invoice_no: invoiceResponse.data.mybill.tax_invoice_no
//             }));

//             await makeApi(`/v1/admin/api/update-bill-items`, "PUT", billItemsData);

//             setAlert('Invoice saved successfully!');
//         } catch (error) {
//             console.error('Error saving invoice:', error);
//             setAlert('Error saving invoice. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             {loading ? <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div> : (
//                 <>
//                     <div style={{ position: "relative" }}>
//                         <BackIcon path={"management/invoices-management"} />
//                     </div>
//                     <div className="add-proforma-invoice" style={{ padding: "0px 70px" }}>
//                         <h2>Edit Proforma Invoice</h2>
//                         {alert && <div className="alert">{alert}</div>}
//                         <div className="form-group">
//                             <label>Client Name:</label>
//                             <input
//                                 type="text"
//                                 value={invoiceDetails.clientName}
//                                 onChange={(e) => handleInputChange('clientName', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Address:</label>
//                             <input
//                                 type="text"
//                                 value={invoiceDetails.address}
//                                 onChange={(e) => handleInputChange('address', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Contact:</label>
//                             <input
//                                 type="text"
//                                 value={invoiceDetails.contact}
//                                 onChange={(e) => handleInputChange('contact', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>GST:</label>
//                             <input
//                                 type="text"
//                                 value={invoiceDetails.gst}
//                                 onChange={(e) => handleInputChange('gst', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>State Code:</label>
//                             <input
//                                 type="text"
//                                 value={invoiceDetails.stateCode}
//                                 onChange={(e) => handleInputChange('stateCode', e.target.value)}
//                             />
//                         </div>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Name Of Product/Service</th>
//                                     <th>HSN ACS</th>
//                                     <th>Qty</th>
//                                     <th>Rate</th>
//                                     <th>Taxable Amount</th>
//                                     <th>CGST Rate</th>
//                                     <th>CGST Amount</th>
//                                     <th>SGST Rate</th>
//                                     <th>SGST Amount</th>
//                                     <th>IGST Rate</th>
//                                     <th>IGST Amount</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {products.map((product, index) => (
//                                     <tr key={index}>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.productName}
//                                                 onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.hsn}
//                                                 onChange={(e) => handleProductChange(index, 'hsn', e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.qty}
//                                                 onChange={(e) => handleProductChange(index, 'qty', e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.rate}
//                                                 onChange={(e) => handleProductChange(index, 'rate', e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.taxableAmount}
//                                                 onChange={(e) => handleProductChange(index, 'taxableAmount', e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.cgstRate}
//                                                 onChange={(e) => handleProductChange(index, 'cgstRate', e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.cgstAmount}
//                                                 onChange={(e) => handleProductChange(index, 'cgstAmount', e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.sgstRate}
//                                                 onChange={(e) => handleProductChange(index, 'sgstRate', e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.sgstAmount}
//                                                 onChange={(e) => handleProductChange(index, 'sgstAmount', e.target.value)}
//                                             />

//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.igstRate}
//                                                 onChange={(e) => handleProductChange(index, 'igstRate', e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={product.igstAmount}
//                                                 onChange={(e) => handleProductChange(index, 'igstAmount', e.target.value)}
//                                             />
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <button onClick={addMoreProducts}>Add More Products</button>
//                         <button onClick={handleSave}>Save Invoice</button>
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };

// export default EditInvoiceDetails;


import "../../../style/managment/invoice/AddProformaInvoice.css";
import React, { useState, useEffect } from 'react';
import BackIcon from "../../../utils/BackIcon";
import { useParams } from 'react-router-dom';
import { makeApi } from "../../../api/callApi.tsx";
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';
import { format } from 'date-fns';
import { ToastContainer, toast } from "react-toastify";


const EditInvoiceDetails = () => {
    const { id } = useParams();
    const [invoiceDetails, setInvoiceDetails] = useState({
        clientName: '',
        address: '',
        contact: '',
        gst: '',
        stateCode: '',
        invoice_status: '',
        status: '',
        tax_invoice_no: '',
        bill_date: "",
        invoice_no: "",

    });
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [GSTCode, setGSTCode] = useState('');


    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                setLoading(true);

                const response = await makeApi(`/v1/admin/api/get-my-bill/${id}`, "GET");
                const bill = response.data.mybill;
                const products = response.data.mybillwithproduct.map(product => ({
                    id: product._id,
                    productName: product.product,
                    hsn: product.hsn,
                    qty: product.qty,
                    rate: product.rate,
                    taxableAmount: product.taxable,
                    cgstRate: product.cgst_Rate,
                    cgstAmount: product.cgst_Amount,
                    sgstRate: product.sgst_Rate,
                    sgstAmount: product.sgst_Amount,
                    igstRate: product.igst_Rate,
                    igstAmount: product.igst_Amount
                }));

                setInvoiceDetails({
                    clientName: bill.client_name,
                    address: bill.address,
                    contact: bill.contact_no,
                    gst: bill.gst,
                    stateCode: bill.state_code,
                    invoice_status: bill.invoice_status,
                    status: bill.status,
                    tax_invoice_no: bill.tax_invoice_no,
                    invoice_status: bill.invoice_status,
                    invoice_no: bill.invoice_no,
                    // bill_date: bill.bill_date
                    bill_date: format(new Date(bill.bill_date), 'yyyy-MM-dd')
                });
                setProducts(products.length ? products : [{
                    productName: '',
                    hsn: '',
                    qty: '',
                    rate: '',
                    taxableAmount: '',
                    cgstRate: '',
                    cgstAmount: '',
                    sgstRate: '',
                    sgstAmount: '',
                    igstRate: '',
                    igstAmount: ''
                }]);
            } catch (error) {
                console.error("Error fetching invoice data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoiceData();
    }, [id]);

    const calculateTax = (product, stateCode) => {
        const amount = parseFloat(product.qty || 0);
        const price = parseFloat(product.rate || 0);
        const taxable = (amount * price).toFixed(2);
        let cgstAmount = '0.00';
        let sgstAmount = '0.00';
        let igstAmount = '0.00';
        let cgstRate = '0.00';
        let sgstRate = '0.00';
        let igstRate = '0.00';
    
        if (GSTCode === "03") {
            console.log("GSTCode", GSTCode);
            const gstAmount = ((taxable * 18) / 100).toFixed(2);
            cgstAmount = (gstAmount / 2).toFixed(2);
            sgstAmount = (gstAmount / 2).toFixed(2);
            cgstRate = '9.00';
            sgstRate = '9.00';
        } else {
            igstAmount = ((taxable * 18) / 100).toFixed(2);
            igstRate = '18.00';
        }
    
        return {
            taxableAmount: taxable,
            cgstRate,
            cgstAmount,
            sgstRate,
            sgstAmount,
            igstRate,
            igstAmount
        };
    };



    // const handleInputChange = (field, value) => {
    //     setInvoiceDetails({
    //         ...invoiceDetails,
    //         [field]: value
    //     });
    // };
    // const handleInputChange = (field, value) => {
    //     if (field === 'gst') {
    //         // Extract the state code from the first 2 digits of the GST number
    //         const stateCode = value.substring(0, 2);
    //         setGSTCode(stateCode);
    //         setInvoiceDetails({
    //             ...invoiceDetails,
    //             gst: value,
    //             stateCode: stateCode
    //         });

    //         // Recalculate tax for all products
    //         const updatedProducts = products.map(product => 
    //             calculateTax(product, stateCode)
    //         );
    //         setProducts(updatedProducts);

    //     } else if (field === 'stateCode') {
    //         setInvoiceDetails({
    //             ...invoiceDetails,
    //             stateCode: value
    //         });

    //         // Recalculate tax for all products
    //         const updatedProducts = products.map(product => 
    //             calculateTax(product, value)
    //         );
    //         setProducts(updatedProducts);

    //     } else {
    //         setInvoiceDetails({
    //             ...invoiceDetails,
    //             [field]: value
    //         });
    //     }
    // };
    const handleInputChange = (field, value) => {
        console.log("field", field, "value", value);
        if (field === 'bill_date') {
            // Convert 'YYYY-MM-DD' to ISO 8601 format
            const date = new Date(value);
            var updatedValue = date.toISOString();
            console.log("updatedValue", updatedValue);

            setInvoiceDetails({
                ...invoiceDetails,
                bill_date: updatedValue
            });
        }
        if (field === 'gst') {
            const stateCode = value.substring(0, 2);
            setGSTCode(stateCode);
            setInvoiceDetails({
                ...invoiceDetails,
                gst: value,
                stateCode: stateCode
            });
        } else if (field === 'stateCode') {
            setInvoiceDetails({
                ...invoiceDetails,
                stateCode: value
            });
        } else {
            setInvoiceDetails({
                ...invoiceDetails,
                [field]: value
            });
        }
    };


    // const handleProductChange = (index, field, value) => {
    //     const newProducts = [...products];
    //     calculateTax(newProducts[index], 222);
    //     newProducts[index][field] = value;
    //     setProducts(newProducts);
    // };
    const handleProductChange = (index, field, value) => {
        const newProducts = [...products];
        newProducts[index][field] = value;
    
        // Calculate tax only for the updated product
        const updatedProduct = {
            ...newProducts[index],
            ...calculateTax(newProducts[index], invoiceDetails.stateCode)
        };
        newProducts[index] = updatedProduct;
    
        setProducts(newProducts);
    };
    
    const addMoreProducts = () => {
        setProducts([
            ...products,
            {
                productName: '',
                hsn: '',
                qty: '',
                rate: '',
                taxableAmount: '',
                cgstRate: '',
                cgstAmount: '',
                sgstRate: '',
                sgstAmount: '',
                igstRate: '',
                igstAmount: ''
            }
        ]);
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const updatedInvoice = {
                client_name: invoiceDetails.clientName,
                address: invoiceDetails.address,
                gst: invoiceDetails.gst,
                contact_no: invoiceDetails.contact,
                state_code: invoiceDetails.stateCode,
                // bill_date: new Date(),
                status: invoiceDetails.status,
                invoice_status: invoiceDetails.invoice_status,
                tax_invoice_no: invoiceDetails.tax_invoice_no,
                bill_date: invoiceDetails.bill_date,
                invoice_no: invoiceDetails.invoice_no
            };

            const invoiceResponse = await makeApi(`/v1/admin/api/update-my-bill/${id}`, "PUT", updatedInvoice);

            const billItemsData = products.map(product => ({
                _id: product.id,
                Invoice_no: invoiceResponse.data.mybill.invoice_no,
                product: product.productName,
                hsn: product.hsn,
                qty: product.qty,
                rate: product.rate,
                taxable: product.taxableAmount,
                cgst_Rate: product.cgstRate,
                cgst_Amount: product.cgstAmount,
                sgst_Rate: product.sgstRate,
                sgst_Amount: product.sgstAmount,
                igst_Rate: product.igstRate,
                igst_Amount: product.igstAmount,
                tax_invoice_no: invoiceResponse.data.mybill.tax_invoice_no
            }));

            await makeApi(`/v1/admin/api/update-bill-items`, "PUT", billItemsData);
            toast.success("Invoice  update successfully");
            setAlert('Invoice saved successfully!');
        } catch (error) {
            console.error('Error saving invoice:', error);
            setAlert('Error saving invoice. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    // useEffect(() => {
    //     if (invoiceDetails.stateCode) {
    //         const newProducts = products.map(product => ({
    //             ...product,
    //             ...calculateTax(product, invoiceDetails.stateCode)
    //         }));
    //         setProducts(newProducts);
    //     }
    // }, [invoiceDetails.stateCode, products]);
    useEffect(() => {
        if (invoiceDetails.stateCode) {
            const newProducts = products.map(product => ({
                ...product,
                ...calculateTax(product, invoiceDetails.stateCode)
            }));
            setProducts(newProducts);
        }
    }, [invoiceDetails.stateCode]); // Remove 'products' from the dependency array
    

    const deleteProduct = async (productId) => {
        try {
            console.log(productId);
            const response = await makeApi(`/v1/admin/api/delete-bill-items/${productId}`, "DELETE");
            setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    const handleDeleteProduct = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(productId);
        }
    };


    return (
        <>
            {loading ? (
                <div style={{
                    height: "100%", width: "100%", top: "0", display: "flex",
                    justifyContent: "center", alignItems: "center", zIndex: "9999",
                    position: "fixed", backgroundColor: "rgba(0,0,0,0.3)"
                }}>
                    <PrimaryLoader />
                </div>
            ) : (
                <>
                    <ToastContainer position="top-center" autoClose={1700} />

                    <div style={{ position: "relative" }}>
                        <BackIcon path={"management/invoices-management"} />
                    </div>
                    <div className="add-proforma-invoice" style={{ padding: "0px 70px" }}>
                        <h2>Edit Proforma Invoice</h2>
                        {alert && <div className="alert">{alert}</div>}
                        {/* invoice_no */}
                        <div className="form-group" >

                            <label>Invoice No:</label>
                            <input
                                type="text"
                                value={invoiceDetails.invoice_no}
                                onChange={(e) => handleInputChange('invoice_no', e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="form-group">

                            <label>Client Name:</label>
                            <input
                                type="text"
                                value={invoiceDetails.clientName}
                                onChange={(e) => handleInputChange('clientName', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            {/* tax_invoice_no */}

                            <label>Address:</label>
                            <input
                                type="text"
                                value={invoiceDetails.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact:</label>
                            <input
                                type="text"
                                value={invoiceDetails.contact}
                                onChange={(e) => handleInputChange('contact', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>GST:</label>
                            <input
                                type="text"
                                value={invoiceDetails.gst}
                                onChange={(e) => handleInputChange('gst', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>State Code:</label>
                            <input
                                type="text"
                                value={invoiceDetails.stateCode}
                                onChange={(e) => handleInputChange('stateCode', e.target.value)}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name Of Product/Service</th>
                                    <th>HSN ACS</th>
                                    <th>Qty</th>
                                    <th>Rate</th>
                                    <th>Taxable Amount</th>
                                    <th>CGST Rate</th>
                                    <th>CGST Amount</th>
                                    <th>SGST Rate</th>
                                    <th>SGST Amount</th>
                                    <th>IGST Rate</th>
                                    <th>IGST Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.productName}
                                                onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.hsn}
                                                onChange={(e) => handleProductChange(index, 'hsn', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.qty}
                                                onChange={(e) => handleProductChange(index, 'qty', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.rate}
                                                onChange={(e) => handleProductChange(index, 'rate', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.taxableAmount}
                                                onChange={(e) => handleProductChange(index, 'taxableAmount', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.cgstRate}
                                                onChange={(e) => handleProductChange(index, 'cgstRate', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.cgstAmount}
                                                onChange={(e) => handleProductChange(index, 'cgstAmount', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.sgstRate}
                                                onChange={(e) => handleProductChange(index, 'sgstRate', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.sgstAmount}
                                                onChange={(e) => handleProductChange(index, 'sgstAmount', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.igstRate}
                                                onChange={(e) => handleProductChange(index, 'igstRate', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.igstAmount}
                                                onChange={(e) => handleProductChange(index, 'igstAmount', e.target.value)}
                                            />
                                        </td>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-danger">Delete</button>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Tax */}
                        <div>

                            <div className="form-group"  >
                                <label>Tax Invoice No:</label>
                                <input
                                    type="text"
                                    value={invoiceDetails.tax_invoice_no}
                                    onChange={(e) => handleInputChange('tax_invoice_no', e.target.value)}
                                />
                            </div>
                            {/* invoice_status */}

                            {/* <div className="form-group"  >
                                <label>Invoice Status:</label>
                                <input
                                    type="text"
                                    value={invoiceDetails.invoice_status}
                                    onChange={(e) => handleInputChange('invoice_status', e.target.value)}
                                />
                            </div> */}
                            <div className="form-group">
                                <label>Invoice Status:</label>
                                <select
                                    value={invoiceDetails.invoice_status}
                                    onChange={(e) => handleInputChange('invoice_status', e.target.value)}
                                >
                                    <option value="">Select options</option>
                                    <option value="Tax">Tax</option>
                                </select>
                            </div>

                            {/* bill_date */}

                            <div className="form-group"  >
                                <label>Bill Date:</label>
                                <input
                                    type="date"
                                    value={invoiceDetails.bill_date}
                                    onChange={(e) => handleInputChange('bill_date', e.target.value)}
                                />
                                <small> {invoiceDetails.bill_date} </small>
                            </div>

                        </div>

                        <button onClick={addMoreProducts} className="add-product-button" >Add More Products</button>
                        <button onClick={handleSave} className="save-button" >Save Invoice</button>
                    </div>
                </>
            )}
        </>
    );
};

export default EditInvoiceDetails;
