import prisma from "../db";

export class TaskService {
  async createTask(title: string, description?: string) {
    return await prisma.task.create({
      data: {
        title,
        description,
      },
    });
  }

  async getAllTasks() {
    return await prisma.task.findMany();
  }

  async getTaskById(id: number) {
    return await prisma.task.findUnique({ where: { id } });
  }

  async updateTask(id: number, data: any) {
    return await prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: number) {
    return await prisma.task.delete({ where: { id } });
  }
}
