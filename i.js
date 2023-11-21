const initialValue = 1 // Initial value
const growthRate = 1.82 // Growth rate
const iterations = 100 // Number of iterations

let result = initialValue

for (let i = 0; i < iterations; i++) {
  result *= growthRate
  console.log(result)
}
