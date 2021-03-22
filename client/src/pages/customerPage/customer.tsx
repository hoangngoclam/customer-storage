import React,{useEffect} from 'react';

function Customer() {
    // const [customers, setCustomers]:[ICustomerModel, Function] = useState([])
    useEffect(()=>{
        
    })
  return (
    <div >
        <table id="example" className="table table-striped table-bordered">
        <thead>
            <tr>
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
            <tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011/04/25</td>
                <td>$320,800</td>
                <td className="float-right">
                    <button className="btn btn-warning m-1"><i className="fas fa-edit"></i></button>
                    <button className="btn btn-danger m-1"><i className="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
  );
}

export default Customer;
