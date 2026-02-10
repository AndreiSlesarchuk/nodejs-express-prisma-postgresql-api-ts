import prisma from "../db";

export class TaskService {
  async createTask(userId: number, title: string, description?: string) {
    return await prisma.task.create({
      data: {
        title,
        description,
        author: {
          connect: { id: userId }
        }
      },
    });
  }

  async getAllTasks(userId?: number) {
    return await prisma.task.findMany({
      where: userId ? { authorId: userId } : {},
      include: {
        author: { select: { username: true, email: true } },
        assignees: { include: { user: { select: { username: true } } } }
      }
    });
  }

  async getTaskById(id: number) {
    return await prisma.task.findUnique({ 
      where: { id },
      include: { author: true, assignees: true } 
    });
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

  async assignTask(taskId: number, userId: number) {
    return await prisma.taskAssignment.create({
      data: {
        taskId,
        userId
      }
    });
  }
}