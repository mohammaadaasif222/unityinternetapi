  import { errorHandler } from "../utils/error.js";
  export function authorizeRoles (...types) {

    return (req, res, next) => {
      if (!types.includes(req.user.type)) {
        return next(
         errorHandler(
           403,
            `Role (${req.user.type}) is not allowed to access this resource`
          )
        );
      } 
      next();
    };
  }
