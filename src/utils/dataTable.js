export const isCasesDeathsGreaterThanZero = (data) => {
    // eslint-disable-next-line no-restricted-globals
    if (data === undefined || isNaN(data)) {
      return false;
    }
    if (data > 0) {
      return true;
    }
    return false;
  };
  