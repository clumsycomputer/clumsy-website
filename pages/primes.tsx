export default () => {
  return getPrimesLessThanNumber({
    maxNumber: getPrimeContainer({
      containerIndex: 13,
    }),
  }).length;
};

interface GetPrimeContainerApi {
  containerIndex: number;
}

function getPrimeContainer(api: GetPrimeContainerApi): number {
  const { containerIndex } = api;
  return getPrimeContainers({
    maxContainerIndex: containerIndex,
  })[containerIndex];
}

interface GetPrimeContainersApi {
  maxContainerIndex: number;
}

function getPrimeContainers(api: GetPrimeContainersApi): Array<number> {
  const { maxContainerIndex } = api;
  const primeContainers: Array<number> = [];
  let n = 4;
  while (primeContainers.length < maxContainerIndex + 1) {
    if (
      isPrime({
        someNumber: n - 1,
      }) &&
      isPrime({
        someNumber: n + 1,
      })
    ) {
      primeContainers.push(n);
    }
    n = n + 1;
  }
  return primeContainers;
}

interface IsPrimeApi {
  someNumber: number;
}

// https://stackoverflow.com/a/40200710
function isPrime(api: IsPrimeApi) {
  const { someNumber } = api;
  for (let n = 2; n <= Math.sqrt(someNumber); n++) {
    if (someNumber % n === 0) {
      return false;
    }
  }
  return someNumber > 1;
}

interface GetPrimeApi {
  primeIndex: number;
}

function getPrime(api: GetPrimeApi): number {
  const { primeIndex } = api;
  return getPrimes({
    maxPrimeIndex: primeIndex,
  })[primeIndex];
}

interface GetPrimesApi {
  maxPrimeIndex: number;
}

function getPrimes(api: GetPrimesApi): Array<number> {
  const { maxPrimeIndex } = api;
  return getPrimesLessThanNumber({
    maxNumber: getNumberGreaterThanNthPrime({
      primeIndex: maxPrimeIndex,
    }),
  });
}

interface GetPrimesLessThanNumberApi {
  maxNumber: number;
}

function getPrimesLessThanNumber(
  api: GetPrimesLessThanNumberApi
): Array<number> {
  const { maxNumber } = api;
  const nonPrimes = new Set<number>();
  const primesResult: Array<number> = [];
  for (let n = 2; n < maxNumber; n++) {
    if (!nonPrimes.has(n)) {
      primesResult.push(n);
      let nextNonPrime = Math.pow(n, 2);
      while (nextNonPrime < maxNumber) {
        nonPrimes.add(nextNonPrime);
        nextNonPrime = nextNonPrime + n;
      }
    }
  }
  return primesResult;
}

interface GetNumberGreaterThanNthPrimeApi {
  primeIndex: number;
}

function getNumberGreaterThanNthPrime(
  api: GetNumberGreaterThanNthPrimeApi
): number {
  const { primeIndex } = api;
  if (primeIndex === 0) {
    return 2 + 1;
  } else if (primeIndex === 1) {
    return 3 + 1;
  } else if (primeIndex === 2) {
    return 5 + 1;
  } else if (primeIndex === 3) {
    return 7 + 1;
  } else if (primeIndex === 4) {
    return 11 + 1;
  } else {
    const adjustedPrimeIndex = primeIndex + 1;
    return Math.floor(
      adjustedPrimeIndex * Math.log(adjustedPrimeIndex) +
        adjustedPrimeIndex * Math.log(Math.log(adjustedPrimeIndex))
    );
  }
}
