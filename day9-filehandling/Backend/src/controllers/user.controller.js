const create = async (req, res) => {
  try {
    console.log(req.files);
      console.log(req.body);

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { create };
