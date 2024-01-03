const tryCatch = (fn) => {
    return async (...args) => {
      try {
        await fn(...args);
      } catch (error) {
        console.log(error);
      }
    };
  };

module.exports=tryCatch