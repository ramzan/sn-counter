const COLORS = ["red", "dark-blue", "light-blue", "green", "yellow", "purple"];

function checkInput(e) {
    let key = e.keyCode || e.which; // get key cross-browser
    if ((key < 48 || key > 57) && key !== 8 && key !== 46) { // allow numbers, backspace, delete
        //Prevent default action, which is inserting character
        if (e.preventDefault) e.preventDefault(); //normal browsers
        e.returnValue = false; //IE
    }
};

export {checkInput, COLORS};