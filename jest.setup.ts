import '@testing-library/jest-dom'

if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (val: any) => {
    if (val === undefined) {
        return undefined;
    }

    try {
      return JSON.parse(JSON.stringify(val));
    } catch (e){
      console.log("structuredClone polyfill failed:", e)

      throw e;
    }
      
  }
}

if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}