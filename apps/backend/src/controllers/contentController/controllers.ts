import { ContentService } from "@/services/contentService/services";
import { Request, Response } from "express";

export class ContentController {
  // Create a new content
  static async createContent(req: Request, res: Response) {
    try {
      const { type, link, title } = req.body;
      const userId = req.userId as string;

      const createContent = await ContentService.createContent({
        link,
        title,
        type,
        userId,
      });

      res.status(200).json({
        message: "Content created successfully",
        content: createContent,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  // Find content based on Id
  static async getContentById(req: Request, res: Response) {
    try {
      const contentId = req.params.id;

      const content = await ContentService.getContentById(contentId);

      if (!content) {
        return res.status(404).json({
          message: "Content not found",
        });
      }

      return res.status(200).json({ content });
    } catch (err) {
      console.error("Error fetching content:", err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  // Delete content based on id
  static async deleteContent(req: Request, res: Response) {
    try {
      const contentId = req.query.id as string;
      const userId = req.userId as string;

      if (!contentId) {
        return res.status(400).json({
          message: "Content ID is required",
        });
      }

      const content = await ContentService.deleteContent(contentId, userId);

      if (!content) {
        return res.status(404).json({
          message: "Content not found or unauthorized",
        });
      }

      res.status(200).json({
        content,
        message: "Deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  // Fetch all contents
  static async getAllContents(req: Request, res: Response) {
    try {
      const userId = req.userId as string;

      const contents = await ContentService.getAllContents(userId);

      res.status(200).json({
        contents,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}