// server/src/middleware/validateRequest.js
function validateRequest(schemas) {
  return (req, res, next) => {
    const validationErrors = [];

    // schemas: { body, params, query }
    for (const [target, schema] of Object.entries(schemas)) {
      if (schema) {
        const { error } = schema.validate(req[target], {
          abortEarly: false, // collect all errors
          errors: { wrap: { label: "" } },
        });
        if (error) {
          validationErrors.push(
            ...error.details.map((detail) => ({
              field: detail.path.join("."),
              message: detail.message,
            }))
          );
        }
      }
    }

    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json({ error: "Validation Error", details: validationErrors });
    }
    next();
  };
}

module.exports = validateRequest;
