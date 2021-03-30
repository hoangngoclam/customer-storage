import React, { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { SweetAlertRenderProps } from 'react-bootstrap-sweetalert/dist/types';
import API from '../helper/api';
function AddCustomerPopup({addNewCustomer, isShow = false, onClosePopupState}: IAddCustomerPopup) {
    const [addName, setAddName] = useState("")
    const [addPhone, setAddPhone] = useState("")
    const [addAddress, setAddAddress] = useState("")
    const [addProductNames, setAddProductNames] = useState("")
    const [addProductPrice, setAddProductPrice] = useState("")
    const [addTotalPrice, setAddTotalPrice] = useState("")
    const [isShowAddFormModal, setIsShowAddFormModal] = useState(isShow);
    const [error, setError] = useState("");

    useEffect(()=>{
        setIsShowAddFormModal(isShow)
    },[isShow])

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
            addNewCustomer(result);
        })
        .catch(()=>{
            setError("Add new customer error")
            return
        })
        setIsShowAddFormModal(false);
        onClosePopupState();
    }
    const onCancel = () =>{
        setIsShowAddFormModal(false);
        onClosePopupState();
    }
  return (
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
  );
}

export default AddCustomerPopup;

interface IAddCustomerPopup{
    addNewCustomer: Function,
    onClosePopupState: Function,
    isShow: boolean,
}