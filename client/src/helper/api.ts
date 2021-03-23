import axios from 'axios';
// const rootUrl = "https://customer-s-fnyl2lck7-hoangngoclam.vercel.app/";
const rootUrl = "http://localhost:3001"

class API{
    public static getAllCustomers(): Promise<[ICustomer]>{
        return new Promise((res,rej)=>{
            axios.get(rootUrl+"/customers")
            .then((result: {data:[ICustomer]})=>{
                if(result.data != null){
                    res(result.data)
                }
            })
            .catch(error=>{
                rej(error)
            })
        })
    }

    public static postAddCustomers(data: ICustomer): Promise<ICustomer>{
        return new Promise((res,rej)=>{
            axios.post(rootUrl+"/customers",data)
            .then((result: {data:ICustomer})=>{
                if(result.data != null){
                    res(result.data)
                }
            })
            .catch(error=>{
                rej(error)
            })
        })
    }

    public static deleteCustomers(id: string): Promise<boolean>{
        return new Promise((res,rej)=>{
            axios.delete(rootUrl+"/customers/"+id)
            .then((result: any)=>{
                res(true)
            })
            .catch(error=>{
                rej(error)
            })
        })
    }
}

export default API


