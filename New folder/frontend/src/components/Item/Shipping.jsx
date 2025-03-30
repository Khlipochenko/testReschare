
import { RadioGroup, FormControl,FormControlLabel, Radio, FormLabel } from "@mui/material"
export const Shipping=({shipping, setShipping})=>{
return(
    <>
<FormControl>
  <FormLabel id="row" className="mt-6" > <p className=" text-custom-text-green">Versand: </p></FormLabel>
  <RadioGroup row className="flex text-custom-text-green "
    aria-labelledby="row"
    name="controlled-radio-buttons-group"
    sx={{ color: "#495A45" }}
    value={shipping}
    onChange={(e)=>setShipping(e.target.value)}
  >
    <FormControlLabel  value="Versand möglich" control={<Radio  sx={{ color: "#495A45", '&.Mui-checked': { color: "#495A45" } }}/>} label="Versand möglich" />
    <FormControlLabel value="Nur Abholung" className="text-custom-text-green" control={<Radio sx={{ color: "#495A45", '&.Mui-checked': { color: "#495A45" } }}/>}  label="Nur Abholung" />
  </RadioGroup>
</FormControl>
</>
)
}