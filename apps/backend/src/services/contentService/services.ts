import { ContentType } from "../../types/types";
import { prisma } from "@repo/db";


export class ContentService {

    static async createContent(data: ContentType) {
        const content = await prisma.content.create({
        data: {
            link: data.link,
            title: data.title,
            type: data.type,
            userId: data.userId as string,
        },
        omit : {
          userId : true,
          updatedAt : true   
        }
        });

        return content;
  }

  // Get content by ID
  static async getContentById(contentId: string) {
    const content = await prisma.content.findUnique({
      where: {
        id: contentId,
      },
      omit : {
        userId : true,
        updatedAt : true,
      }
    });

    return content;
  }

  // Delete content by ID and verify ownership
  static async deleteContent(contentId: string, userId: string) {
    // First check if the content exists and belongs to the user
    const content = await prisma.content.findFirst({
      where: {
        id: contentId,
        userId: userId,
      },
    });

    if (!content) {
      return null;
    }

    // Delete the content
    const deletedContent = await prisma.content.delete({
      where: {
        id: contentId,
      },
    });

    return deletedContent;
  }

  // Get all contents for a user
  static async getAllContents(userId: string) {
    const contents = await prisma.content.findMany({
      where: {
        userId: userId,
      },
      omit : {
        userId : true,
        updatedAt : true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return contents;
  }
}
