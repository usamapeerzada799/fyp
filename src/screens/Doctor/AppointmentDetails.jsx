import header from '../../images/header.png'
const AppointmentDetails = () => {
  
  return (
    <div className="container">
       <div className="image-container">
      <img src={header} alt="Your Image" className="image" />
      <div className="text-overlay">Details</div>
    </div>
    <div className='dropdown'>
    <select value="" onChange={()=>{}}>
        <option value="">Choose an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      </div>
    </div>
  )
}
export default AppointmentDetails