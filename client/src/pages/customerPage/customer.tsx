import React,{useEffect, useState} from 'react';
import API from '../../helper/api';
import SweetAlert from 'react-bootstrap-sweetalert';
import { SweetAlertRenderProps } from 'react-bootstrap-sweetalert/dist/types';
function Customer() {
    const [customers, setCustomers]:[ICustomer[], Function] = useState([])
    const [addName, setAddName] = useState("")
    const [addPhone, setAddPhone] = useState("")
    const [addAddress, setAddAddress] = useState("")
    const [addProductNames, setAddProductNames] = useState("")
    const [addProductPrice, setAddProductPrice] = useState("")
    const [addTotalPrice, setAddTotalPrice] = useState("")
    const [isShowAddFormModal, setIsShowAddFormModal]:[boolean, Function] = useState(false);
    const [error, setError] = useState("");
    useEffect(()=>{
        API.getAllCustomers()
        .then((data:[ICustomer])=>{
            setCustomers(data)
        })
        
    },[])

    const resetFild = () =>{
        setAddName("");
        setAddPhone("");
        setAddAddress("");
        setAddProductNames("");
        setAddProductPrice("");
        setAddTotalPrice("");
    }

    const validateAddField = (customer: ICustomer): boolean=>{
        if(customer.name && customer.phone_number){
            return true;
        }
        return false;
    }
    const onOpenModal = () =>{
        setError("");
        let customer: ICustomer = {
            name:addName ,phone_number: addPhone, 
            address: addAddress, product_names: addProductNames, 
            prices: addProductPrice, total_price: addTotalPrice, created_at: new Date()}
        if(!validateAddField(customer)){
            setError("Một số trường điền vào không hợp lệ");
            return
        }
        API.postAddCustomers(customer)
        .then((result: ICustomer)=>{
            resetFild();
            setCustomers((prevState: ICustomer[])=>{return [...prevState, result]})
        })
        .catch(()=>{
            setError("Add new customer error")
            return
        })
        setIsShowAddFormModal(false);
    }
    const onCancel = () =>{
        setIsShowAddFormModal(false);
    }
  return (
    <div className="container">
        <SweetAlert
        show={isShowAddFormModal}
        title={"Thêm mới KH"}
        onConfirm={onOpenModal}
        onCancel={onCancel}
        dependencies={[addName, addPhone, addAddress, addProductNames, addProductPrice, addTotalPrice]}
        >
        {(renderProps: SweetAlertRenderProps) => (
            <form >
                <div className="form-group">
                    <input
                        type={'text'}
                        className="form-control"
                        placeholder={'Tên khách hàng'}
                        value={addName}
                        onChange={(e) => setAddName(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <input
                        type={'number'}
                        className="form-control"
                        placeholder={'Số điện thoại'}
                        value={addPhone}
                        onChange={(e) => setAddPhone(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <input
                        type={'text'}
                        className="form-control"
                        placeholder={'Địa chỉ'}
                        value={addAddress}
                        onChange={(e) => setAddAddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type={'text'}
                        className="form-control"
                        placeholder={'Tên sản phẩm'}
                        value={addProductNames}
                        onChange={(e) => setAddProductNames(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type={'text'}
                        className="form-control"
                        placeholder={'Đơn giá'}
                        value={addProductPrice}
                        onChange={(e) => setAddProductPrice(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type={'number'}
                        className="form-control"
                        placeholder={'Tổng tiền'}
                        value={addTotalPrice}
                        onChange={(e) => setAddTotalPrice(e.target.value)}
                    />
                </div>
                <hr/>
                {
                    error?
                    <div className="alert alert-danger">
                        {error}
                    </div>:""
                }

            </form>
        )}
        </SweetAlert>
        <div className="row my-4">
            <div className="col-12 col-md-10">
                <h2>Thông tin khách hàng</h2>
            </div>
            <div className="col-12 col-md-2">
                <button className="btn btn-block btn-primary mt-2" onClick={()=>{setIsShowAddFormModal(true)}} >Thêm mới</button>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <table id="example" className="table table-striped table-hover ">
                    <thead>
                        <tr className="bg-primary text-light">
                            <th>Tên khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Tổng tiền</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers != null ? customers.map((customer:ICustomer,index:number) => {
                                return(<tr key={index}>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone_number}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.product_names}</td>
                                    <td>{customer.prices}</td>
                                    <td>{customer.total_price}</td>
                                    <td className="float-right">
                                        <button className="btn btn-warning m-1"><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-danger m-1"><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>)
                            }):""
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default Customer;
