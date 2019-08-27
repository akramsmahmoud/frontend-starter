import {
    isPrime,
    generatePrime
} from '../common/header'
import assert from 'power-assert'

describe('Prime', () => {
    it('should be true if input is prime', () => {
        assert(isPrime(2) === true)
        assert(isPrime(3) === true)
    })

    it('should be false if input is not prime', () => {
        assert(isPrime(1) === false)
        assert(isPrime(4) === false)
        assert(isPrime(6) === false)
    })

    it('should generate array of input range from start to end', () => {
        assert.deepEqual(generatePrime(2, 10), [2, 3, 5, 7])
        assert.deepEqual(generatePrime(2, 2), [2])
        assert.deepEqual(generatePrime(11, 17), [11, 13, 17])
    })
})