import React, {useState, useEffect} from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

export default Calculator => {

    const [ displayValue, setDisplayValue ] = useState('0');
    const [ clearDisplay, setClearDisplay ] = useState(false);
    const [ clearMemory, setClearMemory ] = useState(false);
    const [ operator, setOperator ] = useState(false);
    const [ values, setValues ] = useState([0 , 0]);
    const [ indValues, setIndValues ] = useState(0);

    // clearMemory
    useEffect(() => {
        if (clearMemory){
            setDisplayValue('0')
            setClearDisplay(false)
            setClearMemory(false)
            setOperator(false)
            setValues([0,0])
            setIndValues(0)
        }
    }, [clearMemory] )

    function addDigit(n) {
        if (n === '.' && displayValue) {
            return
        }

        console.log(operator)
        if (operator === null) {


        }

        const newClearDisplay = displayValue === '0'
            || clearDisplay

        const currentValue = newClearDisplay ? '' : displayValue
        const NewdisplayValue = currentValue + n

        setDisplayValue(NewdisplayValue);
        setClearDisplay(false);

        if (n !== '.') {
            const i = indValues
            const newValues = values
            newValues[i] = parseFloat(NewdisplayValue)
            setValues(newValues);
        }
    }


    function setOperation(operation) {
        if (indValues === 0) {
            setOperator(operation);
            setClearDisplay(true);
            setIndValues(1);
        } else {
            const equals = (operation === '=');
            const currentOperation = operator;

            const newValues = values;

            try {
                newValues[0] = eval(`${newValues[0]} ${currentOperation} ${newValues[1]}`);
            } catch (e) {
                newValues[0] = newValues[0]
            }

            newValues[1] = 0;

            setDisplayValue(newValues[0])
            setClearDisplay(!equals)
            setOperator(equals ? null : operation)
            setValues(newValues)
            setIndValues(equals ? 0 : 1)
        }
    }

    return (
        <div className="calculator">
            <Display value={displayValue}/>
            <Button label={"AC"} click={() => { setClearMemory(true) }} triple/>
            <Button label={"/"} click={setOperation} operation/>
            <Button label={"7"} click={addDigit}/>
            <Button label={"8"} click={addDigit}/>
            <Button label={"9"} click={addDigit}/>
            <Button label={"*"} click={setOperation} operation/>
            <Button label={"4"} click={addDigit}/>
            <Button label={"5"} click={addDigit}/>
            <Button label={"6"} click={addDigit}/>
            <Button label={"-"} click={setOperation} operation/>
            <Button label={"1"} click={addDigit}/>
            <Button label={"2"} click={addDigit}/>
            <Button label={"3"} click={addDigit}/>
            <Button label={"+"} click={setOperation} operation/>
            <Button label={"0"} click={addDigit} double/>
            <Button label={"."} click={addDigit}/>
            <Button label={"="} click={setOperation} operation/>
        </div>
    )
}