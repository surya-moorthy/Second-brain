import { BrainService } from "../../services/brainService/services";
import { Request, Response } from "express";

export class BrainController {
  // Create a shareable brain link
  static async createShareLink(req: Request, res: Response) {
    try {
      const { share } = req.body;
      const userId = req.userId as string;

      if (!share) {
        return res.status(400).json({
          message: "Share parameter is required",
        });
      }

      const shareLink = await BrainService.createShareLink(userId, share);

      res.status(200).json({
        link: shareLink.hash,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  // Get shared brain contents by share link
  static async getSharedBrain(req: Request, res: Response) {
    try {
      const shareLink = req.query.shareLink as string;

      if (!shareLink) {
        return res.status(400).json({
          message: "Share link is required",
        });
      }

      const sharedBrain = await BrainService.getSharedBrain(shareLink);

      if (!sharedBrain) {
        return res.status(403).json({
          message: "Invalid share link",
        });
      }

      res.status(200).json({
        username: sharedBrain.username,
        contents: sharedBrain.contents,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  // Optional: Get all share links for current user
  static async getUserShareLinks(req: Request, res: Response) {
    try {
      const userId = req.userId as string;

      const shareLinks = await BrainService.getUserShareLinks(userId);

      res.status(200).json({
        shareLinks,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  // Optional: Delete a share link
  static async deleteShareLink(req: Request, res: Response) {
    try {
      const { hash } = req.params;
      const userId = req.userId as string;

      const deleted = await BrainService.deleteShareLink(hash, userId);

      if (!deleted) {
        return res.status(404).json({
          message: "Share link not found or unauthorized",
        });
      }

      res.status(200).json({
        message: "Share link deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  // Optional: Toggle share status
  static async toggleShareStatus(req: Request, res: Response) {
    try {
      const { hash } = req.params;
      const userId = req.userId as string;

      const updated = await BrainService.toggleShareStatus(hash, userId);

      if (!updated) {
        return res.status(404).json({
          message: "Share link not found or unauthorized",
        });
      }

      res.status(200).json({
        message: "Share status updated successfully",
        share: updated.share,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}