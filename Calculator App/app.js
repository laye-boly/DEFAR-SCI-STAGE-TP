class Calculator{
    constructor(){
        Calculator.zeroDivision = false
        Calculator.buttonClickGestion()
    }
    static updateOperands(previousOperand, currentOperand, button){
        if(button.hasAttribute("data-number")){
            if(button.innerHTML == "." && currentOperand.innerHTML.indexOf(".") != -1){
                return 
            }
            currentOperand.innerHTML += button.innerHTML 
        }else if(button.hasAttribute("data-operation")){
            previousOperand.innerHTML += currentOperand.innerHTML + button.innerHTML
            currentOperand.innerHTML = ""
        }
    }

    static displayNomberInLocale(number){

    }

   static buttonClickGestion() {
       const buttons = Array.prototype.slice.call(document.getElementsByTagName("button"))
       const previousOperand = document.querySelector(".previous-operand")
       const currentOperand = document.querySelector(".current-operand")
       buttons.forEach(btn => {
           btn.addEventListener("click", () => {
                if(btn.hasAttribute("data-number") || btn.hasAttribute("data-operation")){
                    Calculator.updateOperands(previousOperand, currentOperand, btn)
                }else if(btn.hasAttribute("data-equals")){
                    if(Calculator.isOperationValid(previousOperand, currentOperand)){
                        Calculator.doOperation(previousOperand, currentOperand)
                    }else{
                        previousOperand.innerHTML = ""
                        currentOperand.innerHTML = "operation invalide"
                        setTimeout(() => {
                            currentOperand.innerHTML = ""
                        }, 800)
                    }
                }else if(btn.hasAttribute("data-all-clear")){
                    previousOperand.innerHTML = ""
                    currentOperand.innerHTML = ""
                }else if(btn.hasAttribute("data-delete")){
                    if(currentOperand.innerHTML !== ""){
                        currentOperand.innerHTML = currentOperand.innerHTML.substr(0, currentOperand.innerHTML.length-1)
                    }
                    else if(previousOperand.innerHTML !== ""){
                        previousOperand.innerHTML = previousOperand.innerHTML.substr(0, previousOperand.innerHTML.length-1)
                    }
                   
                }

           })
       })
   }

   static isOperationValid(previousOperand, currentOperand){
       
        const operation = previousOperand.innerHTML + currentOperand.innerHTML
        if(/(-|\+|\*|\/)/.test(operation) === false){
            return false
        }

        if(/^[-\+\*\/]/.test(operation) === false && /[-\+\*\/]$/.test(operation) === false 
        && /[-\+\*\/]{2,}/.test(operation) === false ){
            
            return true
        }

        return false 
    }

    static doOperation(previousOperand, currentOperand){
        const operation = previousOperand.innerHTML + currentOperand.innerHTML
        let operateurs = operation.split(/[0-9\.]+/).filter(o => o !== "")
        operateurs.unshift("+")
        const numbers = operation.split(/-|\*|\/|-|\+/).map(n => parseFloat(n))
        const result = numbers.reduce((accumulateur, currentValue, index) => {
            switch(operateurs[index]){
                case "+":
                    return accumulateur += currentValue
                    break 
                case "-":
                    return accumulateur -= currentValue
                case "*":
                    return accumulateur *= currentValue
                    
                case "/":
                    if(currentValue == 0){
                        Calculator.zeroDivision = true
                        return "Impossible de diviser par zero"
                    }
                    return accumulateur /= currentValue
                    
            }
        }, 0)

       
        previousOperand.innerHTML = result
        currentOperand.innerHTML = ""
        if(Calculator.zeroDivision){
            setTimeout(() =>{
                previousOperand.innerHTML = ""
            },800)
            Calculator.zeroDivision = false
        }
        

    }

}
new Calculator()