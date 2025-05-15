import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './Price.css';
import {useFormContext} from "react-hook-form";


// kristina
// form filter : nadine
function Price() {

    const { register, setValue } = useFormContext();
    const [value, setSliderValue] = useState([0, 3000000]);

    const handleChange = (event, newValue) => {
        setSliderValue(newValue);
        setValue("minPrice", newValue[0]) /// changer la valeur pour le form
        setValue("maxPrice", newValue[1]) /// changer la valeurs pour le form

    };

    return (
        <Box className="priceSliderContainer">
            <Slider
                className="priceSlider"
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="off"
                min={0}
                max={3000000}
            />

            {/*afin de placer dans le form le max/min price avec useFormContext, c'est caché*/}
            <input hidden={true} type={"text"} value={value[0]} {...register("minPrice")} />
            <input hidden={true} type={"text"} value={value[1]} {...register("maxPrice")}/>


            <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: 2}}>
                <Box className="valueBox">{value[0]}</Box>
                <Box className="valueBox">{value[1]}</Box>
            </Box>
        </Box>
    );
}

export default Price;