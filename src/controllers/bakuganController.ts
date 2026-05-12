const { getBakuganDB, addBakuganDB, updateBakuganDB, deleteBakuganDB, getBakuganPorIdDB } = require('../usecases/BakuganUseCases');

const getBakugan = async (request, response) => {
    await getBakuganDB()
        .then(data => response.status(200).json(data))
        .catch((err : unknown) => response.status(400).json({
            status: "error",
            message: err
        }));
}

const addBakugan = async (request, response) => {
    await addBakuganDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Bakugan criado",
            objeto: data
        }))
        .catch((err : unknown) => response.status(400).json({
            status: "error",
            message: err
        }))
}

const updateBakugan= async (request, response) => {
    await updateBakuganDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Bakugan atualizado",
            objeto: data
        }))
        .catch((err : unknown) => response.status(400).json({
            status: "error",
            message: err
        }))
}

const deleteBakugan = async (request, response) => {
    await deleteBakuganDB(request.params.id)
        .then(data => response.status(200).json({
            status: "success",
            message: data
        }))
        .catch((err : unknown) => response.status(400).json({
            status: "error",
            message: err
        }))
}

const getBakuganPorId = async (request, response) => {
    await getBakuganPorIdDB(request.params.id)
        .then(data => response.status(200).json(data))
        .catch((err : unknown)=> response.status(400).json({
            status: "error",
            message: err
        }))
}

module.exports = { getBakugan, addBakugan, updateBakugan, deleteBakugan, getBakuganPorId }