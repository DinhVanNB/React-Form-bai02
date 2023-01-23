import './App.css';
import React, {useState} from 'react';
import { Formik } from "formik";
import { Tabledata } from './components/tabledata';

export const App=() =>{
  let [books, setBook] = useState([]);
  let [indexSelected, setIndexSelected ] = useState(-1);
  const [form,setForm] = useState({});
  const regex = {
      title: /^[a-zA-Z0-9_.+ -]{2,}$/,
      quantity:/^[0-9]+$/
  };
 
  function onChange(e){
    setForm( {
      ...form,[e.target.name]:e.target.value
    })
  }
  function handleValidate(){
    const errors = {};
    if(!form.title){
       errors.title="Bạn hãy nhập tiêu đề!!";
    }
    else if(!regex.title.test(form.title)){
      console.log(form.title)
       errors.title = "Tiêu đề hợp lệ phải dài hơn 2 ký tự!!"
    }
    
    if(!form.quantity ){
       errors.quantity="Bạn hãy nhập số lượng!!";
    }
    else if(!regex.quantity.test(form.quantity) || +form.quantity===0){
      errors.quantity = "Số lượng phải là dạng số và lớn hơn 0!!"
    }
    return errors;
      
  }

  const onClear =()=>{
      setForm(clear => clear={});
      setIndexSelected(pre=>pre = -1);
  }

  const onEdit=(data)=>{
    setIndexSelected(pre=>pre = 1);
    setForm(bookEdit => bookEdit=data)
  }
   function handleSubmit(){
     setBook( prev=>{
      if(indexSelected!==1){
        return [...prev,{...form,id:generateId()}]
      }
      else{
        for(let i = 0; i<books.length;i++){
          if(books[i].id  ===form.id)
          {
            setBook(prev=>prev[i]=form);
          }
        }
        return [...prev]
      }
     });
     onClear();
  }
  const generateId=()=>{
    let id = '';
    for(let i=0;i<8;i++){
       id += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}
      return id
  }
  const onDelete =(data)=>{
      if(window.confirm(`Bạn có muốn xóa ${data.title} không ?`)){
       setBook(prev =>prev = books.filter(book=>{
          return book.id !==data.id
        }))
      };
      onClear();
  }
  return(
    
  <div className='container'>
    <h1 className='mt-2 my-3'>Library</h1>
      <Formik 
      initialValues={form}
      validate={handleValidate}
      onSubmit={handleSubmit}
      >
      {({ errors , handleSubmit })=>(
        <form onSubmit={handleSubmit }>
        <div className= {`custom-input ${errors.title ? "custom-input-error" : ""}`}>
          <label>Tiêu đề</label>
          <input name='title' type="text" value={form.title||''} 
          onChange={onChange}/>
          <p className="error">{errors.title}</p>
        </div>
        <div 
        className= {`custom-input ${errors.quantity ? "custom-input-error" : ""}`}>
          <label>Số lượng</label>
          <input name='quantity' type="text" value={form.quantity||''} 
          onChange={onChange}/>
          <p className="error">{errors.quantity}</p>
        </div>
       
        <button className='btn btn-success' type="submit">{+indexSelected===1?'Sửa':'Submit' }</button>
        </form>
        
      )}
      </Formik>
      <table className='mt-2'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
             { books.map((book)=><Tabledata data={book} onDelete={onDelete} onEdit={onEdit}  key={book.id}/>)}
          </tbody>
        </table>
  </div>
  );
}

