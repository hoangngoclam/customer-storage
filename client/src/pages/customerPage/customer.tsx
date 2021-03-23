import React,{useEffect, useState} from 'react';
import API from '../../helper/api';
import SweetAlert from 'react-bootstrap-sweetalert';
function Customer() {
    const [customers, setCustomers]:[ICustomer[], Function] = useState([])
    const [isShowAddFormModal, setIsShowAddFormModal]:[boolean, Function] = useState(false);
    useEffect(()=>{
        API.getAllCustomers()
        .then((data:[ICustomer])=>{
            setCustomers(data)
        })
        
    },[])

    const onOpenModal = () =>{
        setIsShowAddFormModal(true);
    }
    const onCancel = () =>{
        setIsShowAddFormModal(false);
    }
  return (
    <div className="container">
        <SweetAlert title="Here's a message!" show={isShowAddFormModal} onConfirm={onCancel} onCancel={(onCancel)} />
        <div className="row my-4">
            <div className="col-12 col-md-10">
                <h2>Thông tin khách hàng</h2>
            </div>
            <div className="col-12 col-md-2">
                <button className="btn btn-block btn-primary mt-2" onClick={onOpenModal} >Thêm mới</button>
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
