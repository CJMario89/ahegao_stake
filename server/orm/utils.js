const upsert = async (Model, values, condition) => {
  return await Model.findOne({ where: condition }).then(async function (obj) {
    // update
    if (obj) return await obj.update(values);
    // insert
    console.log(values);
    return await Model.create(values);
  });
};

const makeid = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export { upsert, makeid };
