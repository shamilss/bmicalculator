import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState(null)
  const [action, setAction] = useState(null)
  const [lowerWeight, setLowerWeight] = useState(null)
  const [upperWeight, setUpperWeight] = useState(null)
  const [heightInput, setHeightInput] = useState(true)
  const [weightInput, setWeightInput] = useState(true)

  const check = (e) => {
    const { name, value } = e.target
    console.log(name);
    console.log(value);
    if (!!value.match('^[0-9]*$')) {
      if (name == 'weight') {
        setWeight(value)
        setWeightInput(true)
      }
      else {
        setHeight(value)
        setHeightInput(true)
      }
    }
    else {
      if (name == 'weight') {
        setWeight(value)
        setWeightInput(false)
      }
      else {
        setHeight(value)
        setHeightInput(false)
      }
    }
  }
  const setReset = () => {
    setWeight('')
    setHeight('')
    setResult(null)
  }
  const calculate = () => {
    if (heightInput && weightInput && height != '' && weight != '' && height <= 999 && height > 0 && weight <= 999 && weight > 0) {
      const bmi = (weight / (height * height)) * 10000
      console.log(bmi);
      setResult(bmi.toFixed(1))
      const lweight = (18.5 * (height / 100) * (height / 100))
      const uweight = (24.9 * (height / 100) * (height / 100))
      setLowerWeight(lweight.toFixed(1))
      setUpperWeight(uweight.toFixed(1))
      if (bmi >= 18.5 && bmi <= 24.9) {
        let output = 'Lose 0 Kg'
        setAction(output)
      }
      else if (bmi >= 25) {
        const x = (weight - uweight).toFixed(1)
        let output = `Lose ${x} Kg`
        setAction(output)
      }
      else if (bmi < 18.5) {
        const x = (lweight - weight).toFixed(1)
        let output = `Gain ${x} Kg`
        setAction(output)
      }
    }
    else {
      toast.error('Invalid Input')
      setResult(null)

    }
  }
  return (
    <>
      <div id='main' className='container-fluid'>
        <div id='inside'></div>
        <div style={{ height: '100vh' }} className="row d-flex justify-content-center align-items-center">
          <div className="col-md-1"></div>
          <div className="col-md-5 px-5">
            <div>
              <h1 id='mainhead' className='mt-5' style={{ fontWeight: '600', fontSize: '4rem' }}>Body Mass Index Calculator</h1>
              <p id='mainpara' className='mt-lg-4 mt-5' style={{ textAlign: 'justify', fontSize: 'larger' }}>The BMI Calculator is an easy-to-use web tool designed to help users calculate their Body Mass Index (BMI) based on their weight and height. The BMI is a measure used to assess whether a person has a healthy body weight for a given height. It helps individuals understand potential health risks associated with underweight, normal weight, overweight, and obesity.</p>
            </div>
            <div className="table-responsive-md my-4 pt-3 pb-2 pt-lg-2 pb-lg-0">
              <table id='maintable' style={{ '--bs-table-bg': '#fdfbfb' }} className="table table-bordered border-dark table-striped-columns shadow">
                <thead>
                  <tr>
                    <th>CATEGORY</th>
                    <th>BMI RANGE (kg/m<sup>2</sup>)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Underweight</td>
                    <td>Below 18.5</td>
                  </tr>
                  <tr>
                    <td>Normal weight</td>
                    <td>18.5 - 24.9</td>
                  </tr>
                  <tr>
                    <td>Overweight</td>
                    <td>25 - 29.9</td>
                  </tr>
                  <tr>
                    <td>Obese</td>
                    <td>30 - 35</td>
                  </tr>
                  <tr>
                    <td>Morbid obesity</td>
                    <td>Over 35</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
          <div className="col-md-5"  >

            <div id='user' className='shadow px-5 py-4 mt-0 mt-lg-3 mb-4 mb-lg-0' >
              <h3 className='mt-3' style={{ fontWeight: '600' }}>Enter Your Details Below : </h3>
              <div id='details' className='d-flex w-100 mt-4'>
                <div id='weight' className='w-100'>
                  <TextField style={{ background: 'inherit' }} name='weight' value={weight} onChange={(e) => check(e)} className='form-control' placeholder='0'
                    label="Weight"
                    id="outlined-start-adornment"
                    sx={{ width: '100%' }}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                      },
                    }}
                  />
                </div>
                <div id='height' className='w-100'>
                  <TextField style={{ background: 'inherit' }} onChange={(e) => check(e)} name='height' value={height} className='form-control ' placeholder='0'
                    label="Height"
                    maxLength={3}
                    id="outlined-start-adornment"
                    sx={{ width: '100%' }}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>
                      },
                    }}
                  />
                </div>
              </div>
              <div id='buttons' className='d-flex justify-content-between w-100 mb-3'>
                <Button id='b1' onClick={calculate} style={{ fontWeight: '600', fontSize: '18px' }} className='btn p-3 bg-success w-100 d-flex flex-column justify-content-center align-items-center' size='large' variant="contained">Calculate</Button>
                <Button onClick={setReset} id='b2' style={{ fontWeight: '600', fontSize: '18px' }} className='btn p-3 bg-danger w-100 d-flex flex-column justify-content-center align-items-center' size='large' variant="contained">Reset</Button></div>
            </div>
            {result != null && <>
              <div id='result' className='shadow px-5 pt-3 pb-4 mt-lg-3 mt-4 mb-lg-0 mb-4'>
                <div className='d-flex justify-content-center gap-4 pt-3 w-100'>
                  <div className='d-flex flex-column justify-content-center align-items-center text-center border border-1 border-dark rounded px-2 py-3 w-25'>
                    <h6>Your BMI</h6>
                    <h5 style={{
                      fontWeight: '800'
                    }} className={`${result < 18.5 || result >= 25 ? 'text-danger' : 'text-success'

                      }`} >{result}</h5>
                  </div>
                  <div className='d-flex flex-column justify-content-center align-items-center text-center border border-1 border-dark rounded py-3 px-2 w-50'>
                    <h6>Your BMI Category</h6>
                    {result < 18.5 && <>
                      <h5 style={{ fontWeight: '800' }} className='text-danger' >Underweight</h5>
                    </>}
                    {result >= 18.5 && result <= 24.9 && <>
                      <h5 style={{ fontWeight: '800' }} className='text-success' >Normal weight</h5>
                    </>}
                    {result >= 25 && result <= 29.9 && <>
                      <h5 style={{ fontWeight: '800' }} className='text-danger' >Overweight</h5>
                    </>}
                    {result >= 30 && result <= 35 && <>
                      <h5 style={{ fontWeight: '800' }} className='text-danger' >Obese</h5>
                    </>}
                    {result > 35 && <>
                      <h5 style={{ fontWeight: '800' }} className='text-danger' >Morbid obesity</h5>
                    </>}
                  </div>
                  <div className='d-flex flex-column justify-content-center align-items-center text-center border border-1 border-dark rounded py-3 px-2 w-50'>
                    <h6>Healthy BMI Range</h6>
                    <h5 style={{ fontWeight: '800' }} className='text-success'>18.5 - 24.9</h5>
                  </div>
                </div>
                <div className='mt-3 d-flex justify-content-between gap-4 w-100'>
                  <div style={{ width: '60%' }} className='d-flex flex-column justify-content-center align-items-center text-center border border-1 border-dark rounded p-3'>
                    <h6>Healthy Weight for your height</h6>
                    <h5 style={{ fontWeight: '800' }} className='text-success'>{lowerWeight} - {upperWeight} Kg</h5>
                  </div>
                  <div style={{ width: '40%' }} className='d-flex flex-column justify-content-center align-items-center text-center  border border-1 border-dark rounded p-3'>
                    <h6>Action</h6>
                    <h5 style={{ fontWeight: '800' }} className={`${result < 18.5 || result >= 25 ? 'text-danger' : 'text-success'
                      }`}>{action}</h5>
                  </div>
                </div>
              </div>
              <div id='note' style={{
                backgroundColor:
                  result < 18.5
                    ? "#76c5f0"
                    : result >= 18.5 && result <= 24.9
                      ? "#77c5a0"
                      : result >= 25 && result <= 29.9
                        ? "#f8c301"
                        : result >= 30 && result <= 35
                          ? "#e67817"
                          : "#db241b",
                color: 'black'

              }} className='mt-3 px-5 pb-3 pt-4 mb-4 mb-lg-0 d-flex flex-column justify-content-center align-items-center shadow'>
                {result < 18.5 &&
                  <>
                    <h3 style={{ fontWeight: '600' }}>Time to eat</h3>
                    <p style={{ fontWeight: '400', fontSize: '16px' }}>Try to eat more often with healthy, calorie-rich foods to help you gain weight.</p>
                  </>}
                {result >= 18.5 && result <= 24.9 &&
                  <>
                    <h3 style={{ fontWeight: '600' }}>You're doing great!</h3>
                    <p style={{ fontWeight: '400', fontSize: '16px' }}>You're managing a healthy weight. Keep up with balanced meals and regular exercise to maintain your weight.</p>
                  </>}
                {result >= 25 && result <= 29.9 &&
                  <>
                    <h3 style={{ fontWeight: '600' }}>Time to focus on your health</h3>
                    <p style={{ fontWeight: '400', fontSize: '16px' }}>Consider adopting healthier eating habits and increasing physical activity to help manage your weight effectively.</p>
                  </>}
                {result >= 30 && result <= 35 &&
                  <>
                    <h3 style={{ fontWeight: '600' }}>It's time for a change</h3>
                    <p style={{ fontWeight: '400', fontSize: '16px' }}>Focus on making healthier food choices and increasing physical activity to support a healthier weight and overall well-being.</p>
                  </>}
                {result > 35 &&
                  <>
                    <h3 style={{ fontWeight: '600' }}>Prioritize your health</h3>
                    <p style={{ fontWeight: '400', fontSize: '16px' }}>Focus on a personalized approach to weight management. Talk to healthcare professionals for a safe way to improve your health.</p>
                  </>}
              </div>
            </>
            }

          </div>
          <div className="col-md-1"></div>
        </div>
      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={2000} hideProgressBar={false} />
    </>
  )
}

export default App
