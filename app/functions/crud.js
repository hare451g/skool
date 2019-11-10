async function getAll(Model) {
  return Model.find();
}

function getById(Model, id) {
  return Model.findById(id);
}

function createNew(Model, document) {
  const newDocument = new Model(document);
  return newDocument.save();
}

function update(Model, id, document) {
  const updatedModel = Model.findByIdAndUpdate(id, document);
  return updatedModel;
}

function remove(Model, id) {
  const removedModel = Model.findByIdAndRemove(id);
  return removedModel;
}

const crud = { getAll, getById, createNew, update, remove };

module.exports = crud;
