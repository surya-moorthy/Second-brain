import express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // use optional if it may not always exist
    }
  }
}

export type LoginUserType = {
   UserType,
   token : string
}
export type UserType = {
    id : string,
    username : string
}


export type ContentType = {
  type : string,
  link : string,
  title : string,
  userId? : string
}