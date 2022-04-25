import { useState } from "react";
import "./App.css"

const AddHouse = (props) => {
  const [formdata, setFormdata] = useState();
  const [table, setTable] = useState([]);

  const handleChange = (e) =>{
    const inputName = e.target.name;
    // checkbox
    if(e.target.type === 'checkbox'){
        console.log(e.target.checked);
        setFormdata({...formdata,[inputName]: e.target.checked });
    }else{
        setFormdata({ ...formdata,[inputName]: e.target.value });
    }
};
  
var cartArr = []
var cartArr = JSON.parse(localStorage.getItem("formitems")) || []

const handleSubmit = (e) =>{
  e.preventDefault();
  cartArr.push(formdata);
  localStorage.setItem("formitems",JSON.stringify(cartArr));
  console.log(cartArr)
}

const deleteitem = (id) =>{
  let updatedList = cartArr.filter((item) => item.age !== id)
  setFormdata(updatedList);
  console.log(updatedList)
}

function displaydata(cartArr){
  return( <>
   {cartArr?.map((house, index) => {
    return (
      <tr key={house?.id} className="houseDetails">
        <td className="houseId">{index}</td>
        <td className="houseName">{house?.name} </td>
        <td className="age">{house?.age}</td>
        <td className="address">{house?.address}</td>
        <td className="areaCode">{house?.selected}</td>
        <td className="rent">{house?.salary}</td>
        <td className="married">
          {/* Show text Both or Bachelors or Married based on values */}
          {house?.married ? "married" : "un-married"}
        </td>
        <td className="dele" onClick={()=>deleteitem(house?.age)} >Delete</td>
      </tr>
    );
  })}
  </>)
}

  return (
    <div className="addHouseContainer" onSubmit={handleSubmit}>
      <h1>Enter Details</h1>
      <form>
        <label>Name</label>
        <input type="text" className="name" value={formdata?.name} name="name" required onChange={handleChange}/>
        <br />

        <label>Age</label>
        <input value={formdata?.age} name="age" type="number" className="age" required onChange={handleChange}/>
        <br />

        <label>Address</label>
        <input value={formdata?.address} name="address" type="text" className="address" required  onChange={handleChange}/>
        <br/>

        <select name="selected" id="selecttag" onChange={handleChange} className="areaCode">
            <option value={formdata?.Department}>Department</option>
            <option value={formdata?.Busiiness} >Busiiness</option>
            <option value={formdata?.HR}>HR</option>
            <option value={formdata?.Economics}>Economics</option>
            <option value={formdata?.Logistics}>Logistics</option>
        </select>
        <br />

        <label>Salary</label>
        <input value={formdata?.rent} name="salary" type="number" className="salary" required onChange={handleChange}/>
        <br />
      
        <input checked={formdata?.checked} name="married" type="checkbox" className="married" onChange={handleChange}/>
        <label>Married</label>
        <br />

        <input className="submitBtn" type="submit" />
      </form>


      <table className="table" border="1">
        <thead>
          <tr>
            <th>Sl.no.</th>
            <th>Name</th>
            <th>Age</th>
            <th>Adress</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Married</th>
          </tr>
        </thead>
        <tbody>
          {displaydata(cartArr)}
        </tbody>
      </table>
    </div>
  );
};

export default AddHouse