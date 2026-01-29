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
}
