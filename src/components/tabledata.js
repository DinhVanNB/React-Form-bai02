import React from 'react';

export const Tabledata =({data,onEdit,onDelete})=>(
    <>
        <tr>
            <td>{data.title}</td>
            <td>{data.quantity}</td>
            <td>
                <button onClick={()=>onEdit(data)}  className='btn btn-warning'>
                    Edit
                </button>
                &nbsp;
                <button onClick={()=>onDelete(data)} className='btn btn-danger'>
                    Delete
                </button>
            </td>
        </tr>
    </>
)