import { prisma } from "@repo/db";
import { generateRandomString } from "../../utils/utils";

export class BrainService {
  // Create a shareable brain link
  static async createShareLink(userId: string, share: boolean) {
    const randomHash = generateRandomString(10);

    const link = await prisma.link.create({
      data: {
        hash: randomHash,
        share: share,
        userId: userId,
      },
    });

    return link;
  }

  // Get shared brain contents by hash
  static async getSharedBrain(hash: string) {
    // Find the link with user information
    const linkResponse = await prisma.link.findUnique({
      where: {
        hash: hash,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!linkResponse || !linkResponse.share) {
      return null;
    }

    // Get all contents for that user (excluding userId field from response)
    const contents = await prisma.content.findMany({
      where: {
        userId: linkResponse.userId,
      },
      select: {
        id: true,
        link: true,
        title: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        // Explicitly exclude userId by not selecting it
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      username: linkResponse.user.username,
      contents: contents,
    };
  }

  // Get all share links for a user
  static async getUserShareLinks(userId: string) {
    const links = await prisma.link.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return links;
  }

  // Delete a share link
  static async deleteShareLink(hash: string, userId: string) {
    // Verify ownership
    const link = await prisma.link.findFirst({
      where: {
        hash: hash,
        userId: userId,
      },
    });

    if (!link) {
      return null;
    }

    const deleted = await prisma.link.delete({
      where: {
        hash: hash,
      },
    });

    return deleted;
  }

  // Toggle share status
  static async toggleShareStatus(hash: string, userId: string) {
    // Verify ownership
    const link = await prisma.link.findFirst({
      where: {
        hash: hash,
        userId: userId,
      },
    });

    if (!link) {
      return null;
    }

    const updated = await prisma.link.update({
      where: {
        hash: hash,
      },
      data: {
        share: !link.share,
      },
    });

    return updated;
  }

  // Check if a hash already exists (useful for regenerating unique hashes)
  static async hashExists(hash: string): Promise<boolean> {
    const existing = await prisma.link.findUnique({
      where: {
        hash: hash,
      },
    });

    return !!existing;
  }

  // Create unique share link (ensures no hash collisions)
  static async createUniqueShareLink(userId: string, share: boolean) {
    let hash = generateRandomString(10);
    let attempts = 0;
    const maxAttempts = 5;

    // Retry if hash already exists
    while (await this.hashExists(hash) && attempts < maxAttempts) {
      hash = generateRandomString(10);
      attempts++;
    }

    if (attempts === maxAttempts) {
      throw new Error("Failed to generate unique share link");
    }

    return this.createShareLink(userId, share);
  }
}