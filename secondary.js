// CLOSURE SAMPLE
function a (v) {
    const foo = v
    return function () {
        return foo
    }
}

const first = a(100)
const second = a(200)
console.log(first)
console.log(first())
console.log(second())

