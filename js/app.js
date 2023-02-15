document.addEventListener("DOMContentLoaded", () => {
   //Variables.
   const calculatorButton = document.querySelector(".calculator__buttons");
   const calculatorDisplay = document.querySelector(".calculator__input");
   const delInputButton = calculatorButton.querySelector("#del");
   const resetInputButton = calculatorButton.querySelector("#reset");
   const themeSwitch = document.querySelector(".theme__switch");
   const showFooterButton = document.querySelector(".show-footer");
   const footer = document.querySelector(".footer");
   const blackFilter = document.querySelector(".black-filter");
   let actualTheme = 1;
   let result = false;

   calculatorButton.addEventListener("click", showOnInput);
   calculatorDisplay.addEventListener("input", () => {
      if (result){
         calculatorDisplay.value = "";
         result = false;
      }

      const input = calculatorDisplay.value;
      validateInput(input);
   });
   delInputButton.addEventListener("click", () => calculatorDisplay.value = calculatorDisplay.value.substring(0, calculatorDisplay.value.length - 1));
   resetInputButton.addEventListener("click", () => calculatorDisplay.value = "");
   themeSwitch.addEventListener("click", swtichTheme);
   showFooterButton.addEventListener("click", showFooter);
   

   //Functions.
   //Function to show the button number/operator on the display.
   function showOnInput(e) {
      const button = e.target;
      let input = calculatorDisplay.value;

      if (result){
         input = "";
         result = false;
      }

      if (button.classList.contains("op")) {
         input += button.textContent;
         if (isNaN(button.textContent) && (input[input.length - 2] === button.textContent || isNaN(input[input.length - 2]))) input = input.substring(0, input.length - 1);
      }

      calculatorDisplay.value = input;

      if (button.id === "equal"){
         if (isNaN(input) && !isNaN(input[input.length-1])) {
            input = eval(input);
            calculatorDisplay.value = input;
            result = true;
         }
      }
   }

   //Function to validate the input:
   function validateInput(input){
      var regex = /^[\d\+\-\*\/\(\)\.]+$/;
      if (!regex.test(input)) calculatorDisplay.value = input.substring(0, input.length - 1);
   }

   //Function to swtich theme.
   function swtichTheme(){
      calculatorButton.parentElement.classList.remove("in-theme");
      calculatorButton.parentElement.classList.add("out-theme");
      
      setTimeout(() => {
         calculatorButton.parentElement.parentElement.classList.remove(`theme-${actualTheme}`);
         themeSwitch.classList.remove(`theme-${actualTheme}`);

         actualTheme = (actualTheme === 3 ? 1 : actualTheme + 1);

         calculatorButton.parentElement.classList.remove("out-theme");
         calculatorButton.parentElement.classList.add("in-theme");

         calculatorButton.parentElement.parentElement.classList.add(`theme-${actualTheme}`);
         themeSwitch.classList.add(`theme-${actualTheme}`);
      }, 500);
   }

   //Function to show the footer.
   function showFooter() {
      footer.classList.toggle("noshow");
      blackFilter.classList.toggle("noshow");
      if (footer.classList.contains("noshow")) showFooterButton.textContent = "i";
      else showFooterButton.textContent = "X";
   }
});