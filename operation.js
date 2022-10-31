// operation.js

//examples about how to use "KeyCodeEvent": https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
function keyCodeEvent(input, obj, func) {
    if (keyIsPressed)
        if (keyCode === input)
            func(obj);
}

function keyEvent(input, obj, func) {
    if (keyIsPressed)
        if (key === input)
            func(obj);
}