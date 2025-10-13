import express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // use optional if it may not always exist
    }
  }
}
