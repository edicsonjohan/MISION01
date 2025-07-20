import prisma from "../prismaClient.js";

// ✅ Crear una tarea nueva
export const createTask = async (req, res) => {
  const { title, description, userId, categoryId } = req.body;
  try {
    const task = await prisma.task.create({
      data: { title, description, userId, categoryId },
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error("Error al crear la tarea:", error);
  }
};

// ✅ Obtener todas las tareas (con usuario y categoría asociada)
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        user: true,
        category: true,
      },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error al obtener las tareas:", error);
  }
};

// ✅ Actualizar una tarea por su id
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, userId, categoryId } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, completed, userId, categoryId },
    });
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: "Tarea no encontrada" });
    console.error("Error al actualizar la tarea:", error);
  }
};

// ✅ Eliminar una tarea por su id
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(404).json({ error: "Tarea no encontrada" });
    console.error("Error al eliminar la tarea:", error);
  }
};
