import _ from 'lodash'


export const isPrime = (n) => {
    return n !== 1 && !(
        _.some(_.map(_.range(2, n - 1), i => n % i === 0))
    ) || n == 2
}

export const generatePrime = (start, end) => (
    _.range(start, end + 1).filter(isPrime)
)